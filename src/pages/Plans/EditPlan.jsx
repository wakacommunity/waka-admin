import React, { useEffect, useState } from 'react'
import { Alerter } from '../../components/Utils'
import { Api, Geturl } from '../../components/Api'
import { useParams } from 'react-router-dom'
import PlanForm from './PlanForm'
import Layout from '../Layout'

const EditPlan = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const {id} = useParams()

  useEffect(() => {
    const FetchPlan = async () => {
      setLoading(true)
      try {
        const response = await Geturl(Api.plans.lists)
        if(response.message === 'successful') {
          const findData = response.data.find(ele => ele.id === parseInt(id))
          if(findData) return setData(findData)
        }
      } catch (error) {
        return Alerter('error', `${error.message}`)
      }finally {
        setLoading(false)
      }
    }
    FetchPlan()
  }, [])
  return (
    <Layout>
      {loading && <div className="text-center mt-10 text-xl">Loading content....</div> }
      {!loading && <PlanForm blogData={data} /> }
    </Layout>
  )
}

export default EditPlan
