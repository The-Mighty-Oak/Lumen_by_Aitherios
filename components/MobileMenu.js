import { useState} from 'react';
import { motion, AnimatePresence } from "framer-motion"
import Link from 'next/link'
import Image from 'next/image'
import menuStyle from '../styles/mobileMenu.module.css'
import CancelIcon from './CancelIcon';
import Search from './Search'
import HamburgerSearchIcon from './HamburgerSearchIcon';
import HamburgerLogo from './HamburgerLogo';
import hamStyle from '../styles/hamburger.module.css'




const linkHoverVariant = {
  hover: {
    scale: 1.2,
    transition: { type: 'spring', stiffness: 100, duration: 0.1 }
  }
}

const searchVariants = {
  hover: {
    x: 25,
    opacity: 0,
    transition: { type: 'spring', stiffness: 100, duration: 0.4 }
  }
}

const searchVariants2 = {
  initial: {
    opacity: 0,
    x: 0,
  },
  hover: {
    x: 25,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, duration: 0.4 }
  }
}

const searchHoverVariant = {
  hover: {
    scale: 1.3,
    transition: { type: 'spring', stiffness: 100, duration: 0.1 }
  }
}



const MobileMenu = () => {
  const [showMe, setShowMe] = useState(false);
  function toggler() {
    setShowMe(!showMe);
    // { (e) => setChecked(e.target.checked) } 
  }

  const [toggle, setToggle] = useState(false)
  const [checked, setChecked] = useState(false);

  return (
    <div> 

      <AnimatePresence>
        {toggle && (
          <motion.div
            className={menuStyle.searchBar}
            initial={{ opacity: 0, y: -900 }}
            animate={{ opacity: 1, y: 0 }}
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
              <Search />
            </div>
            <div className='darkness' onClick={() => setToggle(!toggle)}></div>
          </motion.div>
        )}
      </AnimatePresence>


      <input type="checkbox" id="checkbox1" checked={checked} className={[menuStyle.visuallyHidden, menuStyle.checkbox1].join(' ')} onClick={toggler} onChange={(e) => setChecked(e.target.checked)} />
        <label htmlFor="checkbox1">
          <div className={[menuStyle.hamburger, menuStyle.hamburger3].join(' ')}>
            <span className={[menuStyle.bar, menuStyle.bar1].join(' ')}></span>
            <span className={[menuStyle.bar, menuStyle.bar2].join(' ')}></span>
            <span className={[menuStyle.bar, menuStyle.bar3].join(' ')}></span>
            <span className={[menuStyle.bar, menuStyle.bar4].join(' ')}></span>
          </div>
        </label>

      <div
        className={menuStyle.dropMenu}
        style={{
          display: showMe ? "block" : "none"
        }}>

        <div className={[menuStyle.navBrand, "hamBrand"].join(' ')}>
          <Link href="/">
            <a>
              <HamburgerLogo />
            </a>
          </Link>
        </div>


          <div className={menuStyle.hamLinks}>
            <Link href="/#categories">
              <a>
                <motion.div
                  className={menuStyle.Links}
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
                  className={menuStyle.Links}
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
                  className={menuStyle.Links}
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
                  className={menuStyle.Links}
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
                  className={menuStyle.Links}
                  whileHover="hover"
                  variants={linkHoverVariant}
                >
                  CONTACT
                </motion.div>
              </a>
            </Link>

          <div>
            <button className={menuStyle.searchButton} onClick={() => setToggle(!toggle)} >
              <div onClick={() => setChecked((c) => !c)}>
                <motion.div
                  className={[menuStyle.searchContainer, "hamburgerSearchContainer"].join(' ')}
                  whileHover="hover"
                  onClick={toggler}
                >
                  <motion.div
                    className={menuStyle.searchIcon}
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

export default MobileMenu