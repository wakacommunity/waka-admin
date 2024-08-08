import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alerter } from '../../components/Utils'
import Formbutton from '../../components/Formbutton'
import { Api, Deleteurl, Posturl } from '../../components/Api'
import ConfirmModal from '../../components/ConfirmModal'
import { FaTimes } from 'react-icons/fa'

const BlogForm = ({ blogData }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        "title": blogData?.title || "",
        "image": blogData?.image || "",
        "link": blogData?.link || "",
    })
    const [loads, setLoads] = useState(false)
    const [view, setView] = useState(false)
    const imgRef = useRef()
    const [image, setImage] = useState({
        file: null,
        img: blogData?.image || ''
    })

    const handleChange = (e) => {
        setForms({ ...forms, [e.target.name]: e.target.value })
    }
    const handleSubmission = async () => {
        setLoading(true)
        try {
            if (!forms.title) return Alerter('error', 'Blog title is required')
            if (!forms.link) return Alerter('error', 'Link to blog content is required')
            if (!blogData?.id && !image.file) return Alerter('error', 'Blog image is required')

            let imageData;
            if (image.file) {
                const formData = new FormData()
                formData.append('file', image.file)
                formData.append('cloud_name', 'dsj1m5xjt')
                formData.append('upload_preset', 'waka_app')
                const cloud = await fetch(`https://api.cloudinary.com/v1_1/dsj1m5xjt/image/upload`, {
                    method: 'POST',
                    body: formData
                })
                const cloudResponse = await cloud.json()
                imageData = cloudResponse.url
            } else {
                imageData = blogData?.image
            }

            const filesToSave = {
                ...forms,
                image: imageData
            }

            const response = !blogData?.id ? await Posturl(Api.blog.create, filesToSave) : await Posturl(`${Api.blog.update}/${blogData?.id}`, filesToSave)
            if (response.message === 'success') {
                Alerter('success', 'Blog Uploaded successfully')
                return navigate('/blogs')
            }
        } catch (error) {
            return Alerter('error', `${error.message}`)
        } finally {
            setLoading(false)
        }
    }
    const handleDeleting = async () => {
        setLoads(true)
        try {
            const response = await Deleteurl(`${Api.blog.delete}/${blogData?.id}`)
            if (response.message === 'success') {
                Alerter('success', 'Blog Deleted successfully')
                return navigate('/blogs')
            }
        } catch (error) {
            return Alerter('error', `${error.message}`)
        } finally {
            setLoads(false)
        }
    }

    const handleFileUpload = e => {
        const file = e.target.files[0]
        if (!file) return Alerter('error', 'Please select a file')
        const reader = new FileReader()
        reader.onload = async () => {
            setImage({ file: file, img: reader.result })
        }
        reader.readAsDataURL(file)
    }
    const CancelFileUpload = () => {
        setImage({ file: null, img: '' })
        imgRef.current.value = null
    }
    return (
        <div>
            {view && <ConfirmModal
                onclose={() => setView(false)} title="Are you sure you want to delete this blog post?" onClick={handleDeleting} loading={loads} />}
            <div className="flex items-center gap-10 my-10">
                <div className="font-bold text-3xl">{!blogData?.id ? 'Create' : 'Update'} Blog Post</div>
                <button onClick={() => setView(true)} className="bg-red-500 py-3 px-5 rounded-lg capitalize text-white">delete</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="mb-2">
                    <input name="title" value={forms.title} onChange={handleChange} type="text" className="border border-mainblack py-6 px-4 w-full rounded-lg placeholder:text-black" placeholder='Title' />
                </div>
                <div className="mb-2">
                    <input name="link" value={forms.link} onChange={handleChange} type="text" className="border border-mainblack py-6 px-4 w-full rounded-lg placeholder:text-black" placeholder='Content' />
                </div>
                {/* <div className="mb-2">
                    <input name="image" value={forms.image} onChange={handleChange} type="text" className="border border-mainblack py-6 px-4 w-full rounded-lg placeholder:text-black" placeholder='Image' />
                </div> */}
                <div className="mb-2">
                    <input ref={imgRef} name="image" onChange={handleFileUpload} type="file" className="border border-mainblack py-6 px-4 w-full rounded-lg placeholder:text-black" placeholder='Image' />
                    {image.img && <div className="mt-3 border-4 border-slate-400 relative border-dashed">
                        <div className="absolute top-0 left-0 w-full bg-black/50 p-3">
                            <div className="w-fit ml-auto"><FaTimes onClick={CancelFileUpload} className='cursor-pointer text-white text-2xl' /></div>
                        </div>
                        <img src={image.img} alt="" className="" />
                    </div>}
                </div>
                <div className="mb-2">
                    <Formbutton loading={loading} text={!blogData?.id ? 'Create Blog' : 'Update Blog'} onClick={handleSubmission} />
                </div>
            </div>
        </div>
    )
}

export default BlogForm