import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query';
const Order = () => {
    const { user } = useAuth();
    const token = localStorage.getItem('access-token');
    
    const { refetch, data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            if (!token) return []; // If no token, return an empty array
            const res = await fetch(`http://localhost:6001/payments?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            return res.json();
        },
        enabled: !!token, // Only run query if token is available
    });
    
console.log(orders);


    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            {/* banner */}
            <div className='max-w-screen-2xl container mx-auto bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
                <div className='py-36 flex flex-col justify-center items-center gap-8'>
                    <div className='space-y-7 px-4'>
                        <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
                            Track All Your <span className='text-primary'>Orders!</span>
                        </h2>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Order