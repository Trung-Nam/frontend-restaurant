import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { FaFilter, FaSearch } from 'react-icons/fa';
import useMenu from '../../hooks/useMenu';

const Menu = () => {
    const [menu] = useMenu();
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOption, setSortOption] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 8;

    const categories = ["all", ...new Set(menu.map(item => item.category.name))];

    // Initialize filteredItems with all menu items when menu changes
    useEffect(() => {
        setFilteredItems(menu);
    }, [menu]);

    // Filtering items by category
    const filterItems = (category) => {
        const filtered = category === "all" ? menu : menu.filter((item) => item.category.name === category);
        setFilteredItems(filtered);
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    // Handle search
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const searchedItems = menu.filter((item) =>
            item.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredItems(searchedItems);
        setCurrentPage(1);
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
        setCurrentPage(1);
    };

    // Get current items based on the currentPage
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    // Total pages for pagination
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    // Handle pagination click
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Function to generate pagination items
    const getPaginationGroup = () => {
        const pages = [];
        const maxPageNumbers = 8;
        const ellipsis = '...';

        if (totalPages <= maxPageNumbers) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push(ellipsis);

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) pages.push(i);

            if (currentPage < totalPages - 2) pages.push(ellipsis);

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
                    <div className='text-center space-y-7 px-4 flex flex-col justify-center items-center'>
                        <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
                            Dive into Delights Of Delectable <span className='text-primary'>Food</span>
                        </h2>
                        <p className='text-xl text-[#4A4A4A] md:w-4/5 mx-auto'>
                            "Come with family & feel the joy of mouthwatering food such as Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas Rellenas and more for a moderate cost."
                        </p>
                        {/* Search Box */}
                        <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 w-2/3">
                            <FaSearch className="text-gray-500 mr-2" />
                            <input
                                type="text"
                                placeholder="Search menu items"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="flex-grow focus:outline-none"
                            />
                        </div>
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
                        <div className="bg-primary p-2">
                            <FaFilter className="text-white h-4 w-4" />
                        </div>
                        <select
                            id="sort"
                            onChange={(e) => handleSortChange(e.target.value)}
                            value={sortOption}
                            className="bg-white text-black rounded-sm shadow-2xl border-2"
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
