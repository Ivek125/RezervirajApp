import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import AppointmentBooking from '../components/AppointmentBooking';

const Appointment = () => {
  const { docID } = useParams();
  const { doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);

  useEffect(() => {
    const fetchDocInfo = async () => {
      const foundDoctor = await doctors.find((doctor) => doctor._id === docID);
      setDocInfo(foundDoctor);
      console.log(foundDoctor);
    };

    fetchDocInfo();
  }, [doctors, docID]);

  if (!docInfo) {
    return <div className="flex justify-center items-center h-screen text-gray-600 text-xl">Učitavanje...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
        
        {/* Left: Text Content */}
        <div className="md:w-2/3  flex flex-col justify-center space-y-6 ">
          <h1 className=" bg-gray-800 text-3xl p-5 font-bold text-white mb-0 rounded-t-2xl">{docInfo.name}</h1>
         
          <p className="bg-gray-800 text-2xl pl-5  text-white pt-5 pb-4 mb-0">{docInfo.speciality}</p>

          <hr className="border-gray-200 mb-0" />



          <div className="space-y-6 text-gray-700 text-base  p-5 ">
            <div>
              <h2 className="text-xl font-semibold mb-1 ">Titula</h2>
              <p className=''>{docInfo.degree}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-1 ">Iskustvo</h2>
              <p className=''>{docInfo.experience}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-1 ">O doktoru</h2>
              <p className="leading-relaxed ">{docInfo.about}</p>
            </div>

            

            <div>
              <h2 className="text-xl font-semibold mb-1 ">Cijena konzultacija</h2>
              <p className=''>{docInfo.fees} €</p>
            </div>

            
            <div>
              <h2 className="text-xl font-semibold mb-1 ">Adresa</h2>
              <p className=''>{docInfo.address.line1}</p>
              <p className=''>{docInfo.address.line2}</p>
            </div>
          </div>
        </div>

        {/* Right: Doctor Image */}
        <div className="md:w-1/3 relative ">
          <img 
            src={docInfo.image} 
            alt={docInfo.name} 
            className="w-full h-full object-cover md:rounded-l-none rounded-b-3xl md:rounded-r-3xl"
          />
        </div>
      </div>
     
<AppointmentBooking />

    </div>
  );
};

export default Appointment;
