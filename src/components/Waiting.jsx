import React from 'react'

const Waiting = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <span className="loading loading-infinity loading-lg text-success"></span>
        </div>
    )
}

export default Waiting