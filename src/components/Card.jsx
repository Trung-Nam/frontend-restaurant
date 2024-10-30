import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";

const Card = ({ item }) => {
    const [isHeartFilled, setIsHeartFilled] = useState(false);

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
    }

    return (
        <div className="card bg-base-100 w-96 shadow-xl mb-10">
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
                    <button className="btn bg-primary text-white">Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default Card