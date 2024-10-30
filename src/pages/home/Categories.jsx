import React from 'react';
import img1 from '../../assets/images/home/category/img1.png';
import img2 from '../../assets/images/home/category/img2.png';
import img3 from '../../assets/images/home/category/img3.png';
import img4 from '../../assets/images/home/category/img4.png';

const categoryItems = [
    { id: 1, title: "Main Dish", description: "(86 dishes)", image: img1 },
    { id: 2, title: "Break Fast", description: "(12 break fast)", image: img2 },
    { id: 3, title: "Dessert", description: "(48 dessert)", image: img3 },
    { id: 4, title: "Browse All", description: "(255 Items)", image: img4 }
];

const Categories = () => {
    return (
        <div className='section-container py-16'>
            <div className='text-center'>
                <p className='subtitle'>Customer Favorites</p>
                <h2 className='title'>Popular Categories</h2>
            </div>

            {/* Categories */}
            <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12'>
                {
                    categoryItems.map((item, index) => (
                        <div key={index}
                            className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto
                                text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all
                            '>
                            <div className='flex w-full mx-auto items-center justify-center'>
                                <img src={item.image} alt={`category-image-${item.id}`} className='bg-[#C1F1C6] rounded-full w-28 h-28' />
                            </div>
                            <div className='mt-5 space-y-1'>
                                <h5 >{item.title}</h5>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories