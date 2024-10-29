import React from 'react'
import banner from '../assets/images/home/banner.png'
import foodBanner1 from '../assets/images/home/b-food1.png'
const Banner = () => {
    return (
        <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
            <div className='py-24 flex flex-col md:flex-row justify-between items-center gap-8'>
                {/* Text */}
                <div className='md:w-1/2 space-y-7 px-4'>
                    <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
                        Dive into Delights Of Delectable <span className='text-primary'>Food</span>
                    </h2>
                    <p className='text-xl text-[#4A4A4A]'>
                        Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship
                    </p>
                    <button className='btn bg-primary px-8 py-3 font-semibold text-white rounded-full'>
                        Order Now
                    </button>
                </div>
                {/* Image */}
                <div className='md:w-1/2'>
                    <img src={banner} alt="banner" />

                    <div className='flex flex-col md:flex-row items-center justify-around -mt-14 gap-4'>
                        <div className='flex bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-64'>
                            <img src={foodBanner1} alt="food-banner" className='rounded-2xl' />
                            <div className='space-y-1'>
                                <h5 className='font-medium mb-1'>Spicy noodles</h5>
                                <div className="rating gap-1 rating-sm">
                                    <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
                                    <input type="radio" name="rating-3" className="mask mask-heart bg-orange-400" />
                                    <input type="radio" name="rating-3" className="mask mask-heart bg-yellow-400" />
                                    <input type="radio" name="rating-3" className="mask mask-heart bg-lime-400" />
                                    <input type="radio" name="rating-3" className="mask mask-heart bg-green-400" defaultChecked />
                                </div>
                                <p className="text-soft-red">$18.00</p>
                            </div>
                        </div>
                        <div className='sm:flex hidden bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-64'>
                            <img src={foodBanner1} alt="food-banner" className='rounded-2xl' />
                            <div className='space-y-1'>
                                <h5 className='font-medium mb-1'>Spicy noodles</h5>
                                <div className="rating gap-1 rating-sm">
                                    <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
                                    <input type="radio" name="rating-3" className="mask mask-heart bg-orange-400" />
                                    <input type="radio" name="rating-3" className="mask mask-heart bg-yellow-400" />
                                    <input type="radio" name="rating-3" className="mask mask-heart bg-lime-400" />
                                    <input type="radio" name="rating-3" className="mask mask-heart bg-green-400" defaultChecked />
                                </div>
                                <p className="text-soft-red">$18.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner