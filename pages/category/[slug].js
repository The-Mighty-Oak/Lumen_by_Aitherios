import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { getCategories} from '../../services';
import Link from 'next/link';
import { PostCard, Loader, CategoriesTab, Navbar, Header, ErrorMessage, Socials, Footer } from '../../components';
import CategoryStyles from '../../styles/Categories.module.css'
import styles from '../../styles/Home.module.css'
import { request } from 'graphql-request';
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion"
import ArrowRight from '../../components/ArrowRight';
import CategoriesTabArrow from '../../components/CategoriesTabArrow';



const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const fetcher = (endpoint, query, variables) => request(endpoint, query, variables);


const linkHoverVariant = {
  hover: {
    scale: 1.2,
    transition: { type: 'spring', stiffness: 100, duration: 0.1 }
  }
}

export async function getStaticProps({ params }) {
  const data = await fetcher(
    graphqlAPI,
    `query getCategoryPost($slug: String!) {
      socialsConnection {
            edges {
              node {
                icon {
                  fileName
                  url
                }
                id
                url
                platform
              }
            }
          }
      postsConnection(where: { categories_some: { slug: $slug } } first: 5) {
        aggregate {
            count
          }
        edges {
          cursor
          node {
              id
            authors {
              bio
              name
              id
              photo {
                url
              }
            }
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
    {
      slug: params.slug,
    }

  );

  return {
    props: {
      posts: data,
    },
  };

};

export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}

const CategoryPost = ({ posts }) => {
  const router = useRouter();
  const [skip, setSkip] = useState(0);
  const [num, setNum] = useState(0)
  const listSize = Math.ceil(`${posts.postsConnection.aggregate.count}` / 5)
  const [count, setCount] = useState(1);
  const [toggler, setToggler] = useState(false)
  // const my2Ref = useRef(null)
  // const executeScroll = () => scrollToRef(my2Ref)


  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories()
      .then((newCategories) => setCategories(newCategories))
  }, []);


  const ourSlug = (posts.postsConnection.edges[0].node.categories[0].slug);
  const activeName = (posts.postsConnection.edges[0].node.categories[0].name)

  // console.log(ourSlug);
 
  const { data, error } = useSWR(
      [
          graphqlAPI,
            `query getCategoryPost($slug: String! $skip: Int) {
              socialsConnection {
              edges {
                node {
                  icon {
                    fileName
                    url
                  }
                  id
                  url
                  platform
                }
              }
          }
              postsConnection(where: { categories_some: { slug: $slug } } first: 5 skip: $skip) {
                aggregate {
                    count
                  }
                edges {
                  cursor
                  node {
                      id
                      authors {
                      bio
                      name
                      id
                      photo {
                        url
                      }
                    }
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
            {
              skip,
              slug: ourSlug
            }
          
        ],
      (endpoint, query, { slug }) => fetcher(endpoint, query, { slug, skip }),
      { initialData: posts, revalidateOnFocus: true },
  );

  if (!data) return <Loader />
  if (error) {
    return (
      <ErrorMessage />
    );
  }

  return (
    <div>
      <div className={CategoryStyles.navigation}>
        <Navbar />
      </div>
      <Header /> 

      <div className='smallCategoriesTab' > 

        <div>
          <button onClick={() => setToggler(!toggler)} className={['categoriesTabSectionHeader', "slugTabSectionHeader"].join(' ')}>
            <p >
              {activeName}
            </p>
            <div className="dropDownArrow">
              <CategoriesTabArrow />
            </div>
          </button>
        </div>  

        <AnimatePresence>
          {toggler && (
            <motion.div 
              className={[CategoryStyles.categoriesTab, 'categoriesSmallCategoriesTab'].join(' ')}
              initial={{
                opacity: 0,
                scaleY: 0,
                originY: 0,
              }}
              animate={{
                opacity: 1,
                scaleY: 1,
                originY: 0,
              }}
              exit={{
                opacity: 0,
                scaleY: 0,
                originY: 0,
              }}>
              <div className={["categoriesTab", "slugCategoriesTab"].join(' ')}>
                <div className="categoriesList">
                    <a href='/'
                      onClick={() => {
                        setSkip(0)
                        setNum(0);
                        setCount(1)
                      }} >
                      <motion.p
                        className={router.pathname == "/" ? "active" : "categoriesLink"}
                        whileHover="hover"
                        variants={linkHoverVariant}
                      >
                        All Posts
                      </motion.p>
                    </a>
                  {categories.map((category) => (
                      <a key={category.slug} href={`/category/${category.slug}`}
                        onClick={() => {
                          setSkip(0)
                          setNum(0);
                          setCount(1)
                        }} >
                        <motion.p
                          className={router.pathname == `/category/${ourSlug}` ? "active" : "categoriesLink"}
                          whileHover="hover"
                          variants={linkHoverVariant}
                        >
                          {category.name}
                        </motion.p>
                      </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={[CategoryStyles.categoriesTab, CategoryStyles.categoriesTabLarge, "largeCategoriesTab"].join(' ')}>
        <div className="categoriesTab">
          <div className="categoriesList">
            <a href='/'
              onClick={() => {
                setSkip(0)
                setNum(0);
                setCount(1)
              }} >
              <motion.p
                className={router.pathname == "/" ? "active" : "categoriesLink"}
                whileHover="hover"
                variants={linkHoverVariant}
              >
                ALL POSTS
              </motion.p>
            </a>
            {categories.map((category) => (
              <a key={category.slug} href={`/category/${category.slug}`}
                onClick={() => {
                  setSkip(0)
                  setNum(0);
                  setCount(1)
                }} >
                <motion.p
                  className={router.pathname == `/category/${category.slug}` ? "active" : "categoriesLink"}
                  whileHover="hover"
                  variants={linkHoverVariant}
                >
                  {category.name}
                </motion.p>
              </a>
            ))}
          </div>
        </div>
      </div>

      <h2 className={[styles.categoryActive, "activeCategory"].join(' ')}>{activeName}</h2>

      <div className={styles.posts}>
        {data.postsConnection.edges.map((post, index) => (
          <div className={styles.postsCard} key={post.node.title} >
            <PostCard post={post.node}/>
          </div>
          ))}
      </div>

      <div className={styles.pagination} >
        <div className={[styles.buttonContainer, "nextPage"].join(' ')}>
          <button className={!data.postsConnection.pageInfo.hasPreviousPage ? styles.disabled : styles.pageButton}
            onClick={() => {
              setSkip(skip - 5)
              setNum(skip - 5);
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
            <button className={!data.postsConnection.pageInfo.hasNextPage ? styles.disabled : styles.pageButton}
              onClick={() => {
                setSkip(skip + 5);
                setNum(skip + 5);
                setCount(count + 1)
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
            {data.socialsConnection.edges.map((social) => <div className={styles.socialLinks} key={social.node.id}><Socials social={social.node}/> </div>)}
          </div>
          <hr />
        </div>
        <Footer />
      </div>
    </div>
      
   
  );
};
export default CategoryPost;