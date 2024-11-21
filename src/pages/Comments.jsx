import { useCallback, useEffect, useState } from 'react'
import Layout from './Layout'
import Pagination from '../components/Pagination'
import { Alerter } from '../components/Utils'
import { Api, Geturl } from '../components/Api'
import ConfirmModal from '../components/ConfirmModal'
import { useSearchParams } from 'react-router-dom'
import moment from 'moment'

const Comments = () => {
    const [params, setParams] = useSearchParams()
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState({})
    const [data, setData] = useState([])
    const [, setMain] = useState([])
    const [modal, setModal] = useState({
        loading: false,
        view: false,
        title: '',
        tag: '',
        id: ''
    })

    const FetchUsers = useCallback(async () => {
        setLoading(true)
        try {
            const res = await Geturl(`${Api.wakashare.comment_lists}?page_number=5&page=${params.get('page') ? params.get('page') : 1}`)
            if (res.message === "success") {

                setMain(res.comments)
                setList(res.comments)
                return setData(res.comments)
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
        setModal({ ...modal, loading: true })
        try {
            let response;
            if (modal.tag === 'approve') {
                response = await Geturl(`${Api.wakashare.approve_comment}/${modal.id}`)
                return Alerter('success', `${response.message}`)
            }
            if (modal.tag === 'delete') {
                response = await Geturl(`${Api.wakashare.delete_comment}/${modal.id}`)
                return Alerter('success', `${response.message}`)
            }
            console.log(response)
            FetchUsers()
        } catch (error) {
            return Alerter(`${error}`)
        } finally {
            setModal({ ...modal, loading: false, view: false })
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
            <div className="py-10">
                {loading && new Array(5).fill(0).map((item, i) => (
                    <div className="mb-5 animate-pulse" key={i}>
                        <div className="p-4 bg-slate-100 h-44 ">
                            <div className="w-3/5 h-10 bg-slate-300"></div>
                            <div className="grid grid-cols-2 gap-4 mt-5 lg:grid-cols-4">
                                {new Array(4).fill(0).map((item, j) => (
                                    <div className="h-16 bg-slate-300" key={j}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                {!loading && data.data?.length > 0 && data.data?.map((item, i) => (
                    <div className="mb-5" key={i}>
                        <div className="flex items-center gap-2">
                            <img src={item.image} alt="" className="size-12 object-cover rounded-full block" />
                            <div>
                                <div className="">  {item.comment}</div>
                                <div className="text-sm">Date Posted: {moment(item.created_at).format('Do MMM YYYY, hh:mmA')}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-3 lg:grid-cols-4">
                            <button
                                onClick={() => handleModal('delete', 'Are you sure you want to delete this comment?', item.id)}
                                className="p-4 text-sm text-white rounded-lg bg-mainblack">Delete</button>
                            <button
                                onClick={() => handleModal('approve', 'Are you sure you want to approve this comment?', item.id)}
                                className="p-4 text-sm text-black rounded-lg bg-mainyellow">Approve</button>
                            <button className="p-4 text-sm rounded-lg bg-mainyellow">Comment by {item.fullname}</button>
                        </div>
                    </div>
                ))}
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

export default Comments