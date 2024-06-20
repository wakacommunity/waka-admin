import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../Layout'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Api, Deleteurl, Geturl } from '../../components/Api'
import { Alerter } from '../../components/Utils'
import { FaArrowLeft } from 'react-icons/fa6'
import ConfirmModal from '../../components/ConfirmModal'

const SingleAdvert = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [view, setView] = useState(false)
    const [modal, setModal] = useState({
        loading: false,
        view: false,
        title: '',
        tag: '',
        id: ''
    })


    useEffect(() => {
        const FetchUsers = async () => {
            setLoading(true)
            try {
                const res = await Geturl(Api.ads.list)
                if (res.message === "Fetched successfully") {
                    const resolve = res.data.find(ele => ele.id === parseInt(id))
                    return setData(resolve)
                }
            } catch (error) {
                return Alerter('error', `${error}`)
            } finally {
                setLoading(false)
            }
        }
        FetchUsers()
    }, [])
    
    const handleModal = (tag, title, id) => {
        setModal({
            ...modal,
            view: true,
            title,
            tag,
            id,
        })
    }
    const HandleModalButton = async () => {
        setModal({...modal, loading: true})
        try {
            let response;
            if(modal.tag === 'approve') {
                 response = await Geturl(`${Api.ads.approve_ads}/${modal.id}`)
                return Alerter('success', `${response.message}`)
            }
            if(modal.tag === 'delete') {
                // response = await Geturl(`${Api.ads.}/${modal.id}`) 
            // return Alerter('success', `${response.message}`)
            }
            console.log(response)
            FetchUsers()
        } catch (error) {
            return Alerter(`${error}`)
        }finally {
            setModal({...modal, loading: false, view: false})
        }
    }
  return (
    <Layout>
    {modal.view && <ConfirmModal
        title={modal.title}
        loading={modal.loading}
        onclose={() => setModal({ ...modal, view: false })}
        onClick={HandleModalButton}
    />}
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
                        <div className="col-span-2 rounded-lg p-5 capitalize bg-mainyellow">Username</div>
                        <div className="col-span-5 rounded-lg p-5 bg-mainyellow">{data.username}</div>
                    </div>
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <div className="col-span-2 rounded-lg p-5 capitalize bg-mainyellow">Product</div>
                        <div className="col-span-5 rounded-lg p-5 bg-mainyellow">{data.name_of_product}</div>
                    </div>
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <div className="col-span-2 rounded-lg p-5 capitalize bg-mainyellow">Ads Duration</div>
                        <div className="col-span-5 rounded-lg p-5 bg-mainyellow">{data.duration_of_ads} Days </div>
                    </div>
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <div className="col-span-2 rounded-lg p-5 capitalize bg-mainyellow">Start Date</div>
                        <div className="col-span-5 rounded-lg p-5 bg-mainyellow">{data.start_date}</div>
                    </div>
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <div className="col-span-2 rounded-lg p-5 capitalize bg-mainyellow">End Date</div>
                        <div className="col-span-5 rounded-lg p-5 bg-mainyellow">{data.end_date}</div>
                    </div>
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <div className="col-span-2 rounded-lg p-5 capitalize bg-mainyellow">Paid Ads on</div>
                        <div className="col-span-5 rounded-lg p-5 bg-mainyellow">{data.paid_at}</div>
                    </div>
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <div className="col-span-2 rounded-lg p-5 capitalize bg-mainyellow">Price of Product</div>
                        <div className="col-span-5 rounded-lg p-5 bg-mainyellow">&#8358;{parseInt(data.price_of_product)?.toLocaleString()}</div>
                    </div>
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <div className="col-span-2 rounded-lg p-5 capitalize bg-mainyellow">Ads to run at</div>
                        <div className="col-span-5 rounded-lg p-5 bg-mainyellow">&#8358;{parseInt(data.perday)?.toLocaleString()} per day</div>
                    </div>
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <button 
                            onClick={() => handleModal('approve', 'Are you sure you want to approve this Ads?', data.id)} 
                            className="col-span-7 lg:col-span-2 rounded-lg p-5 capitalize bg-mainblack text-white text-left">Approve Ads</button>
                    </div>
                    <div className="grid grid-cols-7 gap-3 mb-2.5">
                        <Link to="/users" className="col-span-7 lg:col-span-2 rounded-lg p-5 capitalize bg-mainblack text-white">back to adverts</Link>
                    </div>
                </div>
            </div>}
    </Layout>
  )
}

export default SingleAdvert
