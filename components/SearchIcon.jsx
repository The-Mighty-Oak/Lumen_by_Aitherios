import React from 'react'

const SearchIcon = () => {
  return (
      <div>
      <svg role="icon" aria-label="Search Icon"
          xmlns="http://www.w3.org/2000/svg"
          width="41.737"
          height="38.791"
          viewBox="0 0 41.737 38.791">
          <g
              transform="translate(7.742) rotate(14)">
              <circle className='SearchIcon1'
                  cx="16"
                  cy="16"
                  r="16"
                  transform="translate(0 0)"
                  fill="#0c0d0d" />
              <line className='SearchIcon2'
                  x2="22.059"
                  y2="10.132"
                  transform="translate(16 16)"
                  fill="none"
                  stroke="#0c0d0d"
                  strokeMiterlimit="10"
                  strokeWidth="3" />
          </g>
        </svg>
      </div>
  )
}

export default SearchIcon