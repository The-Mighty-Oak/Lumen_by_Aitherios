import {useState} from 'react';
import searchStyles from '../styles/search.module.css'
import { request } from 'graphql-request';
import { SearchCards } from '../components'
import useSWR from "swr";
import { useRouter } from "next/router"
import { motion, AnimatePresence } from "framer-motion"
import { Ellipsis } from 'react-row-ellipsis';
import SearchButton from './SearchButton';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const fetcher = (endpoint, query, variables) => request(endpoint, query, variables);


export const getStaticProps = async () => {
    const data = await fetcher(
        graphqlAPI,
        `query getPosts() {
        postsConnection(first: 20) {
            aggregate {
                count
              }
            edges {
                node {
                    id
                    createdAt
                    slug
                    title
                    excerpt
                     keywords {
                        id
                        tag
                        }
                    featuredImage {
                      url
                    }
                    categories {
                        name
                        slug
                    }
                    authors {
                        bio
                        name
                        id
                        photo {
                            url
                        }
                    }
                }
            }
            pageInfo {
                hasNextPage
                hasPreviousPage  
                startCursor
                endCursor
                pageSize            
            }
        }  
    }`,
    );
    return {
        props: {
            pages: data,
        },
    };
};


const Search = ({ pages }) => {

    // const listSize = Math.ceil(`${pages.postsConnection.aggregate.count}` / 5)


    // console.log(pages.postsConnection.edges);
    const router = useRouter()
    const [skip, setSkip] = useState(0);
    const [count, setCount] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [message, setMessage] = useState('');


    const handleChange = event => {
        setMessage(event.target.value);

        // console.log('value is:', event.target.value);
    };


    const handleInputKeyEvent = (event) => {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            setSearchValue(message);
        }
    }


    const { data, error } = useSWR(
        [
            graphqlAPI,
            `query getPosts($searchValue: String ) {
                postsConnection(where: {_search: $searchValue} first: 20)  {
                    aggregate {
                        count
                      }
                    edges {
                        node {
                            id
                            createdAt
                            slug
                            title
                            excerpt
                            keywords {
                                id
                                tag
                            }
                            featuredImage {
                               url
                            }
                            categories {
                                name
                                slug
                            }
                            authors {
                                bio
                                name
                                id
                                photo {
                                    url
                                }
                            }
                        }
                    }
                    pageInfo {
                        hasNextPage
                        hasPreviousPage  
                        startCursor
                        endCursor
                        pageSize
                        
                    }
                }  
            }
      `,
            searchValue,
        ],
        (endpoint, query) => fetcher(endpoint, query, { searchValue }),
        { initialData: pages, revalidateOnFocus: true},
    );

    if (!data) return <AnimatePresence> 
                        <motion.div 
                            className={searchStyles.searchingMessageContainer}
                            initial={{ opacity: 0, x: -900 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -900 }}
                            >
                                <p className={searchStyles.searchingMessage}> Searching... </p>
                        </motion.div>
                    </AnimatePresence>
    if (error) {
        return (
            <AnimatePresence> 
                <motion.div 
                    className={searchStyles.errorMessageContainer}
                    initial={{ opacity: 0, x: -900 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -900 }}
                    >
                    <p className={searchStyles.errorMessage}>Something Went Wrong! Try Again</p>
                </motion.div>
            </AnimatePresence>
        );
    }
  return (
    <div className={searchStyles.searchTabContainer}>
        <div className={searchStyles.searchTabWrapper}>
              <div className={searchStyles.searchInputWrapper}>
                  <div className={searchStyles.search}>
                    <input
                        aria-label="Search Bar"
                        tabIndex='0'
                        id="myInput"
                        type="text"
                        placeholder="Search for a blog posts"
                        onChange={handleChange}
                        value={message} 
                        className={searchStyles.searchInput}
                        onKeyUp={(event) => handleInputKeyEvent(event)}
                        autoFocus
                    />
                    <button
                        onClick={(event) => setSearchValue(message)}
                          className={searchStyles.searchButton}
                    >
                        <a>
                            {/* Search */}
                            <SearchButton />
                        </a>
                    </button>
                </div>
            </div>
            <div className={searchStyles.postsWrapper}>
                <div className={searchStyles.postsContainer}>
                    <div className={searchStyles.posts}>
                          {data?.postsConnection?.edges.map((post) => <div className={searchStyles.postsCard} key={post.node.title}><SearchCards post={post.node} key={post.title} /> </div>)}
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Search