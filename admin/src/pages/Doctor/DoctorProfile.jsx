import React, { useEffect, useState, useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfilePanel = () => {
  const { dToken, doctorProfile, getDoctorProfile, backendUrl } = useContext(DoctorContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(doctorProfile || {});

  useEffect(() => {
    if (dToken) getDoctorProfile();
  }, [dToken]);

  useEffect(() => {
    setFormData(doctorProfile || {});
  }, [doctorProfile]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setFormData(doctorProfile); // reset form kad cancel
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        {
          docId: doctorProfile._id,
          fees: formData.fees,
          address: formData.address,
          available: formData.available,
          about: formData.about,
        },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success("Profil uspješno ažuriran!");
        await getDoctorProfile();
        setIsEditing(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Greška kod ažuriranja profila.");
    }
  };

  if (!doctorProfile)
    return <p className="p-6 text-gray-600">Učitavanje profila...</p>;

  return (
    <div className="flex justify-center items-center bg-gray-100 mx-auto w-6xl">
      <div className="bg-white shadow-lg rounded-xl p-6 w-4xl mt-10 m-10">
        <h2 className="text-2xl font-bold mb-6">Profil doktora</h2>
        <img src={doctorProfile.image} alt="Profilna slika" className="w-50 h-50 rounded-full object-cover border-2 border-gray-300 mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Polja koja se ne mogu mijenjati */}
          {[
            { label: "Ime", key: "name" },
            { label: "Email", key: "email" },
            { label: "Specijalizacija", key: "speciality" },
            { label: "Iskustvo godine:", key: "experience" },
            { label: "Telefon", key: "degree" },
            
            
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="text-sm text-gray-600">{label}</label>
              <p className="text-gray-800 mt-1">{doctorProfile[key] || "-"}</p>
            </div>
          ))}

          {/* Polja koja se mogu mijenjati */}
          <div>
            <label className="text-sm text-gray-600">Adresa</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-md"
              />
            ) : (
              <p className="text-gray-800 mt-1">{doctorProfile.address || "-"}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Cijena pregleda (EUR)</label>
            {isEditing ? (
              <input
                type="number"
                name="fees"
                value={formData.fees || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-md"
              />
            ) : (
              <p className="text-gray-800 mt-1">{doctorProfile.fees || "-"}</p>
            )}
          </div>
 <div>
            <label className="text-sm text-gray-600">Dostupnost</label>
            {isEditing ? (
              <select
                name="available"
                value={formData.available ?? true} // default true
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    available: e.target.value === "true", // konvertira string u boolean
                  })
                }
                className="mt-1 w-full p-2 border rounded-md"
              >
                <option value={true}>Dostupan</option>
                <option value={false}>Nedostupan</option>
              </select>
            ) : (
              <p className="text-gray-800 mt-1">
                {doctorProfile.available ? "Dostupan" : "Nedostupan"}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">O doktoru</label>
            {isEditing ? (
              <textarea
                name="about"
                value={formData.about || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-md"
              />
            ) : (
              <p className="text-gray-800 mt-1">{doctorProfile.about || "-"}</p>
            )}
          </div>

         
        </div>

        <div className="mt-6 text-right">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-gray-800 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600 cursor-pointer"
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
              className="bg-gray-800 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600 cursor-pointer"
            >
              Uredi profil
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePanel;
