import React, { useCallback, useEffect, useState } from 'react'
import Layout from './Layout'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Api, Deleteurl, Geturl } from '../components/Api'
import { Alerter } from '../components/Utils'
import { FaArrowLeft } from 'react-icons/fa6'
import ConfirmModal from '../components/ConfirmModal'
import moment from 'moment'

const SingleUser = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [view, setView] = useState(false)
    const [loads, setLoads] = useState(false)
    const [analysis, setAnalysis] = useState([])

    useEffect(() => {
        const FetchUsers = async () => {
            setLoading(true)
            try {
                const res = await Geturl(`${Api.customers.single}/${id}`)
                const returnData = await Geturl(`${Api.wakashare.user}?customer_id=${id}`)
                setAnalysis(returnData.comments?.data)
                return setData(res.data)
            } catch (error) {
                return Alerter('error', `${error}`)
            } finally {
                setLoading(false)
            }
        }
        FetchUsers()
    }, [])
    const PorceedToDelete = async () => {
        setLoads(true)
        try {
            await Deleteurl(`${Api.customers.delete}/${data.id}`)
                Alerter('success', 'User Deleted successfully')
                return navigate('/users')
            
        } catch (error) {
            Alerter('error', `${error}`)
        }finally {
            setLoads(false)
        }
    }
    return (
        <Layout>
            {view && <ConfirmModal 
            loading={loads}
            onClick={PorceedToDelete}
            title={`Are you sure you want to delete ${data.username}'s account`}
            onclose={() => setView(false)}
            /> }
            <div>
                <Link to={'/users'} className="flex items-center gap-3 font-semibold">
                <FaArrowLeft />
                Back
                </Link>
            </div>
            {loading && <div className="text-center text-xl mt-10">Loading content...</div> }
          {!loading &&  <div className="grid grid-cols-1 lg:grid-cols-8 gap-3 mt-10">
                <div className="lg:col-span-2 lg:p-3 w-fit mx-auto">
                    <img src={data.image} alt="" className="h-[15rem] object-cover rounded-lg border border-black" />
                </div>
                <div className="lg:col-span-6 text-sm lg:text-base lg:p-3">
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <div className="col-span-2 rounded-lg p-5 capitalize bg-mainyellow">name</div>
                        <div className="col-span-5 rounded-lg p-5 bg-mainyellow">{data.username}</div>
                    </div>
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <div className="col-span-2 rounded-lg p-5 capitalize bg-mainyellow">email</div>
                        <div className="col-span-5 rounded-lg p-5 bg-mainyellow">{data.email} </div>
                    </div>
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <div className="col-span-2 rounded-lg p-5 capitalize bg-mainyellow">gender</div>
                        <div className="col-span-5 rounded-lg p-5 bg-mainyellow">{data.gender}</div>
                    </div>
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <div className="col-span-2 rounded-lg p-5 capitalize bg-mainyellow">birthdate</div>
                        <div className="col-span-5 rounded-lg p-5 bg-mainyellow">{data.dob}</div>
                    </div>
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <div className="col-span-2 rounded-lg p-5 capitalize bg-mainyellow">country</div>
                        <div className="col-span-5 rounded-lg p-5 bg-mainyellow">{data.country}</div>
                    </div>
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <div className="col-span-2 rounded-lg p-5 capitalize bg-mainyellow">height</div>
                        <div className="col-span-5 rounded-lg p-5 bg-mainyellow">{data.height}</div>
                    </div>
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <div className="col-span-2 rounded-lg p-5 capitalize bg-mainyellow">weight</div>
                        <div className="col-span-5 rounded-lg p-5 bg-mainyellow">{data.weight}</div>
                    </div>
                    <div className="font-bold text-xl mt-6 mb-3">Waka Steps</div>
                    {analysis.map((item, index) => (
                        <div className="grid grid-cols-7 gap-3 mb-2.5" key={index}>
                        <div className="col-span-2 rounded-lg p-2 capitalize">{moment(item.createdAt).format('Do MMM YYYY')}</div>
                        <div className="col-span-5 rounded-lg p-2 font-bold text-xl text-right">{parseFloat(item.steps)?.toLocaleString()}</div>
                    </div>
                    ))}
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <div className="col-span-2 rounded-lg p-5 capitalize bg-mainyellow">Make Admin</div>
                        <div className="col-span-5 rounded-lg p-3">
                            <button className="w-5 h-5 rounded-md border border-black"></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <button className="col-span-7 lg:col-span-2 rounded-lg p-5 capitalize bg-mainblack text-white text-left">save data</button>
                    </div>
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <button onClick={() => setView(!view)} className="col-span-7 lg:col-span-2 rounded-lg p-5 capitalize bg-mainyellow text-black text-left">Delete User</button>
                    </div>
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <Link to="/users" className="col-span-7 lg:col-span-2 rounded-lg p-5 capitalize bg-mainblack text-white">back to users</Link>
                    </div>
                </div>
            </div>}
        </Layout>
    )
}

export default SingleUser