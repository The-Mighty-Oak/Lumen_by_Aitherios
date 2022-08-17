import { request, gql } from 'graphql-request';


const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;


export const getPosts = async() => {
    const query = gql `
        query MyQuery {
                postsConnection {
                    edges {
                        node {
                            createdAt
                            slug
                            title
                            excerpt
                            featuredImage {
                                url
                                fileName
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
    `;

    const results = await request(graphqlAPI, query)
    return results.postsConnection.edges;
}


export const getPagination = async(first) => {
    const query = gql `
        query MyQuery($first: Int) {
                postsConnection(first: $first) {
                    edges {
                        node {
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
    `;

    const results = await request(graphqlAPI, query, { first })
    console.log(first)
    return results.postsConnection;
}

export const getPostDetails = async(slug) => {
    const query = gql `
        query GetPostDetails($slug: String!) {
            post(where: {slug: $slug}){
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
                content{
                    json
                }
                
            }
        }
    `;

    const results = await request(graphqlAPI, query, { slug })
    return results.post;
}

export const getRecentPosts = async() => {
    const query = gql `
        query GetPostDetails(){
            posts(
                orderBy: createdAt_DESC
                first: 4
            ){
                createdAt
                slug
                title
                excerpt
                featuredImage {
                    url
                    fileName
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
    `


    const results = await request(graphqlAPI, query)
    return results.posts;
}

export const getSimilarPosts = async(categories, slug) => {
    const query = gql `
        query GetPostDetails($slug: String!, $categories: [String!]){
            posts(
                where: { slug_not: $slug, AND: {categories_some: {slug_in:$categories}} }
                last: 4
            ){
                createdAt
                slug
                title
                excerpt
                featuredImage {
                    url
                    fileName
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
    `


    const results = await request(graphqlAPI, query, { categories, slug })
    return results.posts;
}


export const getCategories = async() => {
    const query = gql `
        query GetCategories{
            categories{
                name
                slug
            }
        }
    
    `

    const results = await request(graphqlAPI, query)
    return results.categories;
}


// $skip: Int

export const getCategoryPost = async(slug) => {
    const query = gql `
    query GetCategoryPost($slug: String! $offset: Int) {
      postsConnection(where: {categories_some: {slug: $slug}} first: 1  skip: $offset) {
        edges {
          cursor
          node {
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
  `;

    let offset = 0;

    const result = await request(graphqlAPI, query, { slug, offset });
    return result.postsConnection.edges;
};


export const submitComment = async(obj) => {
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })
    return result.json();
}


export const getComments = async(slug) => {
    const query = gql `
        query GetComments($slug: String!){
            comments(where: {post: {slug: $slug}}){
                name
                createdAt
                comment
            }
        }
    
    `

    const results = await request(graphqlAPI, query, { slug })
    return results.comments;
}



export const getAdjacentPosts = async(createdAt, slug) => {
    const query = gql `
    query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
      next:posts(
        first: 1
        orderBy: createdAt_ASC
        where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous:posts(
        first: 1
        orderBy: createdAt_DESC
        where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

    const result = await request(graphqlAPI, query, { slug, createdAt });
    return { next: result.next[0], previous: result.previous[0] };
};

export const getSocials = async() => {
    const query = gql `
        query GetSocials {
            socialsConnection {
                edges {
                node {
                    icon {
                    fileName
                    url
                    }
                    url
                    platform
                }
                }
            }
        }

    `;

    const results = await request(graphqlAPI, query)
    return results.socialsConnection.edges;
}


export const getAboutAndSocials = async() => {
    const query = gql `
        query GetAboutAndSocials {
            socialsConnection {
                edges {
                node {
                    icon {
                    fileName
                    url
                    }
                    url
                    platform
                }
                }
            }
       
                aboutLumen_Connection {
                    edges {
                        node {
                            aboutContent {
                                json
                            }
                            about_lumen
                            headerText
                            id
                        }
                    }
                }
                authorsConnection {
                    edges {
                    node {
                        aboutMe {
                        json
                        }
                        featuredImage {
                            fileName
                            url
                            width
                            height
                        }
                        writersSocials {
                        icon {
                            url
                            fileName
                        }
                        id
                        url
                        platform
                        }
                        name
                        position
                    }
                    }
                }
        }

    `;

    const results = await request(graphqlAPI, query)
    return results;
}

export const getContactInformation = async() => {
    const query = gql `
        query GetContactInformation {
             contactInformationsConnection {
                edges {
                    node {
                        channel
                    }
                }
            }
        }

    `;

    const results = await request(graphqlAPI, query)
    return results.socialsConnection.edges;
}

export const getSocialsAndContact = async() => {
    const query = gql `
        query GetSocialsAndContact {
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
            contactInformationsConnection {
                edges {
                    node {
                        channel
                        id
                    }
                }
            }
        }

    `;

    const results = await request(graphqlAPI, query)
    return results
}