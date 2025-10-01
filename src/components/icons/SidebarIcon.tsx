import React from 'react'
interface SidebarIconProps {
    color?: string
}

const SidebarIcon = ({ color = "#1C1C1C" }: SidebarIconProps) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_209_1724)">
                <path d="M6.92338 0.769531V19.2311M2.82081 0.769531H17.1798C18.3127 0.769531 19.2311 1.68792 19.2311 2.82081V17.1798C19.2311 18.3127 18.3127 19.2311 17.1798 19.2311H2.82081C1.68792 19.2311 0.769531 18.3127 0.769531 17.1798V2.82081C0.769531 1.68792 1.68792 0.769531 2.82081 0.769531Z"
                    stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_209_1724">
                    <rect width="20" height="20" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}

export default SidebarIcon