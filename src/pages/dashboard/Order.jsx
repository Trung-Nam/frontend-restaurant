import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

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

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    }

    return (
        <div className="max-w-screen-2xl container mx-auto px-4">
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


            {/* table */}
            <div className="overflow-x-auto">
                {
                    orders.length > 0 ? (
                        <table className="table">
                            {/* head */}
                            <thead className="bg-primary text-white rounded-sm">
                                <tr>
                                    <th>#</th>
                                    <th>Order Date</th>
                                    <th>Transaction ID</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    orders?.map((item, index) => (
                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {formatDate(item?.createAt)}
                                            </td>
                                            <td>
                                                {item?.transactionId}
                                            </td>
                                            <td>
                                                {item?.quantity}
                                            </td>
                                            <td>
                                                {item?.price}
                                            </td>
                                            <td>
                                                {item?.status}
                                            </td>

                                            <th>
                                                <Link className="btn btn-ghost btn-md text-soft-red">
                                                    Contact
                                                </Link>
                                            </th>
                                        </tr>
                                    ))
                                }


                            </tbody>
                            {/* foot */}
                            <tfoot>
                            </tfoot>
                        </table>
                    ) : (
                        <div className="flex items-center justify-center md:h-96">
                            <h2 className="text-2xl">You have no transactions. <Link to="/menu" className="text-primary hover:underline">Order Now!!!</Link></h2>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Order