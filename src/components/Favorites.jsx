import React from 'react'
import useFavorites from '../hooks/useFavorites';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Favorites = () => {
    const [favorites, refetch] = useFavorites();
    const axiosSecure = useAxiosSecure();

    const handleDelete = async (favoritesId, item) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn bg-success text-white",
                cancelButton: "btn mr-5"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/favorites/${favoritesId}/menu/${item._id}`);
                    if (res.status === 200) {
                        refetch(); // Refetch favorites after successful deletion
                        swalWithBootstrapButtons.fire({
                            title: "Deleted!",
                            text: "Your item has been deleted.",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    swalWithBootstrapButtons.fire({
                        title: "Error!",
                        text: "There was an issue deleting your item.",
                        icon: "error"
                    });
                    console.error("Delete error:", error);
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your item is safe :)",
                    icon: "error"
                });
            }
        });
    };


    return (
        <div className="section-container">
            {/* banner */}
            <div className='max-w-screen-2xl container mx-auto bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
                <div className='py-36 flex flex-col justify-center items-center gap-8'>
                    <div className='space-y-7 px-4'>
                        <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
                            Your<span className='text-primary'> Favorites </span>List
                        </h2>
                    </div>
                </div>
            </div>

            {
                favorites?.menus?.length > 0 ? (
                    <>
                        {/* table */}
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead className="bg-primary text-white rounded-sm">
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th className="text-center">Food Image</th>
                                        <th className="text-center">Food Name</th>
                                        <th className="text-center">Price</th>
                                        <th className="text-center">Action</th>
                                        <th className="text-center">Buy now</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        favorites?.menus?.map((item, index) => (
                                            <tr key={item._id}>
                                                <td className='text-center'>{index + 1}</td>
                                                <td className='text-center'>
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={item?.image}
                                                                alt="item-image" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="font-medium text-center">
                                                    {item?.name}
                                                    {/* <br />
                                        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                                </td>
                                                <td className='text-center'>{item?.price}</td>
                                                <td className='text-center'>
                                                    <button className="btn btn-ghost btn-md text-soft-red" onClick={() => handleDelete(favorites._id, item)}>
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                                <td className='text-center'>
                                                    <button className="btn btn-success text-white btn-md" onClick={() => { }}>
                                                        Add to cart
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }


                                </tbody>
                                {/* foot */}
                                <tfoot>
                                </tfoot>
                            </table>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center md:h-96">
                        <h2 className="text-2xl">You have no items. <Link to="/menu" className="text-primary hover:underline">Order Now!!!</Link></h2>
                    </div>
                )
            }
        </div>
    )
}

export default Favorites