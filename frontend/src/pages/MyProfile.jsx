import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MyProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: 'Ivan',
    surname: 'Horvat',
    email: 'ivan@example.com',
    phone: '091 123 4567',
    location: 'Zagreb, Hrvatska',
    bio: 'Zaljubljenik u tehnologiju i razvoj web aplikacija.',
    image: 'https://via.placeholder.com/100',
    age: '30',
    gender: 'Muško'
  });
  

  const [formData, setFormData] = useState(user);

  

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setFormData(user);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFormData({ ...formData, image: imageUrl });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-[80%] max-w-4xl mt-20 mb-20">
        <div className="flex flex-col items-center">
          <img
            src={formData.image}
            alt="Profilna slika"
            className={`w-24 h-24 rounded-full object-cover border-2 border-gray-300 ${isEditing ? 'hover:cursor-pointer' : ''}`}
            onClick={isEditing ? handleImageClick : undefined}

          />
          <input
            type="file"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleChange}
            className="hidden"
          />

          <h2 className="text-xl font-bold mt-4">{user.name} {user.surname}</h2>
          <p className="text-gray-500 text-sm">{user.location}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
  { label: 'Ime', key: 'name' },
  { label: 'Prezime', key: 'surname' },
  { label: 'Email', key: 'email' },
  { label: 'Telefon', key: 'phone' },
  { label: 'Lokacija', key: 'location' },
  { label: 'Godine', key: 'age' },
  { label: 'Spol', key: 'gender', select: true },
  { label: 'O meni', key: 'bio', textarea: true }
].map(({ label, key, textarea, select }) => (
  <div key={key}>
    <label className="text-sm text-gray-600">{label}</label>
    {isEditing ? (
      select ? (
        <select
          name={key}
          value={formData[key]}
          onChange={handleChange}
          className="mt-1 w-full p-2 border rounded-md"
        >
          <option value="Muško">Muško</option>
          <option value="Žensko">Žensko</option>
        </select>
      ) : textarea ? (
        <textarea
          name={key}
          value={formData[key]}
          onChange={handleChange}
          className="mt-1 w-full p-2 border rounded-md"
        />
      ) : (
        <input
          type={key === 'age' ? 'number' : 'text'}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          className="mt-1 w-full p-2 border rounded-md"
        />
      )
    ) : (
      <p className="text-gray-800 mt-1">{user[key]}</p>
    )}
  </div>
))}

        </div>

        <div className="mt-6 text-right">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-gray-800 text-white px-4 py-2 rounded-md mr-2 hover:cursor-pointer hover:bg-gray-600 hover:text-white "
              >
                Spremi
              </button>
              <button
                onClick={handleEditToggle}
                 className="mt-4 md:mt-0 text-red-600 border-2 hover:bg-red-600 hover:text-white cursor-pointer px-4 py-2 rounded-md shadow-md transition"
              >
                Odustani
              </button>
            </>
          ) : (
            <button
              onClick={handleEditToggle}
              className="bg-gray-800 text-white px-4 py-2 rounded-md mr-2 hover:cursor-pointer hover:bg-gray-600 hover:text-white "
            >
              Uredi profil
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
