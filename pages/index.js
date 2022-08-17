import Head from 'next/head'
import React, { useState, useRef } from 'react'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { PostCard, PostWidget, Layout, Loader, Footer, Socials, ErrorMessage } from '../components'
import { request } from 'graphql-request';
import useSWR from "swr";
import { useRouter } from "next/router"
import ArrowRight from '../components/ArrowRight'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const fetcher = (endpoint, query, variables) => request(endpoint, query, variables);



export const getStaticProps = async () => {
  const data = await fetcher(
    graphqlAPI,
    `query getPosts() {
      socialsConnection {
        edges {
          node {
            icon {
              fileName
              url
            }
            url
            platform
            id
          }
        }
      }
        postsConnection(first: 5 skip: 0) {
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


const Home = ({ pages }) => {
  const listSize = Math.ceil(`${ pages.postsConnection.aggregate.count }` / 5)

  // console.log(pages.postsConnection.edges[2].node.slug);

  const router = useRouter()
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(1);
  const { data, error } = useSWR(
    [
      graphqlAPI,
        `query getPosts($skip: Int!) {
          socialsConnection {
            edges {
              node {
                icon {
                  fileName
                  url
                }
                url
                platform
                id
              }
            }
          }
            postsConnection(first: 5 skip: $skip) {
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
      skip,
    ],
    (endpoint, query) => fetcher(endpoint, query, { skip }),
    { initialData: pages, revalidateOnFocus: true },
    );

  if (!data) return <Loader />
    if (error) {
      return (
       <ErrorMessage />
      );
    }

    

    return (
      <div>
        <Head>
          <title>Lumen</title>
        </Head>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        <div className={styles.headerSec}>
          <Header />
        </div>
        <div>
          <PostWidget />

           {/* TARGET FOR SCROLL TO TOP ON NEXT/ PREVIOUS PAGE CLICK */}
          {/* <div ref={myRef}> </div> */}
          
          <div className={styles.layoutSec}>
            <Layout>
              <div className={styles.posts}>
                {data?.postsConnection?.edges.map((post) => <div className={styles.postsCard} key={post.node.slug} ><PostCard post={post.node}/> </div>)} 
              </div>
            </Layout>
          </div>
        </div>

        {/* <button onClick={executeScroll}> Click to scroll </button>  */}

        <div className={styles.pagination} >
          <div className={[styles.buttonContainer, "nextPage"].join(' ')}>
            <button className={!data?.postsConnection?.pageInfo?.hasPreviousPage ? styles.disabled : styles.pageButton}
              onClick={() => {
                setSkip(skip - 5);
                setCount(count - 1)
              }}>
              <a className={styles.Previous}>
              <span className={styles.arrowLeft}><ArrowRight /></span>
              <p>Previous Page</p>
            </a>
            </button>
          </div>
          <div className={styles.pageInfo} >
            <p>Page {count} of {listSize}</p>
          </div>
          <div className={[styles.buttonContainer, "nextPage"].join(' ')}>
            <button className={!data?.postsConnection?.pageInfo?.hasNextPage ? styles.disabled : styles.pageButton} 
              onClick={() => {
                setSkip(skip + 5);
                setCount(count + 1);
              }}>
              <a className={styles.Next}>
              <span className={styles.arrowRight}><ArrowRight /></span>
                <p>Next Page</p>
              </a>
            </button>
          </div>
        </div> 
        <div className={styles.footerSectionWrapper}>
          <div className={styles.socialsSectionWrapper}>
            <h4 className={styles.socialsHeader}>Connect with us on Social Media —</h4>
            <div className={styles.socialLinksWrapper}>
              {data?.socialsConnection?.edges.map((social) => <div className={styles.socialLinks} key={social.node.id}><Socials social={social.node}/> </div>)} 
            </div>
            <hr />
          </div>
          <Footer />
        </div>
      </div>
    )
  }

  export default Home
