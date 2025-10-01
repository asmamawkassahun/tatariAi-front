import React from 'react'
interface HistoryProps {
    color?: string
}

const History = ({ color = "#1C1C1C" }: HistoryProps) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_209_1718)">
                <path d="M0.769531 10.0003C0.769531 11.826 1.31091 13.6106 2.3252 15.1286C3.33949 16.6466 4.78114 17.8298 6.46784 18.5284C8.15454 19.2271 10.0105 19.4099 11.8011 19.0537C13.5917 18.6975 15.2365 17.8184 16.5274 16.5274C17.8184 15.2365 18.6975 13.5917 19.0537 11.8011C19.4099 10.0105 19.2271 8.15454 18.5284 6.46784C17.8298 4.78114 16.6466 3.33949 15.1286 2.3252C13.6106 1.31091 11.826 0.769531 10.0003 0.769531C7.41974 0.779239 4.94283 1.78617 3.08748 3.57979L0.769531 5.89774M0.769531 5.89774V0.769531M0.769531 5.89774H5.89774M10.0003 4.8721V10.0003L14.1029 12.0516"
                    stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_209_1718">
                    <rect width="20" height="20" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}

export default History