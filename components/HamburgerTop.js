import hamStyle from '../styles/hamburger.module.css'
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import Link from 'next/link'
import Image from 'next/image'
import Search from './Search'
import HamburgerSearchIcon from './HamburgerSearchIcon';
import HamburgerLogo from './HamburgerLogo';
import CancelIcon from './CancelIcon';


const linkHoverVariant = {
  hover: {
    scale: 1.2,
    transition: { type: 'spring', stiffness: 100, duration: 0.1 }
  }
}

const searchVariants = {
  hover: {
    x: 105,
    transition: { type: 'spring', stiffness: 100, duration: 0.4 }
  }
}

const searchHoverVariant = {
  hover: {
    scale: 1.3,
    transition: { type: 'spring', stiffness: 100, duration: 0.1 }
  }
}


const HamburgerTop = () => {
  const [showMe, setShowMe] = useState(false);
  function toggles() {
    setShowMe(!showMe);
    { (e) => setChecker(e.target.checker) } 
  }
  const [toggled, setToggled] = useState(false)
  const [checker, setChecker] = useState(false);

  return (
    <div> 
      <AnimatePresence>
        {toggled && (
          <motion.div
            className={hamStyle.searchBar}
            initial={{ opacity: 0, y: -900 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -900 }}
          >
            <button className={hamStyle.closeButton} onClick={() => setToggled(!toggled)}>
              <a>
                <motion.div
                  whileHover="hover"
                  variants={searchHoverVariant}
                  className={hamStyle.closeButtonItems}
                >
                  <div className={hamStyle.closeIcon}>
                    <CancelIcon />
                  </div>
                  <p>Exit Search</p>
                </motion.div>
              </a>
            </button>
            <div>
              <Search />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <input type="checkbox" id="checkbox3" checked={checker} className={[hamStyle.visuallyHidden, hamStyle.checkbox3].join(' ')} onClick={toggles} onChange={(e) => setChecker(e.target.checker)} />
        <label htmlFor="checkbox3">
          <div className={[hamStyle.hamburger, hamStyle.hamburger3].join(' ')}>
            <span className={[hamStyle.bar, hamStyle.bar1].join(' ')}></span>
            <span className={[hamStyle.bar, hamStyle.bar2].join(' ')}></span>
            <span className={[hamStyle.bar, hamStyle.bar3].join(' ')}></span>
            <span className={[hamStyle.bar, hamStyle.bar4].join(' ')}></span>
          </div>
        </label>

      <div
        className={hamStyle.dropMenu}
        style={{
          display: showMe ? "block" : "none"
        }}>

        <div className={[hamStyle.navBrand, "hamBrand"].join(' ')}>
          <Link href="/">
            <a>
              <HamburgerLogo />
            </a>
          </Link>
        </div>

        <div className={hamStyle.hamLinks}>
          <Link href="/#categories">
            <a href="/#categories" onClick={(e) => setChecker(e.target.checker)}>
              <motion.div onClick={toggles}
                className={hamStyle.Links}
                whileHover="hover"
                variants={linkHoverVariant}
              >
                Read
              </motion.div>
            </a>
          </Link>
          <Link href="/about">
            <a>
              <motion.div
                className={hamStyle.Links}
                whileHover="hover"
                variants={linkHoverVariant}
              >
                About
              </motion.div>
            </a>
          </Link>

          
          <Link href="/resources">
            <a>
              <motion.div
                className={hamStyle.Links}
                whileHover="hover"
                variants={linkHoverVariant}
              >
                Resources
              </motion.div>
            </a>
          </Link>
          <Link href="/newsletter">
            <a>
              <motion.div
                className={hamStyle.Links}
                whileHover="hover"
                variants={linkHoverVariant}
              >
                Newsletter
              </motion.div>
            </a>
          </Link>
          <Link href="/contact">
            <a>
              <motion.div
                className={hamStyle.Links}
                whileHover="hover"
                variants={linkHoverVariant}
              >
                Contact
              </motion.div>
            </a>
          </Link>
          <div className={hamStyle.searchButtonWrapper}>
            <button className={hamStyle.searchButton} onClick={() => setToggled(!toggled)}>
              <div onClick={(e) => setChecker(e.target.checker)}>
                <motion.div
                  className={[hamStyle.searchContainer, "hamburgerSearchContainer"].join(' ')}
                  whileHover="hover"
                  onClick={toggles}
                >
                  <motion.div
                    className={hamStyle.searchIcon}
                    variants={searchVariants} >
                    <HamburgerSearchIcon />
                  </motion.div>
                </motion.div>
              </div>
            </button>
          </div>
        </div>
    
        
      </div>
    </div>
  )
}

export default HamburgerTop