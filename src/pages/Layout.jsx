import React, { useEffect, useRef, useState } from 'react'
import img1 from '../assets/images/img1.svg'
import img2 from '../assets/images/img2.svg'
import SideNav from '../components/SideNav'
import { Link } from 'react-router-dom'
import { SlMenu } from 'react-icons/sl'
import { useAtom } from 'jotai'
import { PROFILE } from '../components/store'

const Layout = ({ children }) => {
    const [side, setSide] = useState(false)
    const [user,] = useAtom(PROFILE)
    const togref = useRef()
    useEffect(() => {
        togref && window.addEventListener('click', e => {togref.current !== null && !togref.current.contains(e.target) && setSide(false)}, true)
    }, [])
    return (
        <div>
            <div className={`fixed top-0 left-0 w-full h-screen bg-mainblack/40 z-10 ${side ? '' : 'hidden'}`}>
                <div ref={togref} className="w-3/6 bg-black overflow-y-auto h-screen">
                    <SideNav />
                </div>
            </div>
            <div className="p-6 w-11/12 mx-auto">
                <div className="flex items-center justify-between">
                    <div className="">
                        <button onClick={() => setSide(!side)} className="text-white lg:hidden text-2xl"><SlMenu /></button>
                    </div>
                    <div className="flex items-center justify-end text-white gap-16">
                        <button className="flex items-center gap-1">
                            <img src={img2} alt="" />
                            <div className="">{user.firstname} {user.lastname}</div>
                        </button>
                        <Link to="/" className="flex items-center gap-1">
                            <img src={img1} alt="" />
                            <div className="hidden lg:block">Logout</div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-9 w-[95%] mx-auto">
                <div className="hidden lg:block lg:col-span-2 h-[90vh] overflow-y-auto overflow-x-hidden">
                    <SideNav />
                </div>
                <div className="lg:col-span-7 h-[90vh] overflow-y-auto overflow-x-hidden bg-white rounded-lg">
                    <div className="w-11/12 mx-auto py-5">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default Layout