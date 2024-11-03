import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import { AuthContext } from '../contexts/AuthProvider';
import { toast } from 'react-toastify';
const Card = ({ item }) => {
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
    }

    const handleAddToCart = (item) => {
        // console.log(item);
        if (user && user?.email) {
            const cartItem = {
                menuId: item._id,
                name: item.name,
                quantity: 1,
                image: item.image,
                price: item.price,
                email: user.email
            }
            fetch('http://localhost:6001/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        toast.success("Add to cart successfully!");
                    }
                })

        } else {
            toast.error("Please Sign In before order !!!");
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
    )
}

export default Card