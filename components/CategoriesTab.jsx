import React, { useEffect, useState} from 'react'
import Link from 'next/link'
import { getCategories } from '../services'
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from 'next/router';
import ArrowRight from './ArrowRight';
import CategoriesTabArrow from './CategoriesTabArrow';

const linkHoverVariant = {
    hover: {
        scale: 1.2,
        transition: { type: 'spring', stiffness: 100, duration: 0.1 }
    }
}

const CategoriesTab = () => {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
    }, []);

    const [toggler, setToggler] = useState(false)

    return (
        <div>
            <div className='smallCategoriesTab'>
                <div>
                    <button onClick={() => setToggler(!toggler)} className='categoriesTabSectionHeader'>
                        <p >
                            All Posts 
                        </p>
                        <div className="dropDownArrow">
                            <CategoriesTabArrow />
                        </div>
                    </button>
                </div>

                <AnimatePresence>
                    {toggler && (
                    <motion.div 
                        className="categoriesTab" 
                        initial={{ 
                                    opacity: 0, 
                                    scaleY: 0,
                                    originY: 0,
                                    // y: 0,
                                }}
                        animate={{ 
                                    opacity: 1, 
                                    scaleY: 1,
                                    originY: 0,
                                    // y: 50,
                                }}
                        exit={{ 
                                    opacity: 0, 
                                    scaleY: 0 ,
                                    originY: 0,
                                    // y: 0,
                                }}
                        >
                        <div className="categoriesList">
                                <a href='/'>
                                    <motion.p 
                                        className={router.pathname == "/" ? "active" : "categoriesLink"}
                                        whileHover="hover"
                                        variants={linkHoverVariant}
                                    >
                                        All Posts
                                    </motion.p>
                                </a>
                            {categories?.map((category) => (
                                    <a key={category.slug} href={`/category/${category.slug}`}>
                                        <motion.p 
                                            className="categoriesLink" 
                                            whileHover="hover"
                                            variants={linkHoverVariant}
                                        >
                                            {category.name}
                                        </motion.p>
                                    </a>
                            ))}
                            
                        </div>    
                    </motion.div>
                    )}
                </AnimatePresence>
            </div>


            <div className={["categoriesTab", "largeCategoriesTab"].join(' ')}>
                <div className="categoriesList">
                    <a href='/'>
                        <motion.p
                            className={router.pathname == "/" ? "active" : "categoriesLink"}
                            whileHover="hover"
                            variants={linkHoverVariant}
                        >
                            ALL POSTS
                        </motion.p>
                    </a>
                    {categories?.map((category) => (
                        <a key={category.slug} href={`/category/${category.slug}`}>
                            <motion.p
                                className="categoriesLink"
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
    )}

    export default CategoriesTab