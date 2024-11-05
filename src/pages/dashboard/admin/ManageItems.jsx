import React from "react";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageItems = () => {
    const [menu, loading, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();
    //   console.log(menu);

    //   handleDeleteItem
    const handleDeleteItem = (item) => {
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
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                // console.log(res);
                if (res) {
                    refetch();
                    swalWithBootstrapButtons.fire({
                        title: "Deleted!",
                        text: "Your item has been deleted.",
                        icon: "success"
                    });
                }
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your menu item safe :)",
                    icon: "error"
                });
            }
        });
    };
    return (
        <div className="w-full md:w-[870px] px-4 mx-auto">
            <h2 className="text-3xl font-semibold my-5 text-center">
                Manage All <span className="text-primary">Menu Items</span>
            </h2>
            {/* menu item table */}
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className="text-center text-sm font-bold">#</th>
                                <th className="text-center text-sm font-bold">Image</th>
                                <th className="text-center text-sm font-bold">Item Name</th>
                                <th className="text-center text-sm font-bold">Price</th>
                                <th className="text-center text-sm font-bold">Edit</th>
                                <th className="text-center text-sm font-bold">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menu.map((item, index) => (
                                <tr key={index}>
                                    <th className="text-center">{index + 1}</th>
                                    <td className="text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">{item.name}</td>
                                    <td className="text-center">${item.price}</td>
                                    <td className="text-center">
                                        <Link to={`/dashboard/update-menu/${item._id}`}>
                                            <button className="btn btn-ghost btn-md bg-orange-500 text-white">
                                                <FaEdit />
                                            </button>
                                        </Link>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            className="btn btn-ghost btn-md text-soft-red"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {/* row 1 */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;
