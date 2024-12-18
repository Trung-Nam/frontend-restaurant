import React, { useContext, useState } from 'react'
import useCart from '../../hooks/useCart';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2'
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from "react-router-dom"

const CartPage = () => {
    const [carts, refetch] = useCart();
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);

    const calculatePrice = (item) => {
        return item.price * item.quantity;
    }

    const cartSubTotal = carts?.reduce((total, item) => {
        return total + calculatePrice(item);
    }, 0);

    const totalPrice = cartSubTotal;

    const handleDelete = (item) => {
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
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://backend-restaurant-b5d2.onrender.com/carts/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        refetch();
                        swalWithBootstrapButtons.fire({
                            title: "Deleted!",
                            text: "Your item has been deleted.",
                            icon: "success"
                        });
                    })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });
    }

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            fetch(`https://backend-restaurant-b5d2.onrender.com/carts/${item._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({ quantity: item.quantity - 1 })
            })
                .then(res => res.json())
                .then(data => {
                    const updateCart = cartItems.map((cartItem) => {
                        if (cartItem.id === item.id) {
                            return {
                                ...cartItem,
                                quantity: cartItem.quantity - 1,
                            }
                        }
                        return cartItem;
                    })
                    refetch();
                    setCartItems(updateCart);
                })
        } else {
            alert("Quantity can't be zero!")
        }

    }

    const handleIncrease = (item) => {
        fetch(`https://backend-restaurant-b5d2.onrender.com/carts/${item._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ quantity: item.quantity + 1 })
        })
            .then(res => res.json())
            .then(data => {
                const updateCart = cartItems.map((cartItem) => {
                    if (cartItem.id === item.id) {
                        return {
                            ...cartItem,
                            quantity: cartItem.quantity + 1,
                        }
                    }
                    return cartItem;
                })
                refetch();
                setCartItems(updateCart);
            })
    }


    const handleChangeQuantity = (item, newQuantity) => {
        fetch(`https://backend-restaurant-b5d2.onrender.com/carts/${item._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ quantity: newQuantity })
        })
            .then(res => res.json())
            .then(data => {
                const updateCart = cartItems.map((cartItem) => {
                    if (cartItem.id === item.id) {
                        return {
                            ...cartItem,
                            quantity: newQuantity,
                        }
                    }
                    return cartItem;
                })
                refetch();
                setCartItems(updateCart);
            })
    }
    return (
        <div className="section-container">
            {/* banner */}
            <div className='max-w-screen-2xl container mx-auto bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
                <div className='py-36 flex flex-col justify-center items-center gap-8'>
                    <div className='space-y-7 px-4'>
                        <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
                            Items Added to The <span className='text-primary'>Cart</span>
                        </h2>
                    </div>
                </div>
            </div>
            {
                carts.length > 0 ? (
                    <>
                        {/* table */}
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead className="bg-primary text-white rounded-sm">
                                    <tr>
                                        <th>#</th>
                                        <th>Food Image</th>
                                        <th>Food Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        carts?.map((item, index) => (
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle h-12 w-12">
                                                                <img
                                                                    src={item?.image}
                                                                    alt="item-image" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="font-medium">
                                                    {item.name}
                                                    {/* <br />
                                        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                                </td>
                                                <td>
                                                    <button className="btn btn-md" onClick={() => handleDecrease(item)}>-</button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        className='w-10 mx-2 text-center overflow-hidden text-xl'
                                                        onChange={(e) => {
                                                            handleChangeQuantity(item, e.target.value)
                                                        }}
                                                    />
                                                    <button className="btn btn-md" onClick={() => handleIncrease(item)}>+</button>
                                                </td>
                                                <td>{calculatePrice(item).toFixed(2)}</td>
                                                <th>
                                                    <button className="btn btn-ghost btn-md text-soft-red" onClick={() => handleDelete(item)}>
                                                        <FaTrash />
                                                    </button>
                                                </th>
                                            </tr>
                                        ))
                                    }


                                </tbody>
                                {/* foot */}
                                <tfoot>
                                </tfoot>
                            </table>
                        </div>

                        {/* customer detail */}
                        <div className="my-24">
                            <h2 className="font-bold mb-6 text-2xl text-center">Order Details</h2>
                            <table className="min-w-full border-collapse border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Details</th>
                                        <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Information</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Customer Name</td>
                                        <td className="border border-gray-300 px-4 py-2">{user?.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Customer Email</td>
                                        <td className="border border-gray-300 px-4 py-2">{user?.email}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Total Items</td>
                                        <td className="border border-gray-300 px-4 py-2">{carts?.length}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Total Price</td>
                                        <td className="border border-gray-300 px-4 py-2">{totalPrice.toFixed(2) || 0}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <Link to="/process-checkout">

                                <button className="btn bg-primary text-white mt-4">Processed Checkout</button>
                            </Link>
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

export default CartPage