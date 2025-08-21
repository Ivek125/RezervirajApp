import React, { useEffect, useRef, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { userData, setUserData, loadUserProfileData, backendUrl, token } =
    useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData || {});

  useEffect(() => {
    setFormData(userData || {});
  }, [userData]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setFormData(userData); // reset form kad cancel
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("name", formData.name || "");
      form.append("phone", formData.phone || "");
      form.append("address", formData.address || "");
      form.append("dob", formData.dob || "");
      form.append("gender", formData.gender || "");
      if (formData.image instanceof File) {
        form.append("image", formData.image);
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        form,
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Profil uspješno ažuriran!");
        await loadUserProfileData(); // povuci svježe podatke
        setIsEditing(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Greška kod ažuriranja profila.");
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };


    useEffect(() => {
    if (!token) {
      navigate('/login');
      toast.info('Molimo prijavite se da pristupite profilu');
    } else if (token && !userData) {
      // Ako ima token ali nema userData, učitaj ih
      loadUserProfileData();
    }
  }, [token, userData, navigate, loadUserProfileData]);

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-[80%] max-w-4xl mt-20 mb-20">
        <div className="flex flex-col items-center">
          <img
            src={
              formData.image instanceof File
                ? URL.createObjectURL(formData.image)
                : formData.image || "/default-avatar.png"
            }
            alt="Profilna slika"
            className={`w-24 h-24 rounded-full object-cover border-2 border-gray-300 ${
              isEditing ? "hover:cursor-pointer" : ""
            }`}
            onClick={handleImageClick}
            
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleChange}
            className="hidden" 
          />

          <h2 className="text-xl font-bold mt-4">
            {userData.name || ""}
          </h2>
          <p className="text-gray-500 text-sm">{userData.email || ""}</p>
        </div>

        {/* Polja */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Ime", key: "name" },
            { label: "Email", key: "email" },
            { label: "Telefon", key: "phone" },
            { label: "Adresa", key: "address" },
            { label: "Datum rođenja", key: "dob" },
            { label: "Spol", key: "gender", select: true },
          ].map(({ label, key, select }) => (
            <div key={key}>
              <label className="text-sm text-gray-600">{label}</label>
              {isEditing ? (
                select ? (
                  <select
                    name={key}
                    value={formData[key] || ""}
                    onChange={handleChange}
                    className="mt-1 w-full p-2 border rounded-md"
                  >
                    <option value="Muško">Muško</option>
                    <option value="Žensko">Žensko</option>
                  </select>
                ) : (
                  <input
                   type={key === "dob" ? "date" : key === "email" ? "email" : "text"}
                    name={key}
                    value={formData[key] || ""}
                    onChange={handleChange}
                    disabled={key === "email"} // Email se ne može mijenjati - jedan user jedan mail
                    className="mt-1 w-full p-2 border rounded-md"
                  />
                )
              ) : (
                <p className="text-gray-800 mt-1">{userData[key] || "-"}</p>
              )}
            </div>
          ))}
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
}

export default MyProfile;
