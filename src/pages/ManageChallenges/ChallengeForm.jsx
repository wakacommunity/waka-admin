

import React, { useState } from 'react'
import { Api, Posturl } from '../../components/Api'
import { Alerter } from '../../components/Utils'
import Formbutton from '../../components/Formbutton'
import Forminput from '../../components/Forminput'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'

const ChallengeForm = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        challenge_name: "",
        max_steps: "",
        start_date: "",
        end_date: "",
        image: ""
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
        if (!forms.image) return Alerter('error', 'Attach an image url to the challenge')
        setLoading(true)
        try {
            const response = await Posturl(Api.challenge.create, forms)
            if(response.message === 'Created Successful') {
                Alerter('success', 'Challenge Created Successfully')
                return navigate('/challenges')
            }
        } catch (error) {
            Alerter('error', error.message)
        } finally {
            setLoading(false)
        }
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
                <div className="mb-3">
                    <div className="">Upload Image Url</div>
                    <Forminput
                        name="image"
                        onChange={handleForms}
                        value={forms.image}
                        placeholder={'Image URL'}
                    />
                </div>
            </div>
            <div className="w-fit ml-auto">
                <Formbutton text="Submit Challenge" loading={loading} />
            </div>
        </form>

    )
}

export default ChallengeForm