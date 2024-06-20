import toast from "react-hot-toast"

export const TOKEN = 'waka-portal'


export const Alerter = (status, message) => {
    if(status === 'error') {
        return toast.error(`${message}`, {
            duration: 4000,
            position: "top-right"
        })
    }

    return toast.success(`${message}`, {
        duration: 4000,
        position: "top-right"
    })
}