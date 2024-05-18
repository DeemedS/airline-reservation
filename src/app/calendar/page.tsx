"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const YourComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const generateDates = (startDate: Date, count: number) => {
    const dates = [];
    for (let i = 0; i < count; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      dates.push(currentDate);
    }
    return dates;
  };

  const dates = generateDates(selectedDate, 3);

  const handleDateChange = (increment: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + increment);
    setSelectedDate(newDate);
  };

  const handleDateClick = (clickedDate: Date) => {
    setSelectedDate(clickedDate);
  };

  return (
    <div className='flex flex-row justify-center bg-white md:mx-[25%] rounded-xl mt-5'>
      <button className='hidden md:flex my-auto' onClick={() => handleDateChange(-1)}>
        <FontAwesomeIcon icon={faChevronLeft} className='w-4 h-4' />
      </button>

      {dates.map((date, index) => (
        <div
          key={index}
          className={`flex flex-col p-5 my-auto border ${date.getTime() === selectedDate.getTime() ? 'border-blue-500 cursor-pointer' : 'border-green-200 cursor-pointer'} text-center md:w-[25%]`}
          onClick={() => handleDateClick(date)}
        >
          <h6 className='text-xs'>{date.toLocaleDateString('en-US', { weekday: 'long' })}</h6>
          <h6 className='text-xs'>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</h6>
          {/* Add your custom logic for the monetary value */}
        </div>
      ))}

      <button className='hidden md:flex my-auto' onClick={() => handleDateChange(1)}>
        <FontAwesomeIcon icon={faChevronRight} className='w-4 h-4' />
      </button>
    </div>
  );
};

export default YourComponent;