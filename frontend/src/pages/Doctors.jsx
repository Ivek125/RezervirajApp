import React, { useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Doctors() {
  const { doctors, doctorsCategories } = useContext(AppContext);
  const { speciality } = useParams();
  const navigate = useNavigate();

  // State to track the active category
  const [activeCategory, setActiveCategory] = useState(speciality ? speciality.toLowerCase() : 'svi liječnici');

  // Normalize the specialty parameter from the URL
  const normalizedSpeciality = speciality ? speciality.toLowerCase() : '';

  // Filter doctors based on the selected specialty
  const filteredDoctors = normalizedSpeciality
    ? doctors.filter(doctor => doctor.speciality.toLowerCase() === normalizedSpeciality)
    : doctors; // If no specialty is selected, show all doctors.

  // Handle category click and update active category
  const handleCategoryClick = (categoryTitle) => {
    setActiveCategory(categoryTitle.toLowerCase()); // Set active category
    if (categoryTitle.toLowerCase() === 'svi liječnici') {
      navigate(`/lijecnici`); // Show all doctors.
    } else {
      navigate(`/lijecnici/${categoryTitle.toLowerCase()}`); // Filter by the selected specialty.
    }
  };

  return (
    <div className="px-6 py-10 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Left Categories (Category Section) */}
        <div className="flex flex-col gap-4 md:w-1/4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Specijalizacije</h2>
          <h2 className="text-xl font-semibold text-gray-700 ">Filtriranje</h2>
          <hr />
          
          {/* Button for "Svi liječnici" with conditional bg */}
          <button
            key="all-doctors"
            onClick={() => handleCategoryClick('Svi liječnici')}
            className={`py-3 px-5 rounded-xl shadow-md hover:bg-gray-200 relative group cursor-pointer transition text-gray-800 text-left font-medium ${activeCategory === 'svi liječnici' ? 'bg-gray-700 text-white hover:bg-gray-700' : 'bg-white'}`}
          >
            Svi liječnici
          </button>

          {/* List of doctor categories with conditional bg */}
          {doctorsCategories.map((category) => (
            <button
              key={category.title}
              onClick={() => handleCategoryClick(category.title)}
              className={`py-3 px-5 rounded-xl shadow-md hover:bg-gray-200 relative group cursor-pointer transition text-gray-800 text-left font-medium ${activeCategory === category.title.toLowerCase() ? 'bg-gray-700 text-white hover:bg-gray-700' : 'bg-white'}`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Right Doctors List Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <Link to={`/termini/${doctor._id}`} key={doctor._id}>
                <div className="bg-white p-6 rounded-3xl shadow-lg text-center transition transform hover:scale-105 hover:bg-gray-200 relative group cursor-pointer">
                  
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
              
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{doctor.name}</h2>
                  <p className="text-sm text-gray-500 mb-2">{doctor.speciality}</p>
                  <p className="text-xs text-gray-400">{doctor.experience} iskustva</p>

                  <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
                    {/* Add hover effect if necessary */}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">Nema dostupnih liječnika za ovu specijalizaciju.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
