import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import Card from '../../components/Card';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const SpecialDishes = () => {
    const [recipes, setRecipes] = useState([]);
    const slider = useRef(null);

    useEffect(() => {
        fetch("/menu.json")
            .then((res) => res.json())
            .then((data) => {
                const specials = data.filter((item) => item.category === "popular");
                // console.log(specials)
                setRecipes(specials);
            });
    }, []);

    const NextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "none", background: "red" }}
                onClick={onClick}
            >
                NEXT
            </div>
        );
    };

    const PrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "none", background: "green" }}
                onClick={onClick}
            >
                BACK
            </div>
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className='section-container my-20 relative'>
            <div className='text-left'>
                <p className='subtitle'>Special Dishes</p>
                <h2 className='title md:w-[520px]'>Standout Dishes From Our Menu</h2>
            </div>

            <div className='md:absolute right-3 top-0 mb-10 md:mr-24'>
                <button className='btn p-2 rounded-full ml-5' onClick={() => slider?.current?.slickPrev()}>
                    <FaAngleLeft className='w-8 h-8 p-1' />
                </button>
                <button className='btn p-2 rounded-full ml-5 bg-primary text-white' onClick={() => slider?.current?.slickNext()}>
                    <FaAngleRight className='w-8 h-8 p-1' />
                </button>
            </div>

            <Slider ref={slider} {...settings} className='overflow-hidden mt-10 space-x-5'>
                {recipes.map((recipe, index) => (
                    <Card key={index} item={recipe} />
                ))}
            </Slider>
        </div>
    );
};

export default SpecialDishes;
