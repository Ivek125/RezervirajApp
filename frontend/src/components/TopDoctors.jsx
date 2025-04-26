import React, { use } from 'react';
import { Link,  } from 'react-router-dom'; // Import React Router Link
import { useContext } from 'react'; // Import useContext to access context
import { AppContext } from '../context/AppContext'; // Import the context


export const TopDoctors = () => {

    const {doctors} = useContext(AppContext) // Use the context to get the doctors data

  return (
    <div className="px-6 py-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Naši liječnici
      </h1>
      <p className="text-lg text-center text-gray-600 mb-10">
        Popis naših najpouzdanijih stručnjaka za Vas.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {doctors.slice(0, 8 ).map((doctor, index) => (
          <Link to={`/termini/${doctor._id}`} key={index}> {/* Navigacija na detalje doktora */}
            <div className="doctor-card bg-white p-6 rounded-3xl shadow-lg text-center transition duration-300 transform hover:scale-105 hover:bg-gray-200">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="doctor-image w-32 h-32 rounded-full mx-auto mb-4 object-cover" 
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{doctor.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{doctor.speciality}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link 
          to="/doktori" 
          className="bg-gray-800 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          More
        </Link>
      </div>
    </div>
  );
};
