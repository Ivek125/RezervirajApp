import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const AllAppointments = () => {
  const { appointments, getAllAppointments, aToken, cancelAppointment } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, [aToken]);

  console.log(appointments);

  return (
    <div className="p-8 w-6xl mx-auto bg-white rounded-2xl shadow-lg space-y-3">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">Lista termina</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-600 text-lg">Nema termina.</p>
      ) : (
        appointments.map((appointment, index) => {
          const doctor = appointment.docData || {};
          const patient = appointment.userData || {};

          return (
            <div
              key={appointment._id}
              className="bg-white rounded-lg shadow-md p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-top "
            >
             
                
              

              {/* Doktor */}
              
              <div className="flex items-center gap-4">
                <p><strong>{index + 1}.</strong></p>
                <img
                  src={doctor.image || '/default-image.png'}
                  alt={doctor.name || 'Doctor'}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {doctor.name || '—'}
                  </h3>
                  {doctor.speciality && <p className="text-gray-600">{doctor.speciality}</p>}
                  
                  {doctor.address && <p className="text-gray-600">{doctor.address}</p>}
                </div>
              </div>

              {/* Pacijent */}
              <div className=''>
                <p className="text-gray-800">
                  <strong>Pacijent:</strong> {patient.name || '—'} 
                </p>
                {patient.dob && (
                  <p className="text-gray-600">
                    Rođen/a: {new Date(patient.dob).toLocaleDateString('hr-HR')}
                  </p>
                )}
                <p className="text-black mt-1">
                  Termin: <strong>{new Date(appointment.slotDate).toLocaleDateString('hr-HR')}</strong> u <strong>{appointment.slotTime}</strong>
                </p>
              </div>

              {/* Status, iznos i gumbi */}
              <div className="flex flex-col items-start md:items-end gap-2">
                <p className="text-gray-600">
                  Status: <strong>{appointment.status || 'pending'}</strong>
                </p>
                <p className="text-green-600">
                  <strong>Iznos: {appointment.amount} €</strong>
                </p>
                <div className="flex gap-3">
                  {appointment.status === 'pending' && (
                    <button
                      className="px-4 py-2 bg-white text-red-500 border-2 rounded-md hover:bg-red-500 hover:text-white cursor-pointer transition"
                      onClick={() => cancelAppointment(appointment._id)}
                    >
                      Otkaži
                    </button>
                  )}
                  {appointment.status === 'canceled' && (
                    <p className="text-red-500">Termin je otkazan</p>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AllAppointments;
