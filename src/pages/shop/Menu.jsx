import React from 'react'

const Menu = () => {
    return (
        <div>
            {/* Menu banner */}
            <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
                <div className='py-48 flex flex-col md:flex-row justify-center items-center gap-8'>
                    {/* Text */}
                    <div className='text-center space-y-7 px-4'>
                        <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
                            Dive into Delights Of Delectable <span className='text-primary'>Food</span>
                        </h2>
                        <p className='text-xl text-[#4A4A4A] md:w-4/5 mx-auto'>
                            "Come with family & feel the joy of mouthwatering food such as Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas Rellenas and more for a moderate cost."
                        </p>
                        <button className='btn bg-primary px-8 py-3 font-semibold text-white rounded-full'>
                            Order Now
                        </button>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Menu