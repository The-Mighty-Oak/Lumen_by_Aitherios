import Image from 'next/image'
import headerStyles from '../styles/header.module.css'
import Hero from './Hero'
import HeroSmile from './HeroSmile'

const Header = () => {
  return (
    <div className={headerStyles.headerWrapper}>
        <div className={headerStyles.headerLeft}>
              <h1 className={headerStyles.headerMainText}>Helpful Content <span className={headerStyles.headerMainTextInside}>to Help you</span> Live your Best Life.</h1>
        </div>
        <div className={headerStyles.heroImage}>
          <Hero />
        </div>
        <div className={headerStyles.heroImageM}>
            <HeroSmile/>
        </div>
    </div>
  )
}

export default Header