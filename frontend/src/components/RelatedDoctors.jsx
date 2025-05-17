import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';  // Uvozimo AppContext kako bismo pristupili podacima o doktorima
import { Link } from 'react-router-dom';  // Import React Router Link

const RelatedDoctors = () => {
  const { docID } = useParams();  // Dohvatimo docID iz URL-a
  const { doctors } = useContext(AppContext);  // Dohvatimo sve doktore iz context-a
  const [relatedDoctors, setRelatedDoctors] = useState([]);  // State za pohranu filtriranih doktora

  useEffect(() => {
    // Pronađi doktora sa specifičnim ID-om
    const selectedDoctor = doctors.find((doctor) => doctor._id === docID);

    if (selectedDoctor) {
      // Filtriraj sve doktore koji imaju istu specijalizaciju, osim odabranog doktora
      const filteredDoctors = doctors.filter(
        (doctor) => doctor.speciality === selectedDoctor.speciality && doctor._id !== docID
      );
      setRelatedDoctors(filteredDoctors);  // Spremi filtrirane doktore
    }
  }, [docID, doctors]);  // Kada se docID ili doctors promijene, ponovo filtriraj

  return (
    <div className="px-6 py-10 bg-gray-100">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        Drugi doktori u istoj specijalizaciji
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {relatedDoctors.length > 0 ? (
          relatedDoctors.map((doctor) => (
            <Link 
              to={`/termini/${doctor._id}`} 
              key={doctor._id}
              onClick={() => window.scrollTo(0, 0)}  
            >
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
          ))
        ) : (
          <p className="text-center text-gray-500">Nema drugih doktora u ovoj specijalizaciji.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedDoctors;
