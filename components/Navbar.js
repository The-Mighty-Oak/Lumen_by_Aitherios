import Image from 'next/image'
import { motion, AnimatePresence } from "framer-motion"
import Link from 'next/link'
import navStyles from '../styles/navigation.module.css'
import { useEffect, useState, useRef } from 'react';
import Hamburger from './Hamburger';
import MobileMenu from './MobileMenu';
import Search from './Search'
import SearchIcon from './SearchIcon';
import LogoImage from './LogoImage';
import CancelIcon from './CancelIcon';
import SearchIconSmallScreen from './SearchIconSmallScreen';
import HamburgerTop from './HamburgerTop';


const searchVariants2 = {
    initial:{
        opacity: 0,
        x: 0,
    },
    hover: {
        x: 50,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100, duration: 0.4 }
    }
}

const searchVariantsM = {
    hover: {
        scale: 1.5,
        transition: { type: 'spring', stiffness: 100, duration: 0.4 }
    }
}

const linkHoverVariant ={
    hover:{
        fontSize: '24px',
        transition: { type: 'spring', stiffness: 100, duration: 0.1 }
    }
}

const searchHoverVariant = {
    hover: {
        scale: 1.1,
        transition: { type: 'spring', stiffness: 100, duration: 0.1 }
    }
}

function Navbar() {
    // dark theme
    const [darkTheme, setDarkTheme] = useState(false);
    const handleToggle = (event) => {
        setDarkTheme(event.target.checked);
    };
    useEffect(() => {
        if (darkTheme !== undefined) {
            if (darkTheme) {
                document.documentElement.setAttribute('data-theme', 'dark');
                window.localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
                window.localStorage.setItem('theme', 'light');
            }
        }
    }, [darkTheme]);
    useEffect(() => {
        const root = window.document.documentElement;
        const initialColorValue = root.style.getPropertyValue(
            '--initial-color-mode'
        );
        setDarkTheme(initialColorValue === 'dark');
    }, []);


    // hide / reveal hamburger menu
    const [isVisible, setIsVisible] = useState(true);
    const [height, setHeight] = useState(0)
    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);
    }, [])

    const listenToScroll = () => {
        let heightToHideFrom = 150;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        setHeight(winScroll);
            if (winScroll < heightToHideFrom) {
                isVisible && setIsVisible(false);
            } else {
                setIsVisible(true);
            }
    };

    const [toggle, setToggle] = useState(false)
   
    return (
        <div>
            <AnimatePresence>
                {toggle && (
                    <motion.div
                        className={navStyles.searchBar}
                        initial={{ opacity: 0, y: -900 }}
                        animate={{ opacity: 1, y:0 }}
                        exit={{ opacity: 0, y: -900 }}
                    >
                        <div className={"closeButtonWrapper"}>
                            <button className={"closeButton"} onClick={() => setToggle(!toggle)}>
                                <a>
                                    <motion.div
                                        tabIndex='0'
                                        whileHover="hover"
                                        variants={searchHoverVariant}
                                        className={"closeButtonItems"}
                                    >
                                        <div className={"closeIcon"}>
                                            <CancelIcon />
                                        </div>
                                        <p>Exit Search</p>
                                    </motion.div>
                                </a> 
                            </button>
                        </div>
                        <div>
                            <Search/>
                        </div>
                        <div className='darkness' onClick={() => setToggle(!toggle)}></div>
                    </motion.div>
                )}
            </AnimatePresence>

                
        <div className={navStyles.navbarWrapper}>
                <div className={navStyles.MenuMobile}>
                    <MobileMenu />
                  
                </div>
            <div className={[navStyles.navBrand, "navBrandLogo"].join(' ')}>
                <a href="/">
                    <LogoImage />
                </a>
            </div>

            <div className={navStyles.navLinksContainer}>
                <Link href="/#categories">
                    <a href="/#categories">
                        <motion.div 
                            className={navStyles.navLinks}
                            whileHover="hover"
                            variants={linkHoverVariant}
                        >
                            READ
                        </motion.div>
                    </a>
                </Link>
                <Link href="/about">
                    <a>
                        <motion.div 
                            className={navStyles.navLinks}
                            whileHover="hover"
                            variants={linkHoverVariant}
                        >
                            ABOUT
                        </motion.div>
                    </a>
                </Link>
                <Link href="/resources">
                    <a>
                        <motion.div 
                            className={navStyles.navLinks}
                            whileHover="hover"
                            variants={linkHoverVariant}
                        >
                            RESOURCES
                        </motion.div>
                    </a>
                </Link>
                <Link href="/newsletter">
                    <a>
                        <motion.div 
                            className={navStyles.navLinks}
                            whileHover="hover"
                            variants={linkHoverVariant}
                        >
                            NEWSLETTER
                        </motion.div>
                    </a>
                </Link>
                <Link href="/contact">
                    <a>
                        <motion.div 
                            className={navStyles.navLinks}
                            whileHover="hover"
                            variants={linkHoverVariant}
                        > 
                            CONTACT
                        </motion.div>
                    </a>
                </Link>
            </div>
            
            <div className={navStyles.navElement}>
                <button className={navStyles.searchButton} onClick={() => setToggle(!toggle)} aria-label="Search Button">
                    <a 
                        tabIndex='0'
                        aria-label="Search Button">
                        <motion.div 
                            className={[navStyles.searchContainer, 'SearchContainer'].join(' ')}
                            whileHover="hover"
                            >
                                <motion.div 
                                    variants={searchVariants2} >
                                    <SearchIcon />
                                </motion.div>
                        </motion.div>
                    </a>
                </button>
                <button className={[navStyles.searchSmall, "searchSmallNav"].join(' ')} onClick={() => setToggle(!toggle)} aria-label="Search Button" tabIndex='0'>
                    <motion.div 
                        whileHover="hover"
                        className={navStyles.searchContainerM}>
                            <motion.div variants={searchVariantsM}>
                                <SearchIconSmallScreen/>
                            </motion.div>
                    </motion.div>
                </button>
                <div className={navStyles.colourModeToggle}>
                        <form action="#" className={navStyles.colourMode}>
                            <label className={navStyles.switch}>
                                <input
                                    type="checkbox"
                                    checked={darkTheme}
                                    onChange={handleToggle}
                                />
                                <span className={navStyles.slider}></span>
                                <span className={navStyles.sun}>
                                <Image
                                    alt="Sun Represents Light Mode"
                                    src={"/sun.png"}
                                    width={20}
                                    height={20}
                                    layout="intrinsic"
                                />
                                </span>
                                <span className={navStyles.moon}>
                                    <Image
                                    alt="Moon Represents Dark Mode"
                                    src={"/moon.png"}
                                    width={20}
                                    height={20}
                                    layout="intrinsic"
                                    />
                                </span>
                            </label>
                        </form>
                </div> 
                < AnimatePresence >
                    {isVisible
                        &&
                            <motion.div 
                                className={navStyles.ham} 
                                id="hide" 
                                tabIndex='0'
                                initial={{ opacity: 0, x: 800 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 800 }}
                                transition={{ duration: 0.1 }}
                            >
                                <Hamburger/>
                            </motion.div>
                    }
                </AnimatePresence >
            </div>
                

            
            </div>
        </div>
    )
}

export default Navbar