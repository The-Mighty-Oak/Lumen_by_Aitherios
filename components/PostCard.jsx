import React from "react"
import moment from "moment"
import Link from "next/link"
import Image from "next/image";
import postStyle from "../styles/PostCard.module.css"
import { Ellipsis } from 'react-row-ellipsis';
import { useRouter } from 'next/router'

const PostCard = ({ post }) => {
    const router = useRouter()

    return (
        <div className={postStyle.cardWrapper}>
                <a href={`/post/${post.slug}`}>
                    <div className={postStyle.postContainer}>
                        <div className={postStyle.postInfoContainer}>
                            <div>
                                <h2 className={postStyle.postTitle}>
                                    {post.title}
                                </h2>
                                <Ellipsis lines={3} as='p' className={postStyle.postExcerpt}>
                                    {post.excerpt}
                                </Ellipsis>
                            </div>
                            <div className={postStyle.metInfo}>
                                <div className={postStyle.authorInfo}>
                                    <img
                                        src={post.authors.photo.url}
                                        height="30px" width="30px"
                                        alt={post.authors.name}
                                        className={postStyle.authorImage}
                                    />
                                    <p className={postStyle.authorName}>{post.authors.name}</p>
                                </div>
                                {post?.categories.map((category) => (
                                    <button className={postStyle.categoriesButton} key={category.slug} type="button" onClick={() => router.push(`/category/${category.slug}`)}>
                                        <p className={postStyle.categories}>
                                            {category.name}
                                        </p>
                                    </button>
                                ))}
                                <p className={postStyle.date}>{moment(post.createdAt).format('DD MMM, YYYY')}</p>
                            </div>
                        </div>
                        <div className={postStyle.postImage}>
                            <div className={postStyle.Image}>
                                <Image
                                    src={post.featuredImage.url}
                                    alt={post.title}
                                    width={670}
                                    height={369}
                                    layout="intrinsic"
                                />
                            </div>
                        </div>
                    </div>
                </a>
        </div>
    )
}

export default PostCard