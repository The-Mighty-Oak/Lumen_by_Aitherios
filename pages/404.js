import React from 'react'
import Image from 'next/image'

const NotFound = () => {
  return (
    <div className='four04Container'>
      <div className='four04HeaderContent'>
        <div className='four04Hero'>
          <Image
            src="/Error Hero.png"
            alt="Illustration of a Lion eating banana on a tree. A monkey is watching him in shock"
            width={1528}
            height={605.8165}
            layout="responsive"
          />
        </div>
      </div>
      <div className='four04BodyContainer'>
        <div className='four04'>
          <p className='four'><span className='four1'>4</span><span className='Zero'>0</span><span className='four2'>4</span></p>
        </div>
        <div className='four04BodyWrapper'>
          <h2>Oops!... It seems we've taken a wrong turn. Weird things happen here. <span><a href="/">Let's Go Back Home.</a></span></h2>
        </div>
      </div>
    </div>
  )
}

export default NotFound