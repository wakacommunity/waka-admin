
import React, { useEffect, useRef } from 'react'
import {FaTimes} from 'react-icons/fa'

export default function PopupModal ({onclose, children}) {
  const togref = useRef()
  useEffect(() => {
    togref && window.addEventListener('click', e => {togref.current !== null && !togref.current.contains(e.target) && onclose()}, true)
  }, [])
  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-black/40 z-10 flex items-center justify-center'>
      <div ref={togref} className="bg-white p-5 rounded-md w-11/12 max-w-lg max-h-[80dvh] overflow-y-auto relative">
        <div 
        onClick={onclose}
        className="absolute top-2 right-2 cursor-pointer bg-slate-300 p-2 rounded-full"> <FaTimes /> </div>
        {children}
      </div>
    </div>
  )
}
