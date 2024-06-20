import React, { useState } from 'react'
import Layout from './Layout'
import Forminput from '../components/Forminput'
import Formbutton from '../components/Formbutton'
import { Alerter } from '../components/Utils'
import { Api, Posturl } from '../components/Api'

const SendNotification = () => {
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        title: '',
        message: '',
    })
    const handleForms = e => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmission = async e => {
        e.preventDefault()
        if (!forms.title) return Alerter('error', 'Notification title is required')
        if (!forms.message) return Alerter('error', 'Notification message is required')
        try {
            setLoading(true)
            const response = await Posturl(Api.auth.send_notification, forms)
            Alerter('success', 'Notification sent successfully')
            setForms({
                title: '',
                message: '',
            })
        } catch (error) {
            Alerter('error', error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <Layout>
            <div className="text-3xl font-bold mb-10">Send Message to all Members</div>
            <form onSubmit={handleSubmission}>
                <div className="mb-3">
                    <Forminput
                        name="title"
                        onChange={handleForms}
                        value={forms.title}
                        placeholder={'Title'}
                    />
                </div>
                <div className="mb-3">
                    <Forminput
                        formtype="textarea"
                        name="message"
                        onChange={handleForms}
                        value={forms.message}
                        placeholder={'Enter message...'}
                    />
                </div>
                <div className="w-fit ml-auto">
                    <Formbutton text="Send Notification" loading={loading} />
                </div>
            </form>
        </Layout>
    )
}

export default SendNotification
