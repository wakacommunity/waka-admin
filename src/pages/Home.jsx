import  { useEffect, useState } from 'react'
import Layout from './Layout'
import img1 from '../assets/images/img4.svg'
import img9 from '../assets/images/img6.svg'
import img6 from '../assets/images/img8.svg'
import img3 from '../assets/images/img9.svg'
import img5 from '../assets/images/img10.svg'
import img8 from '../assets/images/img12.svg'
import img4 from '../assets/images/img13.svg'
import { Alerter } from '../components/Utils'
import { Api, Geturl } from '../components/Api'


const Home = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    useEffect(() => {
        const FetchDashboard = async () => {
            setLoading(true)
            try {
                const res = await Geturl(Api.auth.dashboard)
                const result = res.data
                setData([
                    {
                        img: img1,
                        title: `total users`,
                        amount: result.customer
                    },
                    {
                        img: img9,
                        title: `Total Advert Revenue`,
                        amount: result.adverts
                    }, 
                    {
                        img: img3,
                        title: `total comments`,
                        amount: result.comments
                    },
                    {
                        img: img4,
                        title: `Total Waka Coins Spent`,
                        amount: result.waka_coin_spent
                    },
                    {
                        img: img8,
                        title: `Total Waka Coins Earned`,
                        amount: result.waka_coin_earn
                    },
                    {
                        img: img6,
                        title: `Total Products Purchased`,
                        amount: result.total_products_purchased
                    },
                    {
                        img: img9,
                        title: `Advert Revenue for this month`,
                        amount: result.advertsmonth
                    },
                    {
                        img: img5,
                        title: `Total Waka Steps`,
                        amount: result.total_waka_steps
                    },
                    {
                        img: img9,
                        title: `total adverts`,
                        amount: result.adverts_count
                    },
                ])
            }catch (error) {
                Alerter('error', error)
            }finally {
                setLoading(false)
            }
        }
        FetchDashboard()
    }, [])
  return (
    <Layout>
        <div className="py-10">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">
                {loading ? new Array(10).fill(0).map((item, i) => (
                    <div className="bg-slate-300 px-3 py-14 h-[15rem] animate-pulse flex flex-col items-center justify-center rounded-lg gap-3" key={i}></div>
                ))
                :
                data.length > 0 && data.map((item, i) => (
                    <div className="bg-mainyellow px-3 py-14 flex flex-col items-center justify-center rounded-lg gap-3" key={i}>
                        <img src={item.img} alt="" />
                        <div className="capitalize">{item.title}</div>
                        <div className="font-bold">{parseInt(item.amount)?.toLocaleString()}</div>
                    </div>
                ))}
            </div>
        </div>
    </Layout>
  )
}

export default Home