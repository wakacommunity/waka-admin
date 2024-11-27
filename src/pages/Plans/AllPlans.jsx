

import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../Layout'
import Pagination from '../../components/Pagination'
import { Api, Geturl } from '../../components/Api'
import { Alerter } from '../../components/Utils'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { SlArrowDown } from 'react-icons/sl'
import Filter from '../../components/Filter'
import moment from 'moment'
import ConfirmModal from '../../components/ConfirmModal'

const TableHeaders = [
    "Plan Price",
    "Duration Type",
    "Total Perks",
    "Date Created",
    "Action"
]

const AllPlans = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [search, setSearch] = useState('')
    const [params, setParams] = useSearchParams()
    const [main, setMain] = useState([])
    const [single, setSingle] = useState({
        status: false,
    })
    const [text, setText] = useState('There are no records found!...')
    const FetchUsers = useCallback(async (tags) => {
        setLoading(true)
        setText('')
        try {
            const res = await Geturl(`${Api.plans.lists}?page_number=5&page=${params.get('page') ? params.get('page') : 1}${tags}`)
            if (res.message === "Fetched successfully") {

                // console.log(res, 'jodi') 
                setMain(res.data)
                return setData(res.data)
            }
        } catch (error) {
            return Alerter('error', `${error}`)
        } finally {
            setLoading(false)
        }
    }, [params])

    useEffect(() => {
        FetchUsers("")
    }, [FetchUsers])

    const handleModal = ({title, id, tag}) => {
        setSingle({
            ...single,
            status: true,
            title,
            id,
            tag
        })
    }

    const handleSubmission = async () => {
        setSingle({
            ...single,
            loading: true,
        })
        try {
            if(single.tag === 'delete') {
                const res = await Geturl(`${Api.plans.delete}/${single.id}`)
                FetchUsers()
                return Alerter('success', `Plan Deleted successfully`)
            }
        } catch (error) {
            Alerter('error',`${error.message}`)
        }finally {
            setSingle({
                ...single,
                status: false
            })
        }
    }
    const sendFilter = (ele) => {
        FetchUsers(ele)
    }
    return (
        <Layout>
        {single.status &&  <ConfirmModal 
        loading={single.loading}
        onClick={handleSubmission}
        onclose={() => setSingle({...single, status: false})}
        title={single.title}
        />}
            <div className="">
                <div className="">
                    <Filter 
                    link="/plans/new"
                    dropdownTitle={`ad plan`}
                    linkTitle={`add new plan`}
                    placeholder={`Search Price`}
                    showFilters={['date']}
                    sendFilter={sendFilter}
                    />
                    <div className="grid grid-cols-5 gap-4 mt-4">
                        {TableHeaders.map((ele, i) => (
                            <div className='p-4 text-sm text-center text-white capitalize rounded-lg bg-mainblack' key={i}>{ele}</div>
                        ))}
                    </div>
                    <div className="mt-3">
                        {loading && <div className="mt-10 text-xl text-center">Loading contents....</div> }
                        {!loading && data.data?.length > 0 && data.data?.map((item, i) => (
                            <div className="grid grid-cols-5 gap-4 text-sm text-center" key={i}>
                            <div onClick={() => navigate(`/plans/${item.id}/edit`)} className="gap-4 p-4 mb-2 rounded-lg cursor-pointer bg-mainyellow">&#8358;{parseInt(item.price)?.toLocaleString()}</div>
                                <div className="gap-4 p-4 mb-2 capitalize rounded-lg bg-mainyellow">{item.type}</div>
                                <div className="gap-4 p-4 mb-2 rounded-lg bg-mainyellow">{item.perks?.length}</div>
                                <div className="gap-4 p-4 mb-2 rounded-lg bg-mainyellow">{moment(item.created_at).format('DD-MM-YYYY h:mma')}</div>
                                <div className="gap-4 mb-2">
                                    <button 
                                    onClick={() => handleModal({title: 'Are you sure you want to delete this waka plan', id: item.id, tag: 'delete'})}
                                    className="w-full h-full py-3 text-white capitalize rounded-lg bg-mainblack">delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                <Pagination
                total={main.last_page}
                lastPage={main.last_page}
                currentPage={main.current_page}
                params={params}
                setParams={setParams} />
                </div>
            </div>
        </Layout>
    )
}

export default AllPlans