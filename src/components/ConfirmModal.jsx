import React, { useEffect, useRef } from 'react'
import Formbutton from './Formbutton'

const ConfirmModal = ({onclose, title, onClick, loading}) => {
  const togref = useRef()
  useEffect(() => {
    togref && window.addEventListener('click', e => {togref.current !== null && !togref.current.contains(e.target) && onclose()}, true)
  }, [])
  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-black/40 z-10 flex items-center justify-center'>
      <div ref={togref} className="bg-white p-5 rounded-md w-11/12 max-w-lg">
        <div className="text-center mb-10">{title}</div>
        <div className="grid grid-cols-2 gap-10">
          <button onClick={onclose} className="bg-slate-200 py-3 px-6 rounded-lg capitalize">Cancel</button>
          <Formbutton text="Proceed" onClick={onClick} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal