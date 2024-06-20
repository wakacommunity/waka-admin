import React from 'react'
import BlogForm from './BlogForm'
import Layout from '../Layout'

const CreateBlog = () => {
  return (
    <Layout>
        <BlogForm blogData={null} />
    </Layout>
  )
}

export default CreateBlog