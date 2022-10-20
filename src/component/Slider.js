import React, { useState } from 'react';

import Data from "./Data";
import '../main.css'
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { AnimatePresence, motion } from 'framer-motion';

const variants = {

    initial: direction => {
        return {
            x: direction > 0 ? 100 : - 100,
            opacity: 0,
            // scale: 0.5,
        }
    },
    animate: {
        x: 0,
        opacity: 1,
        // scale: 1,
        transition: 'ease-in',
        // transition: {
        //     x: { type: 'spring', stiffness: 300, damping: 20 },
        //     opacity: { duration: 0.2 }
        // }
    },
    exit: direction => {
        return {
            x: direction > 0 ? -100 : 100,
            opacity: 0,
            // scale: 0.5,
            transition: 'ease-in',
        }
    }
}


const Slider = () => {

    // Checking the Index Length Fucntion

    const [index, setIndex] = useState(0);
    const { country, city, image } = Data[index];
    const [direction, setDirection] = useState(0);




    const checkNumber = (number) => {
        if (number > Data.length - 1) {
            return 0;
        }
        if (number < 0) {
            return Data.length - 1
        }
        return number;
    }

    //Next & Perv Functions 
    const pervItem = () => {
        setDirection(-1);
        setIndex((index) => {
            let newIndex = index - 1;
            return checkNumber(newIndex);
        });
    }

    const nextItem = () => {
        setDirection(1);
        setIndex((index) => {
            let newIndex = index + 1;
            return checkNumber(newIndex);
        });
    }

    //Thumbnail Function

    const thumAction = (i) => {
        console.log(i);
        setIndex(i);
    }

    // Review Slider

    return (
        <article className='review'>
            <div className='container'>
                <div className="text-container">
                    <h1>Coutnry: {country}</h1>
                    <h2>City: {city}</h2>
                </div>
                <div className="arrow-container">
                    <div className='arrow' onClick={pervItem}><GoChevronLeft color="red" fontSize="3.5em" /></div>
                    <AnimatePresence initial={false} custom={direction}>
                        <div className="img-container">
                            <motion.img
                                variants={variants}
                                animate='animate'
                                initial='initial'
                                exit='exit'
                                src={image} alt={city} className='main-img' key={image} custom={direction} />
                        </div>
                    </AnimatePresence>
                    <div className='arrow' onClick={nextItem}><GoChevronRight color="red" fontSize="3.5em" /></div>
                </div>

                {/* // Review Thumbnail */}

                <div className="theumConatinaer">
                    {
                        Data.map((thumImage, imgId) => {
                            const { id, image, city } = thumImage;
                            return (
                                <div key={id} >
                                    <img src={image} alt={city} onClick={() => thumAction(imgId)} />
                                </div>
                            );
                        })
                    }
                </div>



                {/* < Thumbnail data={Data} /> */}
            </div>
        </article>
    );

}



export default Slider;