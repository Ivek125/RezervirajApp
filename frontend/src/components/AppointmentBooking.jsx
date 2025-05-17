import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [duration, setDuration] = useState(15);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const today = new Date();

  const getWeekNumber = (date) => {
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0, 0, 0, 0);
    tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
    const week1 = new Date(tempDate.getFullYear(), 0, 4);
    return 1 + Math.round(((tempDate - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
  };
  
  const generateAvailableTimes = (selectedDate) => {
    const week = getWeekNumber(new Date(selectedDate));
  
    // Naizmjenična smjena: parni tjedni ujutro, neparni popodne
    const isMorningShift = week % 2 === 0;
  
    // Smjena traje 6 sati
    const startHour = isMorningShift ? 8 : 13;
    const endHour = startHour + 6;
  
    const slots = [];
    const date = new Date(selectedDate);
    date.setHours(startHour, 0, 0, 0);
  
    while (date.getHours() < endHour || (date.getHours() === endHour && date.getMinutes() === 0)) {
      const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      slots.push(timeString);
      date.setMinutes(date.getMinutes() + duration);
    }
  
    setAvailableTimes(slots);
  };
  const handleDateChange = (e) => {
    const selected = new Date(e.target.value);
    setSelectedDate(selected);
    generateAvailableTimes(selected);
    setSelectedTime('');
    setConfirmed(false);
  };

  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
   
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleConfirm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setConfirmed(true);
    }, 1000);
  };
  useEffect(() => {
    if (selectedDate) {
      generateAvailableTimes(selectedDate);
    }
  }, [duration, selectedDate]);
  

  return (
    <div className="mt-16 bg-white p-10 rounded-3xl shadow-xl space-y-5 max-w-5xl mx-auto">

      <h2 className="text-4xl font-bold text-center text-gray-700 mb-8">Rezervacija termina</h2>

      {/* Izbor datuma */}
      <div className="flex flex-col items-center gap-4">
        <label className="text-gray-700 font-medium text-lg">Odaberite datum:</label>
        <input
          type="date"
          min={today.toISOString().split('T')[0]}
          max={new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
          onChange={handleDateChange}
          className="border border-gray-300 rounded-xl px-6 py-4 w-72 text-gray-700 focus:outline-none focus:border-gray-700"
        />
      </div>

      <hr className="border-gray-200" />

      {/* Izbor trajanja */}
      <div className="flex flex-col items-center gap-4">
        <label className="text-gray-700 font-medium text-lg">Trajanje pregleda:</label>
        <select
          value={duration}
          onChange={handleDurationChange}
          className="border border-gray-300 rounded-xl px-6 py-4 w-72 text-gray-700 focus:outline-none focus:border-gray-700"
        >
          <option value={15}>15 minuta</option>
          <option value={30}>30 minuta</option>
        </select>
      </div>

      <hr className="border-gray-200" />

      {/* Lista dostupnih vremena */}
      {selectedDate && (
        <div className="flex flex-col items-center gap-6">
          <label className="text-gray-700 font-medium text-lg">Odaberite vrijeme:</label>
          <select
            value={selectedTime}
            onChange={handleTimeChange}
            className="border border-gray-300 rounded-xl px-6 py-4 w-72 text-gray-700 focus:outline-none focus:border-gray-700"
          >
            <option value="">-- Odaberite vrijeme --</option>
            {availableTimes.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Potvrda rezervacije */}
      {selectedTime && (
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={handleConfirm}
            className="mt-6 px-10 py-5 bg-gray-700 text-white rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Rezerviram...' : 'Potvrdi rezervaciju'}
          </button>

          {confirmed && (
            <div className="text-center text-green-600 font-semibold mt-4 text-lg">
              ✅ Uspješno ste rezervirali termin!
            </div>
          )}
        </div>
      )}
    </div>

    
  );
};

export default AppointmentBooking;
