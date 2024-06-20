import React, { useCallback, useEffect, useState } from 'react'
import Layout from './Layout'
import img1 from '../assets/images/img11.svg'
import Pagination from '../components/Pagination'
import { Link, useSearchParams } from 'react-router-dom'
import { Api, Geturl } from '../components/Api'
import { Alerter } from '../components/Utils'
import Filter from '../components/Filter'

const Users = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [search, setSearch] = useState('')
    const [params, setParams] = useSearchParams()
    const [main, setMain] = useState([])
    const [text, setText] = useState('There are no records found!...')
    const FetchUsers = useCallback(async (tags) => {
        setLoading(true)
        setText('')
        try {
            const res = await Geturl(`${Api.customers.list}?page_number=5&page=${params.get('page') ? params.get('page') : 1}${tags}`)
            if (res.message === "success") {
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
    

    const sendFilter = ele => {
        FetchUsers(ele)
    }
    return (
        <Layout>
            <div className="py-10">
                <Filter
                    showFilters={["search"]}
                    sendFilter={sendFilter}
                />
                <div className="w-full mt-10 overflow-x-auto">
                    <div className="w-fit">
                        <div className="w-[37rem] lg:w-[60rem]">
                            {loading ?
                                <>
                                    <div className="grid grid-cols-5 gap-2 mb-2 text-sm capitalize">
                                        {new Array(30).fill(0).map((item, i) => (
                                            <div className="bg-slate-300 animate-pulse h-14" key={i}></div>
                                        ))}
                                    </div>
                                </>
                                :
                                data.data?.length < 1 ?
                                    <div className="">{text}</div> :
                                    data.data?.map((item, i) => (
                                        <div className="grid w-full grid-cols-8 gap-2 mb-2 text-sm capitalize" key={i}>
                                            <Link to={`/users/${item.id}`} className="bg-mainyellow px-[0.8rem] py-4 col-span-2 rounded-md">{item.username}</Link>
                                            <div className="bg-mainyellow px-[0.8rem] py-4 rounded-md font-bold">role</div>
                                            <div className="bg-mainyellow px-[0.8rem] py-4 col-span-2 rounded-md flex items-center gap-3">merchant <div className="flex items-center justify-center w-6 h-6 ml-auto bg-white rounded-md"> {item.is_merchant === '1' && <div className="w-3 h-3 bg-black"></div>} </div> </div>
                                            <div className="bg-mainyellow px-[0.8rem] py-4 rounded-md">{item.gender}</div>
                                            <div className="bg-mainyellow px-[0.8rem] py-4 col-span-2 rounded-md flex items-center gap-3">admin <div className="flex items-center justify-center w-6 h-6 ml-auto bg-white rounded-md"> {item.role === 'admin' && <div className="w-3 h-3 bg-black"></div>} </div> </div>
                                        </div>
                                    ))}
                        </div>
                    </div>
                </div>
                <Pagination
                    total={data.last_page}
                    lastPage={data.last_page}
                    currentPage={data.current_page}
                    params={params}
                    setParams={setParams}
                />
            </div>
        </Layout>
    )
}

export default Users
