import React from 'react'
import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'

const NavLinks = [
    {
        title: `dashboard`,
        url: `/dashboard`,
    },
    {
        title: `users`,
        url: `/users`,
    },
    {
        title: `comments`,
        url: `/comments`,
    },
    {
        title: `posts`,
        url: `/posts`,
    },
    {
        title: `Health & wellness blog`,
        url: `/blogs`,
    },
    {
        title: `Challenges`,
        url: `/challenges`,
    },
    {
        title: `Plans`,
        url: `/plans`,
    },
    {
        title: `Advertisement`,
        url: `/adverts`,
    },
    {
        title: `Send Notification`,
        url: `/notifications`,
    }
]

const SideNav = () => {
  return (
    <div className='w-11/12 mx-auto pb-20'>
        <div className="w-fit mx-auto">
            <img src={logo} alt="" />
        </div>
        <div className="flex flex-col">
            {NavLinks.map((item, i) => (
                <Link to={`${item.url}`} key={i} className={`border-b border-mainyellow py-3`}>
                    <div className={`${window.location.pathname.includes(item.url) ? 'bg-mainyellow rounded-lg' : 'text-white'} capitalize p-4`}>{item.title}</div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SideNav