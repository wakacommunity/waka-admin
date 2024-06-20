import React, { useEffect, useRef, useState } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import { Link } from 'react-router-dom'
import img1 from '../assets/images/img11.svg'
import img2 from '../assets/images/img15.png'
import moment from 'moment'
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Alerter } from './Utils'
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY/MM/DD';


const Filter = ({ link, dropdownTitle, linkTitle, placeholder, showFilters=[], searchText="search_text", sendFilter, useFilter=true }) => {
    const [search, setSearch] = useState('')
    const [filt, setFilt] = useState("")
    const [dates, setDates] = useState({
        from: '',
        to: ''
    })
    const disabledDate = (current) => {
        return current > moment()
    };
    const disabledDate2 = (current) => {
        return current < moment(dates?.from)
    }
    
    const handleFilterSelector = () => {
        let output;
        if (filt === 'date') {
            if (!dates.from) return Alerter('error', 'Provide a valid start date')
            if (!dates.to) return Alerter('error', 'Provide a valid end date')
            output = `&start_date=${dates.from}&end_date=${dates.to}`
        }else {
            if(!search) return Alerter('error', 'Provide a valid content to search for')
            output = `&${searchText}=${search}`
        }

        sendFilter(output)
    }

    const handleFiltering = (e) => {
        setFilt(e.target.value)
    }

    return (
        <div className="flex items-center gap-3 flex-wrap">
            {/* <div className="grid grid-cols-2 lg:grid-cols-5 gap-2"> */}
            {useFilter && <>
                <select
                onChange={handleFiltering}
                value={filt}
                className="bg-white outline-none border p-4 rounded-lg w-[10rem] placeholder:text-black`">
                <option value="">--Select--</option>
                {showFilters.includes("date") && <option value="date">Show Dates</option>}
                {showFilters.includes("search") && <option value="search">Show Search</option>}
            </select>
            {filt === 'date' && <div className="flex items-center gap-5 justify-center">
                <button className="flex items-center gap-3">
                    {/* <img src={img2} alt="" className="w-6" />
                    <span className="capitalize">from</span> */}
                    <DatePicker
                        disabledDate={disabledDate}
                        className={`py-3 text-xs w-[10rem]`}
                        placeholder={`From`}
                        name="from"
                        value={dates.from && dayjs(dates.from, dateFormat)}
                        format={dateFormat}
                        onChange={(values) => {
                            const val = moment(new Date(values)).format('YYYY-MM-DD');
                            setDates((prevState) => {
                                return {
                                    ...prevState,
                                    from: val
                                };
                            });
                        }} />
                </button>
                <button className="flex items-center gap-3">
                    <DatePicker
                        disabledDate={disabledDate2}
                        className={`py-3 text-xs w-[10rem]`}
                        placeholder={`To`}
                        name="to"
                        value={dates.to && dayjs(dates.to, dateFormat)}
                        format={dateFormat}
                        onChange={(values) => {
                            const val = moment(new Date(values)).format('YYYY-MM-DD');
                            setDates((prevState) => {
                                return {
                                    ...prevState,
                                    to: val
                                };
                            });
                        }} />
                </button>
            </div>}
            {filt === 'search' && <div className="flex items-center bg-[#f4f3f3] p-3 rounded-lg">
                <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder={placeholder} className="bg-transparent w-full text-sm placeholder:text-black outline-none border-none" />
                <img src={img1} alt="" className='w-4' />
            </div>}
            <button
                onClick={handleFilterSelector}
                className="bg-mainyellow py-4 px-4 rounded-lg flex w-[10rem] items-center justify-center text-sm gap-3">
                <span className="capitalize">filter</span>
                <img src={img1} alt="" className="w-4" />
            </button>
            </>}
           {link && <button className='bg-mainblack py-3 px-4 rounded-lg w-[10rem]'>
                <Link to={link} className="text-sm text-center rounded-lg text-white capitalize">{linkTitle}</Link>
            </button>}
        </div>
    )
}

export default Filter