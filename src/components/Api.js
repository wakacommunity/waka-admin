import axios from "axios"
import Cookies from "js-cookie"
import { TOKEN } from "./Utils"

let baseUrl = `https://backendapi.wakacommunity.com/public/api/v1`

export const Roles = {
    MASTER: `master`,
}

const auth_urls = {
    login: `admin/login`,
    profile: `admin/profile`,
    dashboard: `admin/dashboard`,
    send_notification: `admin/customer/message-members`,
}

const customer_urls = {
    list: `admin/customer/list`,
    delete: `admin/customer/delete`,
}
const ads_urls = {
    list: `admin/advertisment/list`,
    approve_ads: `admin/advertisment/approve-ads`,
}
const chal_urls = {
    create: `admin/challenge/admin/create`,
    approve: `admin/challenge/approve`,
    disapprove: `admin/challenge/disapprove`,
    list: `admin/challenge/list`,
}

const blog_urls = {
    create: `admin/blogs/create`,
    update: `admin/blogs/update`,
    delete: `admin/blogs/destroy`,
    all: `admin/list`,
}
const wakashare_urls = {
    lists: `admin/wakashare/list`,
    comment_lists: `admin/wakashare/comment-list`,
    approve_waka: `admin/wakashare/approve`,
    unapprove_waka: `admin/wakashare/unapprove`,
    approve_comment: `admin/wakashare/approve/comment`,
    delete_comment: `admin/wakashare/delete-comments`,
    delete_wakashare: `admin/wakashare/delete-wakashare`,
    single_wakashare: `admin/challenge/show-waka`,
}

const plan_urls = {
    create: `admin/plan/create`,
    update: `admin/plan/update`,
    lists: `admin/plan/list`,
    delete: `admin/plan/delete-plan`,
}

export const Api = {
    auth: auth_urls,
    customers: customer_urls,
    ads: ads_urls,
    blog: blog_urls,
    wakashare: wakashare_urls,
    plans: plan_urls,
    challenge: chal_urls,
}

export const ClientPosturl = async (endpoint, data) => {
    const res = await axios.post(`${baseUrl}/${endpoint}`, data)
    if(res.status >200) return console.log(`something went wrong peace`)
    return res.data
}

export const Posturl = async (endpoint, data) => {
    const webToken = Cookies.get(TOKEN)
    const res = await axios.post(`${baseUrl}/${endpoint}`, data, {
        headers: {
            Authorization: `Bearer ${webToken}`
        }
    })
    if(res.status >200) return console.log(`something went wrong peace`)
    return res.data
}

export const Geturl = async (endpoint) => {
    const webToken = Cookies.get(TOKEN)
    const res = await axios.get(`${baseUrl}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${webToken}`
        }
    })
    if(res.status >200) return console.log(`something went wrong peace`)
    return res.data
}

export const Puturl = async (endpoint, data) => {
    const webToken = Cookies.get(TOKEN)
    const res = await axios.put(`${baseUrl}/${endpoint}`, data, {
        headers: {
            Authorization: `Bearer ${webToken}`
        }
    })
    if(res.status >200) return console.log(`something went wrong peace`)
    return res.data
}

export const Deleteurl = async (endpoint) => {
    const webToken = Cookies.get(TOKEN)
    const res = await axios.delete(`${baseUrl}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${webToken}`
        }
    })
    if(res.status >200) return console.log(`something went wrong peace`)
    return res.data
}

