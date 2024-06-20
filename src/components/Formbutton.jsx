import React from 'react'

const Formbutton = ({ text, onClick, loading }) => {
  return (
    <button onClick={onClick} disabled={loading ? true : false} className='bg-mainyellow relative flex items-center justify-center gap-2 p-6 w-full rounded-lg'>{text} {loading && <>
      <div className="lds-hourglass"></div> 
      <div className="absolute top-0 left-0 w-full h-full bg-black/10 rounded-lg"></div>
      </>}
      </button>
  )
}

export default Formbutton