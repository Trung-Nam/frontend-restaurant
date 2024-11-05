import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from 'sweetalert2'
import useCart from "../hooks/useCart";
import axios from 'axios';

const Cards = ({ item }) => {
    const { name, image, price, recipe, _id } = item;

    const { user } = useContext(AuthContext);
    const [cart, refetch] = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(item)
    const [isHeartFilled, setIsHeartFilled] = useState(false);

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
    };

    // add to cart handler
    const handleAddToCart = () => {
        // console.log(item);
        if (user && user.email) {
            const cartItem = { menuItemId: _id, name, quantity: 1, image, price, email: user.email }

            axios.post('http://localhost:6001/carts', cartItem)
                .then((response) => {
                    console.log(response);
                    if (response) {
                        refetch(); // refetch cart
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Food added on the cart.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                    const errorMessage = error.response.data.message;
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: `${errorMessage}`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        }
        else {
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

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn bg-primary text-white",
                    cancelButton: "btn bg-[#d33] text-white mr-4"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: "LOGIN NOW!!!",
                text: "Please Login To Order The Food!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Login now!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: "Oh no :)",
                        icon: "error"
                    });
                }
            });
        }
    }

    return (
        <div className="card shadow-xl relative mx-2 md:my-4">
            <div
                className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-primary ${isHeartFilled ? "text-rose-500" : "text-white"
                    }`}
                onClick={handleHeartClick}
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
                <p>Description of the item</p>
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
