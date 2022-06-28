import React from 'react'

const Line = ({Guess,solution}) => {
  const tiles = [];
  for (let i = 0; i < 5; i++) {
    tiles.push(<div className='border h-10 w-10 border-black'>{Guess[i]}</div>)
  }
  return (
    <div className='flex gap-2 '>{tiles}</div>
  )
}

export default Line