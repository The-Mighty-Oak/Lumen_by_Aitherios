import React, { useState, useEffect } from 'react';

import { AdjacentPostCard } from '../components';
import { getAdjacentPosts } from '../services';

const AdjacentPosts = ({ createdAt, slug }) => {
    const [adjacentPost, setAdjacentPost] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        getAdjacentPosts(createdAt, slug).then((result) => {
            setAdjacentPost(result);
            setDataLoaded(true);
        });
    }, [slug]);

    return (
        <div className="hey2">
            {dataLoaded && (
                <>
                    {adjacentPost.previous && (
                        <div className={`${adjacentPost.next ? 'heyL' : 'heyL'} hey`}>
                            <AdjacentPostCard post={adjacentPost.previous} position="LEFT" />
                        </div>
                    )}
                   
                </>
            )}
            {dataLoaded && (
                <>
                   
                    {adjacentPost.next && (
                        <div className={`${adjacentPost.previous ? 'hey' : 'hey'} hey`}>
                            <AdjacentPostCard post={adjacentPost.next} position="RIGHT" />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdjacentPosts;