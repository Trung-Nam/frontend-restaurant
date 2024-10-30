import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOption, setSortOption] = useState('default');

    useEffect(() => {
        fetchData();
    }, []);

    // Fetch data from the backend
    const fetchData = async () => {
        try {
            const response = await fetch("/menu.json");
            const data = await response.json();
            setMenu(data);
            setFilteredItems(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    // filtering data base category
    const filterItems = (category) => {
        const filtered = category === "all" ? menu : menu.filter((item) => item.category === category);

        setFilteredItems(filtered);
        setSelectedCategory(category);
    }
    // Show all data func
    const showAll = () => {
        setFilteredItems(menu);
        setSelectedCategory("all");
    };

    // Sorting based on A-Z, Z-A, Low-High pricing
    const handleSortChange = (option) => {
        setSortOption(option);

        const sortedItems = [...filteredItems];

        switch (option) {
            case "A-Z":
                sortedItems.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Z-A":
                sortedItems.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "low-to-high":
                sortedItems.sort((a, b) => a.price - b.price);
                break;
            case "high-to-low":
                sortedItems.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setFilteredItems(sortedItems);
    }

    return (
        <>
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

            {/* Menu shop */}
            <div className='section-container'>
                {/* filtering and sorting */}
                <div>

                </div>

                {/* products */}
                <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1'>
                    {
                        filteredItems.map((item) => (
                            <Card key={item._id} item={item}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Menu