"use client";
import { useEffect } from "react";
import Form from "../form/Form";
import Image from "next/image";
import img1 from '../../images/img2.jpg'
import img2 from '../../images/carousel-img-1.jpg'
import img3 from '../../images/img3.jpg'


import {
    Carousel,
    initTE,
  } from "tw-elements";
  

const Hero = () => {

 
    useEffect(() => {
        const init = async () => {
          const { Select, Carousel, Datepicker,
            Input, Modal, Ripple,  initTE } = await import("tw-elements");
          initTE({ Select, Carousel, Datepicker, Input, Modal, Ripple });
        };
        init();
      }, []);

    return (
        <>
        
        <div id="carouselExampleCrossfade" className="relative" data-te-carousel-init data-te-ride="carousel" >

        <div className="absolute inset-x-0 bottom-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0" data-te-carousel-indicators>
            <button type="button" data-te-target="#carouselExampleCrossfade" data-te-slide-to="0" data-te-carousel-active
            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-current="true" aria-label="Slide 1"></button>

            <button type="button" data-te-target="#carouselExampleCrossfade" data-te-slide-to="1"
            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-label="Slide 2"></button>

            <button type="button" data-te-target="#carouselExampleCrossfade" data-te-slide-to="2"
            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-label="Slide 3"></button>
        </div>

        <Form />
            
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-[''] h-[50rem]">

            <div className="relative float-left -mr-[100%] w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-fade data-te-carousel-item data-te-carousel-active>
            <Image src={img1} className="block w-full h-screen"  alt="Wild Landscape" />
            </div>

            <div className="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-fade data-te-carousel-item>
            <Image src={img2} className="block w-full h-screen"  alt="Wild Landscape" />
            </div>

            <div className="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-fade data-te-carousel-item>
            <Image src={img3} className="block w-full h-screen"  alt="Wild Landscape" />
            </div>

        </div>

        </div>


        </>
    )

}

export default Hero
