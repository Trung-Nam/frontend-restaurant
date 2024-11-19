import React from 'react'
import useMenu from '../../hooks/useMenu'

const Categories = () => {
    const [menu] = useMenu();
    
    // Count dishes by category
    const categoryCounts = menu.reduce((acc, dish) => {
        const categoryName = dish.category.name;

        if (!acc[categoryName]) {
            acc[categoryName] = {
                name: categoryName,
                count: 0,
                image: dish.category.image 
            };
        }

        acc[categoryName].count += 1;

        return acc; 
    }, {});

    // Convert object to array
    const categories = Object.values(categoryCounts);

    return (
        <div className='section-container py-16'>
            <div className='text-center'>
                <p className='subtitle'>Customer Favorites</p>
                <h2 className='title'>Popular Categories</h2>
            </div>

            {/* Categories */}
            <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12'>
                {
                    categories?.slice(0, 4)?.map((item, index) => (
                        <div key={index}
                            className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto
                                text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all
                            '>
                            <div className='flex w-full mx-auto items-center justify-center'>
                                <img src={item.image} alt={`category-image-${item.name}`} className='bg-[#C1F1C6] rounded-full w-28 h-28' />
                            </div>
                            <div className='mt-5 space-y-1'>
                                <h5 className='font-bold'>{item.name}</h5>
                                <p>({item.count} dishes)</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories;
