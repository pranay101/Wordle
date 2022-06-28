import React from 'react'

const Line = ({Guess,solution}) => {
  const tiles = [];
  for (let i = 0; i < 5; i++) {
    tiles.push(<div key={i} className='border h-16 w-16 border-black'>{Guess[i]}</div>)
  }
  return (
    <div className='flex gap-2 mx-auto '>{tiles}</div>
  )
}

export default Line