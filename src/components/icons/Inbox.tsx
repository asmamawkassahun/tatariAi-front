import React from 'react'

interface InboxProps {
    color?: string
}

const Inbox = ({ color = "#5B5B5B" }: InboxProps) => {
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.6663 14H18.6663L16.333 17.5H11.6663L9.33301 14H2.33301M25.6663 14V21C25.6663 21.6189 25.4205 22.2124 24.9829 22.6499C24.5453 23.0875 23.9518 23.3334 23.333 23.3334H4.66634C4.0475 23.3334 3.45401 23.0875 3.01643 22.6499C2.57884 22.2124 2.33301 21.6189 2.33301 21V14M25.6663 14L21.6413 5.96169C21.4482 5.57294 21.1504 5.24579 20.7815 5.01701C20.4125 4.78824 19.9871 4.66692 19.553 4.66669H8.44634C8.01224 4.66692 7.58682 4.78824 7.21789 5.01701C6.84897 5.24579 6.55118 5.57294 6.35801 5.96169L2.33301 14"
                stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default Inbox