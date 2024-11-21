

import { useRef, useState } from 'react'
import { Api, Posturl } from '../../components/Api'
import { Alerter } from '../../components/Utils'
import Formbutton from '../../components/Formbutton'
import Forminput from '../../components/Forminput'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'
import { FaTimes } from 'react-icons/fa'

const ChallengeForm = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        challenge_name: "",
        max_steps: "",
        start_date: "",
        end_date: "",
    })
    const imgRef = useRef()
    const [image, setImage] = useState({
        file: null,
        img: ''
    })


    const handleForms = e => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmission = async e => {
        e.preventDefault()
        if (!forms.challenge_name) return Alerter('error', 'Challenge Name is required')
        if (!forms.max_steps) return Alerter('error', 'Challenge maximum steps is required')
        if (!forms.start_date) return Alerter('error', 'Challenge Start date is required')
        if (!forms.end_date) return Alerter('error', 'Challenge End date is required')
        if (!image.file) return Alerter('error', 'Upload image to the challenge')
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('file', image.file)
            formData.append('cloud_name', 'dsj1m5xjt')
            formData.append('upload_preset', 'waka_app')
            const cloud = await fetch(`https://api.cloudinary.com/v1_1/dsj1m5xjt/image/upload`, {
                method: 'POST',
                body: formData
            })
            const cloudResponse = await cloud.json()
            const filesToSave = {
               ...forms,
                image: cloudResponse.url
            }
            const response = await Posturl(Api.challenge.create, filesToSave)
            if (response.message === 'Created Successful') {
                Alerter('success', 'Challenge Created Successfully')
                return navigate('/challenges')
            }
        } catch (error) {
            Alerter('error', error.message)
        } finally {
            setLoading(false)
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
        <form onSubmit={handleSubmission}>
            <div className="my-10">
                <div>
                    <Link to={'/challenges'} className="flex items-center gap-3 font-semibold">
                        <FaArrowLeft />
                        Back
                    </Link>
                </div>
                <div className="font-bold text-3xl">Create New Challenge</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-3">
                    <div className="">Title of Challenge</div>
                    <Forminput
                        name="challenge_name"
                        onChange={handleForms}
                        value={forms.challenge_name}
                        placeholder={'Title of Challenge'}
                    />
                </div>
                <div className="mb-3">
                    <div className="">Max. Steps</div>
                    <Forminput
                        name="max_steps"
                        onChange={handleForms}
                        value={forms.max_steps}
                    />
                </div>
                <div className="mb-3">
                    <div className="">Start Date</div>
                    <Forminput
                        name="start_date"
                        onChange={handleForms}
                        value={forms.start_date}
                        type='date'
                    />
                </div>
                <div className="mb-3">
                    <div className="">End Date</div>
                    <Forminput
                        name="end_date"
                        onChange={handleForms}
                        value={forms.end_date}
                        type='date'
                    />
                </div>
                {/* <div className="mb-3">
                    <div className="">Upload Image Url</div>
                    <Forminput
                        name="image"
                        onChange={handleForms}
                        value={forms.image}
                        placeholder={'Image URL'}
                    />
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
            </div>
            <div className="w-fit ml-auto">
                <Formbutton text="Submit Challenge" loading={loading} />
            </div>
        </form>

    )
}

export default ChallengeForm