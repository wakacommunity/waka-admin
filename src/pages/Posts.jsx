import { useCallback, useEffect, useState } from 'react'
import Layout from './Layout'
import Pagination from '../components/Pagination'
import { Api, Geturl } from '../components/Api'
import { Alerter } from '../components/Utils'
import ConfirmModal from '../components/ConfirmModal'
import { useSearchParams } from 'react-router-dom'



const Posts = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [params, setParams] = useSearchParams()
    const [list, setList] = useState({})
    const [single, setSingle] = useState({
        status: false,
    })
    const [, setMain] = useState([])
    const [, setText] = useState('There are no records found!...')
    const FetchUsers = useCallback(async () => {
        // setLoading(true)
        setText('')
        try {
            const res = await Geturl(`${Api.wakashare.lists}?page_number=5&page=${params.get('page') ? params.get('page') : 1}`)
            if (res.message === "success") {
                setMain(res.data.data)
                setList(res.data)
                return setData(res.data.data)
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
            if(single.tag === 'approve') {
                await Geturl(`${Api.wakashare.approve_waka}/${single.id}`)
                FetchUsers()
                return Alerter('success', `Waka Approved successfully`)
            }
            if(single.tag === 'unapprove') {
                await Geturl(`${Api.wakashare.unapprove_waka}/${single.id}`)
                FetchUsers()
                return Alerter('success', `Waka Unapproved successfully`)
            }
            if(single.tag === 'delete') {
                await Geturl(`${Api.wakashare.delete_wakashare}/${single.id}`)
                FetchUsers()
                return Alerter('success', `Waka Deleted successfully`)
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

    return (
        <Layout>
          {single.status &&  <ConfirmModal 
          loading={single.loading}
          onClick={handleSubmission}
          onclose={() => setSingle({...single, status: false})}
          title={single.title}
          />}
            <div className="">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                    {loading && <div className="mt-10 text-center">Loading contents....</div> }
                    {!loading && data.length > 0 && data.map((item, i) => (
                        <div className="col-span-2" key={i}>
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                                <div className="mx-auto w-fit">
                                    <img src={item.images[0]} alt="" className='w-[13rem] h-[16rem] object-cover border rounded-lg border-mainblack' />
                                </div>
                                <div className="flex flex-col w-11/12 gap-1 mx-auto lg:col-span-2">
                                  {item.approval === 0 &&  <button 
                                    onClick={() => handleModal({title: 'Are you sure you want to approve this waka post', id: item.id, tag: 'approve'})}
                                    className="w-full py-3 capitalize rounded-lg bg-mainyellow">approve</button>}

                                  {item.approval === 1 &&  <button 
                                    onClick={() => handleModal({title: 'Are you sure you want to unapprove this waka post', id: item.id, tag: 'unapprove'})}
                                    className="w-full py-3 capitalize rounded-lg bg-mainyellow">unapprove</button>}

                                    <button 
                                    onClick={() => handleModal({title: 'Are you sure you want to delete this waka post', id: item.id, tag: 'delete'})}
                                    className="w-full py-3 text-white capitalize rounded-lg bg-mainblack">delete</button>
                                    <button className="w-full py-3 capitalize rounded-lg bg-mainyellow">post by {item.customer?.username}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination 
                total={list.last_page}
                lastPage={list.last_page}
                currentPage={list.current_page}
                params={params}
                setParams={setParams}
                />
            </div>
        </Layout>
    )
}

export default Posts