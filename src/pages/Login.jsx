import React, { useState } from 'react'
import logo from '../assets/images/logo.png'
import Forminput from '../components/Forminput'
import Formbutton from '../components/Formbutton'
import { useNavigate } from 'react-router-dom'
import { Api, ClientPosturl, Roles } from '../components/Api'
import { Alerter, TOKEN } from '../components/Utils'
import Cookies from 'js-cookie'
import { decodeToken } from 'react-jwt'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [forms, setForms] = useState({
    email: '',
    password: ``
  })
  const handleForms = e => {
    setForms({
      ...forms,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!forms.email) return Alerter(`error`, `Admin Email Address is required`)
    if (!forms.password) return Alerter(`error`, `Admin Password is required`)
    setLoading(true)
    try {
      const res = await ClientPosturl(Api.auth.login, forms)
      if (res.status !== 'success') return Alerter(`error`, `Something went wrong`)
      Alerter(`good`,`Welcome back ${res.customer?.firstname}!...`)
      Cookies.set(TOKEN, res.token)
      if (res.customer.admin_type === Roles.MASTER) return navigate('/dashboard')
    } catch (error) {
      Alerter('error', `${error.message}`)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <form onSubmit={handleSubmit} className="w-11/12 max-w-md flex flex-col gap-4">
        <div className="w-fit mx-auto">
          <img src={logo} alt="" className="" />
        </div>
        <Forminput name="email" value={forms.email} onChange={handleForms} placeholder={`Email Address`} />
        <Forminput type="password" name="password" value={forms.password} onChange={handleForms} placeholder={`****************`} />
        <Formbutton text="Login" loading={loading} />
        <div className="flex items-center gap-2">
          <button type="button" className="w-6 h-6 rounded-md bg-white"></button>
          <span className="text-white">Remember me</span>
        </div>
      </form>
    </div>
  )
}

export default Login