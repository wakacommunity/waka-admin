import React, { useEffect, useState } from 'react'
import { Api, Geturl } from './Api'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { PROFILE } from './store'

const AdminRoute = ({children}) => {
    const [loads, setLoads] = useState(false)
    const [, setUser] = useAtom(PROFILE)
    const navigate = useNavigate()

    useEffect(() => {
        const Fetchprofile = async () => {
            try {
                const res = await Geturl(Api.auth.profile)
                if (res.message !== 'Fetched success') {
                    setLoads(false)
                    return navigate('/')
                }

                setLoads(true)
                setUser(res.admin)
            } catch (error) {
                setLoads(false)
                return navigate('/')
            }
        }
        Fetchprofile()
    }, [])
    if (loads) return children
}

export default AdminRoute