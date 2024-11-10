import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { FaHeart } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import useCart from '../../hooks/useCart';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useFavorites from '../../hooks/useFavorites';
const FoodDetails = () => {
    const { user } = useAuth();
    const item = useLoaderData();
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const [cart, refetch] = useCart();
    const [favorites, refetchFavorites] = useFavorites();
    const axiosSecure = useAxiosSecure();
    // console.log(item);

    useEffect(() => {
        if (favorites && favorites?.menus?.some(fav => fav.menuId === item._id)) {
            setIsHeartFilled(true);
        } else {
            setIsHeartFilled(false);
        }
    }, [favorites, item._id]);


    // add to cart handler
    const handleAddToCart = () => {
        // console.log(item);
        if (user && user.email) {
            const cartItem = { menuItemId: item._id, name: item.name, quantity: 1, image: item.image, price: item.price, email: user.email }

            axios.post('http://localhost:6001/carts', cartItem)
                .then((response) => {
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

    //favorites handler
    const handleFavoritesAction = () => {
        if (user && user.email) {
            if (isHeartFilled) {
                // Remove from favorites
                const favoriteToRemove = favorites?.menus?.find(fav => fav.menuId === item._id);
                if (favoriteToRemove) {
                    axiosSecure.delete(`/favorites/${favorites._id}/menu/${favoriteToRemove._id}`)
                        .then((response) => {
                            if (response) {
                                refetchFavorites(); // Refetch favorites list
                                setIsHeartFilled(false); // Mark heart as unfilled
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Food removed from favorites list.',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                        .catch((error) => {
                            Swal.fire({
                                position: 'center',
                                icon: 'warning',
                                title: 'Something went wrong while removing from favorites.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        });
                }
            } else {
                // Add to favorites
                const cartItem = { menuId: item._id, name: item?.name, image: item?.image, price: item?.price, email: user.email }

                axiosSecure.post('/favorites', cartItem)
                    .then((response) => {
                        if (response) {
                            refetchFavorites(); // Refetch favorites list
                            setIsHeartFilled(true); // Mark heart as filled
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
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'Something went wrong while adding to favorites.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        } else {
            Swal.fire({
                title: 'Please login to manage your favorites list',
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
    };

    return (
        <div className='section-container px-4'>
            <div className='max-w-screen-2xl container mx-auto bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
                <div className='py-24 flex flex-col justify-center items-center gap-8'>
                    <div className='space-y-5 px-4'>
                        <h2 className='md:text-4xl text-4xl font-bold md:leading-snug leading-snug'>
                            Details About The <span className='text-primary'>{item?.name}</span>
                        </h2>
                    </div>
                </div>
            </div>

            <div className="md:grid grid-cols-5 grid-rows-5 gap-4">
                <div className="col-span-3 row-span-5 relative">
                    <h3 className="md:text-2xl text-2xl font-semibold py-4 px-2 text-start">
                        Category: <span className='text-red-500'> {item?.category}</span>
                        <span> - Price: <span className='text-red-500'>${item?.price}</span></span>
                    </h3>
                    <img
                        src={item?.image}
                        alt="food-image"
                        className='rounded-3xl w-full h-[465px] object-cover'
                    />
                    <div
                        className={`rating gap-1 absolute right-5 top-20 p-4 heartStar bg-primary ${isHeartFilled ? "text-rose-500" : "text-white"
                            }`}
                        onClick={handleFavoritesAction}
                    >
                        <FaHeart className="w-5 h-5 cursor-pointer" />
                    </div>
                    <div className="card-actions justify-between items-center mt-2">
                        <button className="btn bg-primary text-white absolute left-5 top-20 border-none" onClick={() => handleAddToCart()}>Add to Cart</button>
                    </div>
                </div>
                <div className="col-span-5 row-span-5 col-start-4 ps-3">
                    <h3 className="md:text-2xl text-2xl font-semibold py-4 px-2 text-center">Ingredients</h3>
                    <div className="flex flex-wrap justify-around items-center gap-10 md:ms-8">
                        {
                            item?.ingredients?.map((ingredient) => (
                                <div key={ingredient._id} className="space-y-3">
                                    <img
                                        src={ingredient?.ingredientImage}
                                        alt="food-image"
                                        className='w-20 h-20 md:w-30 md:h-30 rounded-full object-cover'
                                    />
                                    <h3 className="text-xs md:text-sm font-semibold">{ingredient?.ingredientName}</h3>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>

            <div className="space-y-6 mt-6">
                <h2 className='md:text-4xl text-4xl font-bold md:leading-snug leading-snug'>
                    Instructions
                </h2>

                <ul className="text-lg">
                    {
                        item?.instructions?.map((instruction, index) => (
                            <li key={instruction._id}>
                                STEP {index + 1}: {instruction.description}
                            </li>
                        ))

                    }
                </ul>
            </div>
        </div>
    )
}

export default FoodDetails