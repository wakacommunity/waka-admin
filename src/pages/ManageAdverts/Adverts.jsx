



import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../Layout'
import Pagination from '../../components/Pagination'
import { Api, Geturl } from '../../components/Api'
import { Alerter } from '../../components/Utils'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { SlArrowDown } from 'react-icons/sl'
import Filter from '../../components/Filter'

const TableHeaders = [
    "product name",
    "Username",
    "Pricing",
    "duration",
    "Ad start date",
    "Ad finish date",
]

const Adverts = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [params, setParams] = useSearchParams()
    const [main, setMain] = useState([])
    const [text, setText] = useState('There are no records found!...')
    const FetchUsers = useCallback(async (tags) => {
        setLoading(true)
        setText('')
        try {
            const res = await Geturl(`${Api.ads.list}?page_number=5&page=${params.get('page') ? params.get('page') : 1}${tags}`)
            if (res.message === "Fetched successfully") {
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

    
    const sendFilter = (ele) => {
        FetchUsers(ele)
    }

    return (
        <Layout>
            <div className="">
                <div className="">
                    <Filter 
                    link=""
                    dropdownTitle={`ad plan`}
                    linkTitle={`add new advert`}
                    placeholder={`Search advert`}
                    showFilters={["date", "search"]}
                    searchText='name_of_product'
                    sendFilter={sendFilter}
                    />
                    <div className="grid grid-cols-6 gap-4 mt-4">
                        {TableHeaders.map((ele, i) => (
                            <div className='p-4 text-sm text-center text-white capitalize rounded-lg bg-mainblack' key={i}>{ele}</div>
                        ))}
                    </div>
                    <div className="mt-3">
                        {loading && <div className="mt-10 text-xl text-center">Loading contents....</div> }
                        {!loading && data.data?.length > 0 && data.data?.map((item, i) => (
                            <div className="grid grid-cols-6 gap-4 text-sm text-center" key={i}>
                                <div onClick={() => navigate(`/adverts/${item.id}`)} className="gap-4 p-4 mb-2 rounded-lg cursor-pointer bg-mainyellow">{item.name_of_product}</div>
                                <div className="gap-4 p-4 mb-2 rounded-lg bg-mainyellow">{item.username}</div>
                                <div className="gap-4 p-4 mb-2 rounded-lg bg-mainyellow">{item.price_of_product}</div>
                                <div className="gap-4 p-4 mb-2 rounded-lg bg-mainyellow">{item.duration_of_ads} Days</div>
                                <div className="gap-4 p-4 mb-2 rounded-lg bg-mainyellow">{item.start_date || '--'}</div>
                                <div className="gap-4 p-4 mb-2 rounded-lg bg-mainyellow">{item.end_date || '--'}</div>
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

export default Adverts