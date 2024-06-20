import React from 'react'

const Forminput = ({ type, name, placeholder, value, onChange, formtype="text" }) => {
    return (
        <div className="mb-3">
          {formtype==="text" &&  <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} className={`bg-white outline-none border p-4 rounded-lg w-full placeholder:text-black`} />}
           {formtype === 'textarea' && <textarea type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} className={`bg-white outline-none border p-4 h-48 rounded-lg w-full placeholder:text-black resize-none`}></textarea> }
           
        </div>
    )
}

export default Forminput