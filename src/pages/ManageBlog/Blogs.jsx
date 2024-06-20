import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../Layout'
import Pagination from '../../components/Pagination'
import { Api, Geturl } from '../../components/Api'
import { Alerter } from '../../components/Utils'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Filter from '../../components/Filter'
import moment from 'moment'

const TableHeaders = [
    "title",
    "Content",
    "date",
]

const Blogs = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [params, setParams] = useSearchParams()
    const [list, setList] = useState({})
    const [search, setSearch] = useState('')
    const [main, setMain] = useState([])
    const [text, setText] = useState('There are no records found!...')
    const FetchUsers = useCallback(async (tags) => {
        setLoading(true)
        setText('')
        try {
            const res = await Geturl(`${Api.blog.all}?page_number=5&page=${params.get('page') ? params.get('page') : 1}${tags}`)
            if (res.message === "success") {
                setMain(res.blog.data)
                setList(res.blog)
                return setData(res.blog.data)
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

    const sendFilter = (ele) => {
        FetchUsers(ele)

    }
    return (
        <Layout>
            <div className="">
                <Filter
                    link="/blogs/new"
                    dropdownTitle={`category`}
                    linkTitle={`add new blog post`}
                    placeholder={`Search Topics`}
                    showFilters={['date', 'search']}
                    sendFilter={sendFilter}
                />
                <div className="">
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {TableHeaders.map((ele, i) => (
                            <div className='p-4 text-sm text-center text-white capitalize rounded-lg bg-mainblack' key={i}>{ele}</div>
                        ))}
                    </div>
                    <div className="mt-3">
                        {loading && <div className="mt-10 text-xl text-center">Loading contents...</div>}
                        {!loading && data.length > 0 && data.map((item, i) => (
                            <div className="grid grid-cols-3 gap-4 text-sm text-center" key={i}>
                                <div onClick={() => navigate(`/blogs/${item.id}/edit`)} className="gap-4 p-4 mb-2 rounded-lg cursor-pointer bg-mainyellow">{item.title}</div>
                                <div className="gap-4 p-4 mb-2 break-words rounded-lg bg-mainyellow">{item.link}</div>
                                <div className="gap-4 p-4 mb-2 rounded-lg bg-mainyellow">{moment(item.created_at).format('DD-MM-YYYY')}</div>
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
            </div>
        </Layout>
    )
}

export default Blogs
// {
//     "price": 1000,
//     "type": "month",
//     "perk": ["Wide reach to all Waka app users", "Your business logo stays on the back of our major physical wakathon t-shirts", "Wide on Waka Community International  Foundation platforms"]
// }