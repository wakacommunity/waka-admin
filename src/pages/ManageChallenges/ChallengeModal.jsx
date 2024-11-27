import React from 'react'
import PopupModal from '../../components/PopupModal'
import moment from 'moment'

export default function ChallengeModal({ data, onclose }) {

    return (
        <PopupModal onclose={onclose}>
            <div className="border-b p-3">
                <div className="font-bold">{data.challenge_name}</div>
            </div>
            <div className="p-3">
                <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="border rounded-lg p-2">
                        <div className="font-thin text-sm">Max Steps</div>
                        <div className="uppercase font-bold">{parseFloat(data.max_steps)?.toLocaleString()}</div>
                    </div>
                    <div className="border rounded-lg p-2">
                        <div className="font-thin text-sm">Status</div>
                        <div className={`uppercase font-bold ${data.status === 0 ? 'text-red-600' : 'text-green-600'}`}>{data.status === 0 ? 'Disapproved' : 'Approved'}</div>
                    </div>
                    <div className="border rounded-lg p-2">
                        <div className="font-thin text-sm">Challenge Type</div>
                        <div className="uppercase font-bold">{data.type}</div>
                    </div>
                    <div className="border rounded-lg p-2">
                        <div className="font-thin text-sm">Challenge Start date</div>
                        <div className="uppercase">{moment(new Date(data.start_date)).format('DD-MM-YYYY')}</div>
                    </div>
                    <div className="border rounded-lg p-2">
                        <div className="font-thin text-sm">Challenge End date</div>
                        <div className="uppercase">{moment(new Date(data.end_date)).format('DD-MM-YYYY')}</div>
                    </div>
                </div>
                <img src={data.image} alt="" className="block w-full h-[30rem] object-contain bg-black" />
            </div>
        </PopupModal>
    )
}

