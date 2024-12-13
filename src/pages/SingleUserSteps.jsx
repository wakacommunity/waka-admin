import React, { useCallback, useEffect, useState } from 'react'
import Layout from './Layout'
import { Link, useParams } from 'react-router-dom'
import { Api, Geturl } from '../components/Api'
import { Alerter } from '../components/Utils'
import moment from 'moment'
import { FaArrowLeft } from 'react-icons/fa6'
import img1 from '../assets/images/img11.svg'
import Filter, { dateFormat } from '../components/Filter'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'

function SingleUserSteps() {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [analysis, setAnalysis] = useState([])
    const [searchtext, setSearchText] = useState('')
    const FetchUsers = useCallback(async (tags) => {
        setLoading(true)
        try {
            const returnData = await Geturl(`${Api.wakashare.user}?customer_id=${id}${tags ? `&date_time=${tags}` : ''}`)
            return setAnalysis(returnData.comments?.data)
        } catch (error) {
            return Alerter('error', `${error}`)
        } finally {
            setLoading(false)
        }
    }, [])
    useEffect(() => {
        FetchUsers("")
    }, [FetchUsers])

    const sendFilter = ele => {
        if(!searchtext) return FetchUsers("")
        return FetchUsers(searchtext)
    }
    return (
        <Layout>
            <div>
                <Link to={'/users'} className="flex items-center gap-3 font-semibold">
                    <FaArrowLeft />
                    Back
                </Link>
            </div>
            <div className="my-10">
                <div className="flex items-center gap-2">
                    <Link to={`/users/${id}`} className="py-2 px-5 rounded-md bg-slate-200">Profile</Link>
                    <Link to={`/users/${id}/steps`} className="py-2 px-5 rounded-md bg-mainblack text-white">Steps</Link>
                </div>
            </div>
            <div className="flex flex-row flex-wrap items-center gap-5">
                <DatePicker
                    className={`py-3 text-xs w-[10rem]`}
                    placeholder={`search date`}
                    value={searchtext && dayjs(searchtext, dateFormat)}
                    format={dateFormat}
                    onChange={(values) => {
                        const val = moment(new Date(values)).format('YYYY-MM-DD');
                        console.log(val)
                        setSearchText(val);
                    }} />
                <button
                    onClick={sendFilter}
                    className="bg-mainyellow py-4 px-4 rounded-lg flex w-[10rem] items-center justify-center text-sm gap-3">
                    <span className="capitalize">filter</span>
                    <img src={img1} alt="" className="w-4" />
                </button>
            </div>
            <div className="font-bold text-xl mt-6 mb-3">Waka Steps</div>
            {!loading && analysis.map((item, index) => (
                <div className="grid grid-cols-7 gap-3 mb-2.5" key={index}>
                    <div className="col-span-2 rounded-lg p-2 capitalize">{moment(item.created_at).format('Do MMM YYYY hh:mm a')}</div>
                    <div className="col-span-5 rounded-lg p-2 font-bold text-xl text-right">{parseFloat(item.steps)?.toLocaleString()}</div>
                </div>
            ))}
            {loading && <div className="text-center text-xl mt-10">Loading content...</div>}
        </Layout>
    )
}

export default SingleUserSteps