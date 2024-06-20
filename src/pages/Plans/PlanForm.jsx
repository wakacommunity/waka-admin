
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alerter } from '../../components/Utils'
import Formbutton from '../../components/Formbutton'
import { Api, Posturl } from '../../components/Api'
import { FaTimes } from 'react-icons/fa'

const PlanForm = ({ blogData }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        "price": blogData?.price || '',
        "type": blogData?.type || "",
        "perk": blogData?.perks || []
    })
    const [perks, setPerks] = useState(blogData?.perks || [])
    const [title, setTitle] = useState('')

    const handleChange = (e) => {
        setForms({ ...forms, [e.target.name]: e.target.value })
    }
    const handleSubmission = async () => {
        setLoading(true) 
        try {
            if (!forms.price) return Alerter('error', 'Plan price is required')
            if (!forms.type) return Alerter('error', 'Plan type is required')
            if (perks.length < 1) return Alerter('error', 'Plan Perks are required')
            const formbody = {
                ...forms,
                perk: perks
            }
            const response = !blogData?.id ? await Posturl(Api.plans.create, formbody) : await Posturl(`${Api.plans.update}/${blogData?.id}`, formbody)
            if (response.message === 'succesfully') {
                Alerter('success', 'Plan Uploaded successfully')
                return navigate('/plans')
            }
        } catch (error) {
            return Alerter('error', `${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const AddPerks = () => {
        if (!title) return Alerter('error', 'Enter a valid content ')
        const findPerk = perks.find(ele => ele === title)
        if (findPerk) return Alerter('error', 'Content already exists')
        setPerks([title, ...perks])
        setTitle('')
        Alerter('success', 'Content Added')
    }
    const RemovePerk = (item) => {
        const val = perks.find(ele => ele === item)
        if (val) {
            const filterout = perks.filter(ele => ele !== item)
            setPerks(filterout)
        }
    }
    return (
        <div>
            <div className="flex items-center gap-10 my-10">
                <div className="font-bold text-3xl">{!blogData?.id ? 'Create' : 'Update'} Plan</div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="mb-2">
                    <input name="price" value={forms.price} onChange={handleChange} type="number" className="border border-mainblack py-6 px-4 w-full rounded-lg placeholder:text-black" placeholder='Price' />
                </div>
                <div className="mb-2">
                    <select  name="type" value={forms.type} onChange={handleChange} className="border border-mainblack py-6 px-4 w-full rounded-lg placeholder:text-black" >
                        <option value="">--Select--</option>
                        <option value="day">Days</option>
                        <option value="month">Months</option>
                    </select>
                    {/* <input name="type" value={forms.type} onChange={handleChange} type="text" className="border border-mainblack py-6 px-4 w-full rounded-lg placeholder:text-black" placeholder='Plan Type' /> */}
                </div>
                <div className="col-span-2">
                    <div className="mb-3">Add Perks</div>
                    <div className="mb-2 flex items-center gap-3">
                        <input name="title" value={title} onChange={e => setTitle(e.target.value)} type="text" className="border border-mainblack py-6 px-4 w-5/6 rounded-lg placeholder:text-black" placeholder='' />
                        <button onClick={AddPerks} className="bg-mainblack py-4 px-5 rounded-lg text-white capitalize">add perk</button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {perks.map((item, index) => (
                            <div className="border border-slate-400 py-4 px-4 rounded-lg text-sm grid grid-cols-7 gap-2 h-fit" key={index}>  <span className="col-span-6">{item} </span> <div onClick={() => RemovePerk(item)} className="flex cursor-pointer items-center justify-center w-full h-full"><FaTimes className='text-xl' /></div> </div>
                        ))}
                    </div>
                </div>
                <div className="mb-2">
                    <Formbutton loading={loading} text={!blogData?.id ? 'Create Plan' : 'Update Plan'} onClick={handleSubmission} />
                </div>
            </div>
        </div>
    )
}

export default PlanForm