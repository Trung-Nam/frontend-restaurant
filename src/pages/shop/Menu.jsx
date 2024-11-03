import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import { FaFilter } from 'react-icons/fa';

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOption, setSortOption] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const categories = ["all", ...new Set(menu.map(item => item.category))];

    useEffect(() => {
        fetchData();
    }, []);

    // Fetch data from the backend
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:6001/menu");
            const data = await response.json();
            setMenu(data);
            setFilteredItems(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Filtering items by category
    const filterItems = (category) => {
        const filtered = category === "all" ? menu : menu.filter((item) => item.category === category);
        setFilteredItems(filtered);
        setSelectedCategory(category);
        setCurrentPage(1);
    }

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
        setCurrentPage(1);
    }

    // Get current items based on the currentPage
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    // Total pages for pagination
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    // Handle pagination click
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    // Function to generate pagination items
    const getPaginationGroup = () => {
        const pages = [];
        const maxPageNumbers = 8; // Adjust this as needed
        const ellipsis = '...';

        if (totalPages <= maxPageNumbers) {
            // Show all pages if the total is less than or equal to maxPageNumbers
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // Add first page
            pages.push(1);

            // Show ellipsis if currentPage is far from the beginning
            if (currentPage > 3) pages.push(ellipsis);

            // Determine start and end of the pagination group around currentPage
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) pages.push(i);

            // Show ellipsis if currentPage is far from the end
            if (currentPage < totalPages - 2) pages.push(ellipsis);

            // Add last page
            pages.push(totalPages);
        }
        return pages;
    };


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
                {/* Filtering and sorting */}
                <div className='flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 my-8 px-4'>
                    {/* All categories buttons */}
                    <div className='flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap'>
                        {categories.map((item) => (
                            <button
                                onClick={() => filterItems(item)}
                                className={selectedCategory === item ? "active" : ""}
                                key={item}
                            >
                                {item.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Sorting filter */}
                    <div className="flex justify-end mb-4 rounded-sm">
                        <div className="bg-black p-2">
                            <FaFilter className="text-white h-4 w-4" />
                        </div>
                        <select
                            id="sort"
                            onChange={(e) => handleSortChange(e.target.value)}
                            value={sortOption}
                            className="bg-black text-white px-2 py-1 rounded-sm"
                        >
                            <option value="default">Default</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                            <option value="low-to-high">Low to High</option>
                            <option value="high-to-low">High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Products */}
                <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1'>
                    {currentItems.map((item) => (
                        <Card key={item._id} item={item} />
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="join flex justify-center my-8">
                {getPaginationGroup().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' && handlePageChange(page)}
                        className={`join-item btn ${currentPage === page ? "active" : ""} ${page === '...' ? "disabled" : ""}`}
                        disabled={page === '...'}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </>
    );
}

export default Menu;
