import React from 'react'
function Icon(props) {
  return (
    <div>
      <svg className="icon" aria-hidden="true" style={{...props.style}}>
          <use xlinkHref={`#${props.type}`}></use>
      </svg>
    </div>
  )
}

export default Icon
