import React, { useEffect, useState } from 'react'
import BlogForm from './BlogForm'
import Layout from '../Layout'
import { Api, Geturl } from '../../components/Api'
import { Alerter } from '../../components/Utils'
import { useParams } from 'react-router-dom'

const EditBlog = () => {
  const {id} = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})

useEffect(() => {
  const FetchUsers = async () => {
    setLoading(true)
    try {
        const res = await Geturl(Api.blog.all)
        if (res.message === "success") {
          const resolve = res.blog.data.find(ele => ele.id === parseInt(id))
            return setData(resolve)
        }
    } catch (error) {
        return Alerter('error', `${error}`)
    } finally {
        setLoading(false)
    }
}
FetchUsers()
}, [])
  return (
    <Layout>
      {loading && <div className='text-center mt-20 text-xl'>Loading content...</div>}
      {!loading &&  <BlogForm blogData={data} />}
    </Layout>
  )
}

export default EditBlog