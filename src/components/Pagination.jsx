import React, { useState } from 'react'
import { Alerter } from './Utils'

const Pagination = ({total, currentPage, setParams, params, lastPage}) => {
    const [form, setForm] = useState(currentPage || params.get('page') || 1)
    const handleNextPage = () => {
        if(currentPage >= lastPage) return
        setParams({
         ...params,
            page: params.get('page')? parseInt(params.get('page')) + 1 : 2
        })
    }

    const handlePrevPage = () => {
        if(currentPage <= 1) return
        setParams({
         ...params,
            page: params.get('page')? parseInt(params.get('page')) - 1 : 2
        })
    }

    const handleCustomePage = (val) => {
        if(val.includes('-')) return Alerter('error', 'pagination cannot contain a negative number')
        if(val.startsWith(0)) return Alerter('error', 'pagination cannot start with a zero')
        if(val.length > 0) {
            setParams({
             ...params,
                page: form
            })
        }
    }
    return (
        <div className="grid grid-cols-2 mt-10">
            <div className="flex flex-row items-center p-4 text-white rounded-lg bg-mainblack w-fit">
                <button className="px-3 capitalize border-r" onClick={handlePrevPage}>previous</button>
                <button className="px-3 capitalize" onClick={handleNextPage}>next</button>
            </div>
            <div className="flex flex-row items-center justify-end gap-3">
                <span>Page</span>
                {/* <span className='px-2 border rounded-md border-mainblack'>{currentPage}</span> */}
                <input 
                onKeyUp={e => handleCustomePage(e.target.value)}
                type="number"
                value={form} 
                onChange={e => setForm(e.target.value)} 
                className='border rounded-lg border-slate-500 w-10 text-center' />
                <span>of {total}</span>
            </div>
        </div>
    )
}

export default Pagination