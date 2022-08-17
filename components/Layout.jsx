import React, { useEffect, useState, useRef } from 'react';
import { CategoriesTab } from './'

const Layout = ({ children }) => {
  
  return (
    <>
      <div id='categories'>
        <CategoriesTab />
      </div>
    {children}
    
    </>
  )
}

export default Layout