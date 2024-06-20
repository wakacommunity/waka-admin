

import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../Layout'
import Pagination from '../../components/Pagination'
import { Api, Geturl, Posturl } from '../../components/Api'
import { Alerter } from '../../components/Utils'
import { useSearchParams } from 'react-router-dom'
import { SlArrowDown } from 'react-icons/sl'
import Filter from '../../components/Filter'
import moment from 'moment'
import ConfirmModal from '../../components/ConfirmModal'
import ChallengeModal from './ChallengeModal'

const TableHeaders = [
    "challenge name",
    "challenge type",
    "date",
    "",
]

const Challenge = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [view, setView] = useState({
        status: false,
        data: {}
    })
    const [params, setParams] = useSearchParams('')
    const [main, setMain] = useState([])
    const [single, setSingle] = useState({
        status: false,
    })
    const [text, setText] = useState('There are no records found!...')
    const FetchUsers = useCallback(async () => {
        setLoading(true)
        setText('')
        try {
            const res = await Geturl(`${Api.challenge.list}?page_number=5&page=${params.get('page') ? params.get('page') : 1}`)
            if (res.message === "success") {
                setMain(res.blog)
                return setData(res.blog)
            }
        } catch (error) {
            return Alerter('error', `${error}`)
        } finally {
            setLoading(false)
        }
    }, [params])

    useEffect(() => {
        FetchUsers()
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
            const response = single.tag === 'approve' ? await Posturl(`${Api.challenge.disapprove}/${single.id}`) : await Posturl(`${Api.challenge.approve}/${single.id}`)
            FetchUsers()
            Alerter('success', response.message)
        } catch (error) {
            Alerter('error',`${error.message}`)
        }finally {
            setSingle({
                ...single,
                status: false
            })
        }
    }

    const handleSingles= (item) => {
        setView({
           ...view,
            status: true,
            data: item
        })
    }

    
    return (
        <Layout>
        {single.status &&  <ConfirmModal 
        loading={single.loading}
        onClick={handleSubmission}
        onclose={() => setSingle({...single, status: false})}
        title={single.title}
        />}
       {view.status && <ChallengeModal onclose={() => setView({...view, status: false})} data={view.data} />}
            <div className="">
                <div className="">
                    <Filter 
                    useFilter={false}
                    link="/challenges/new"
                    dropdownTitle={`challenge type`}
                    linkTitle={`add new challenge`}
                    placeholder={`Search Chanllenge`}
                    />
                    <div className="grid grid-cols-4 gap-3 mt-4">
                        {TableHeaders.map((ele, i) => (
                            <div className='text-center bg-mainblack text-white rounded-lg capitalize p-4 text-sm' key={i}>{ele}</div>
                        ))}
                    </div>
                    {loading && <div className="mt-10 text-xl text-center">Loading contents....</div> }
                    <div className="mt-3">
                        {!loading && data?.data?.length > 0 && data?.data.map((item, i) => (
                            <div className="grid grid-cols-4 gap-3 text-sm text-center" key={i}>
                                <div 
                                onClick={() => handleSingles(item)}
                                className="gap-4 bg-mainyellow rounded-lg p-4 mb-2 cursor-pointer">{item.challenge_name}</div>
                                <div className="gap-4 bg-mainyellow rounded-lg p-4 mb-2">{item.type}</div>
                                <div className="gap-4 bg-mainyellow rounded-lg p-4 mb-2">{moment(item.created_at).format('DD-MM-YYYY')}</div>
                                <div className="gap-4 mb-2">
                                    <button 
                                    onClick={() => handleModal({title: `Are you sure you want to ${item.status === 1 ? 'disapprove' : 'approve'} this challenge`, id: item.id, tag: item.status === 1 ? 'approve' : 'disapprove'})}
                                    className="w-full h-full py-3 text-white capitalize rounded-lg bg-mainblack">{item.status === 1 ? 'Approved' : 'Disapproved'}</button>
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

export default Challenge