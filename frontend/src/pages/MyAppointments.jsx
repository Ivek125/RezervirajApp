import React, { useEffect, useState } from "react";
import { doctors } from "../assets/assets_frontend/assets";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const savedAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(savedAppointments);
  }, []);

  return (
    <div className="flex justify-center py-10 bg-gray-100 min-h-[60vh]">
      <div className="w-[80%]">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Moji termini</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-600 text-lg">Nemate zakazanih termina.</p>
        ) : (
          appointments.map((appt, index) => {
            const doctor = doctors.find((d) => d._id === appt.doctorId);
            if (!doctor) return null;

            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 mb-6 flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-32 h-32 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {doctor.name}
                  </h3>
                  <p className="text-gray-600">{doctor.speciality}</p>
                  <p className="text-gray-600">{doctor.degree}</p>
                  <p className="text-gray-600">
                    {doctor.address.line1}, {doctor.address.line2}
                  </p>
                </div>
                <button
                  
                  className="mt-4 md:mt-0 text-red-600 border-2 hover:bg-red-600 hover:text-white cursor-pointer  px-4 py-2 rounded-md shadow-md transition"
                >
                  Otkaži termin
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
