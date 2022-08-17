import React from 'react'
import moment from "moment"
import Link from "next/link"
import SCStyles from '../styles/SearchCards.module.css'
import { Ellipsis } from 'react-row-ellipsis';
import { useRouter } from 'next/router'

const SearchCards = ({ post }) => {
  const router = useRouter()
  return (
      <div className={SCStyles.cardContainer}>
              <a href={`/post/${post.slug}`}>
                  <div >
                      <div >
                          <h2 className={SCStyles.cardTitle}>
                              {post.title}
                          </h2>
                          <div className={SCStyles.cardMetInfo}>
                              {post?.categories?.map((category) => (
                                <button className={SCStyles.categoryButton} key={category.slug} type="button" onClick={() => router.push(`/category/${category.slug}`)}>
                                  <p className={SCStyles.category}>
                                    {category.name}
                                  </p>
                                </button>
                              ))}
                            <p className={SCStyles.date}>{moment(post.createdAt).format('DD MMM, YYYY')}</p>
                          </div>

                        <Ellipsis lines={3} as='p' className={SCStyles.cardExcerpt}>
                              {post.excerpt}
                        </Ellipsis>
                      </div>
                     
                  </div>
              </a>
          {/* </Link> */}
      </div>
  )
}

export default SearchCards