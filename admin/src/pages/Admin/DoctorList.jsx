import React, { useEffect, useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorList = () => {
  const { doctors, getAllDoctors, aToken, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="p-8 w-6xl mx-autow-6xl mx-auto bg-white  rounded-2xl shadow-lg space-y-3">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">Doktori</h2>
      
      <div className=" mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
        {doctors.map((item, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg hover:bg-gray-200 cursor-pointer  transition-shadow"
          >
            <img 
              className="w-full object-cover rounded-md" 
              src={item.image} 
              alt={item.name} 
            />
            <div className="mt-4">
              <p className="text-lg font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>

              <div className="flex items-center mt-3 space-x-2">
                <input 
                  onChange={() => changeAvailability(item._id)} 
                  type="checkbox" 
                  checked={item.available} 
                  readOnly 
                  className="w-4 h-4 "
                />
                <p className={`text-sm font-medium ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                  {item.available ? 'Dostupan' : 'Nedostupan'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorList
