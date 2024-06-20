import React, { useRef, useState } from 'react'
import img from '../assets/images/img16.png'
import img1 from '../assets/images/img14.png'
import { Alerter } from './Utils'

const ImageUploader = ({ UploadImage }) => {
    const imgref = useRef()
    const [image, setImage] = useState({
        img: '',
        data: ''
    })
    const handleImageUpload = e => {
        const file = e.target.files[0]
        if (file.size > 1000000) {
            imgref.current = null
            return Alerter('error', 'File Upload must not exceed 1MB')
        }
        if (!file.type.startsWith('image/')) {
            imgref.current = null
            return Alerter('error', 'File Upload must be a valid image format')
        }
        setImage({
            img: URL.createObjectURL(file),
            data: file
        })
        UploadImage(file)
    }
    return (
        <div>
            <button className="bg-mainyellow py-3 px-3 mb-2 rounded-lg capitalize w-full">
                <label className='flex items-center justify-evenly cursor-pointer'>
                    <span className="">featured image</span>
                    <img src={img} alt="" className="w-5" />
                    <input ref={imgref} onChange={handleImageUpload} type="file" hidden />
                </label>
            </button>
            <div className="w-fit mx-auto">
                <img src={image.img || img1} alt="" className="h-[15rem] object-cover rounded-lg border border-black" />
            </div>
        </div>
    )
}

export default ImageUploader