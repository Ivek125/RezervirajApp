import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const RelatedDoctors = () => {
  // Dohvati parametar iz URL-a (mora se zvati isto kao u tvojoj ruti, npr. "/termini/:docId")
  const { docId } = useParams();

  // Svi doktori su već dostupni preko konteksta
  const { doctors } = useContext(AppContext);

  // State za filtrirane doktore
  const [relatedDoctors, setRelatedDoctors] = useState([]);

  useEffect(() => {
    if (!doctors || doctors.length === 0) return;

    // Pronađi trenutno odabranog doktora
    const selectedDoctor = doctors.find((doc) => doc._id.toString() === docId);

    if (selectedDoctor) {
      // Filtriraj sve koji imaju istu specijalizaciju, osim odabranog
      const filtered = doctors.filter(
        (doc) =>
          doc.speciality === selectedDoctor.speciality &&
          doc._id.toString() !== docId
      );

      setRelatedDoctors(filtered);
    }
  }, [docId, doctors]);

  return (
    <div className="px-6 py-10 bg-gray-100">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        Drugi doktori u istoj specijalizaciji
      </h1>

      {relatedDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {relatedDoctors.map((doctor) => (
            <Link
              to={`/termini/${doctor._id}`}
              key={doctor._id}
              onClick={() => window.scrollTo(0, 0)} // Scrollaj na vrh pri kliku
            >
              <div className="doctor-card bg-white p-6 rounded-3xl shadow-lg text-center transition duration-300 transform hover:scale-105 hover:bg-gray-200">
                <img
                  src={doctor.image || "/default-image.png"}
                  alt={doctor.name}
                  className="doctor-image w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {doctor.name}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {doctor.speciality}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Nema drugih doktora u ovoj specijalizaciji.
        </p>
      )}
    </div>
  );
};

export default RelatedDoctors;
