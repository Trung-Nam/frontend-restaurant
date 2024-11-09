import React, { useContext, useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from 'sweetalert2'
import useCart from "../hooks/useCart";
import axios from 'axios';
import useAxiosSecure from "../hooks/useAxiosSecure";
import useFavorites from "../hooks/useFavoriteS";

const Cards = ({ item }) => {
    const { user } = useContext(AuthContext);
    const { name, image, price, _id } = item;
    const [favorites, refetchFavorites] = useFavorites();
    const [cart, refetch] = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [isHeartFilled, setIsHeartFilled] = useState(false);

    // Check if the item is in the favorites list
    useEffect(() => {
        if (favorites && favorites?.menus?.some(fav => fav.menuId === _id)) {
            setIsHeartFilled(true); // Mark the heart as filled
        } else {
            setIsHeartFilled(false); // Keep the heart unfilled
        }
    }, [favorites, _id]); // Re-run whenever favorites or item changes

    // add to cart handler
    const handleAddToCart = () => {
        if (user && user.email) {
            const cartItem = { menuItemId: _id, name, quantity: 1, image, price, email: user.email }

            axios.post('http://localhost:6001/carts', cartItem)
                .then((response) => {
                    if (response) {
                        refetch(); // refetch cart
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Food added to the cart.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
                .catch((error) => {
                    const errorMessage = error.response?.data?.message || 'Something went wrong';
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: errorMessage,
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        } else {
            Swal.fire({
                title: 'Please login to order the food',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    // add to favorites handler
    const handleAddToFavorites = () => {
        if (user && user.email) {
            const cartItem = { menuId: _id, name, image, price, email: user.email }

            axiosSecure.post('/favorites', cartItem)
                .then((response) => {
                    if (response) {
                        refetchFavorites(); // refetch favorites list
                        setIsHeartFilled(true); // mark heart as filled
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Food added to the favorites list.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
                .catch((error) => {
                    const errorMessage = error.response?.data?.message || 'Something went wrong';
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: errorMessage,
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        } else {
            Swal.fire({
                title: 'Please login to add to favorites list',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    return (
        <div className="card shadow-xl relative mx-2 md:my-4 overflow-hidden">
            <div
                className={`z-10 rating gap-1 absolute right-2 top-2 p-4 heartStar bg-primary ${isHeartFilled ? "text-rose-500" : "text-white"
                    }`}
                onClick={handleAddToFavorites}
            >
                <FaHeart className="w-5 h-5 cursor-pointer" />
            </div>
            <Link to={`/menu/${item._id}`}>
                <figure>
                    <img
                        src={item.image}
                        alt="image-dishes"
                        className='hover:scale-105 transition-all duration-200 md:h-72'
                    />
                </figure>
            </Link>
            <div className="card-body">
                <Link to={`/menu/${item._id}`}>
                    <h2 className="card-title hover:text-primary">{item.name}</h2>
                </Link>
                <p className="clamped-text">{item.description}</p>
                <div className="card-actions justify-between items-center mt-2">
                    <h5 className='font-semibold'>
                        <span className='text-sm text-soft-red'>$ </span>{item.price}
                    </h5>
                    <button className="btn bg-primary text-white" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Cards;
