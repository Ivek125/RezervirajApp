import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import axios from 'axios';

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false);
    const [Name, setDocName] = useState('');
    const [Email, setDocEmail] = useState('');
    const [Password, setDocPassword] = useState('');
    const [Experience, setDocExperience] = useState(1);
    const [Fee, setDocFee] = useState('');
    const [Specialization, setDocSpecialization] = useState('Liječnik opće prakse');
    const [Education, setDocEducation] = useState('');
    const [About, setDocAbout] = useState('');
    const [Address, setDocAddress] = useState('');

    const { backendUrl, aToken } = useContext(AdminContext);

    // Funkcija za provjeru strong passworda
    const isStrongPassword = (password) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    };



    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (!docImg) {
                return toast.error('Molimo vas da dodate sliku doktora.');
            }

            if (!isStrongPassword(Password)) {
                return toast.error('Lozinka mora imati najmanje 8 znakova, veliko i malo slovo, broj i specijalni znak.');
            }

            const formData = new FormData();
            formData.append('image', docImg);
            formData.append('name', Name);
            formData.append('email', Email);
            formData.append('password', Password);
            formData.append('experience', Experience);
            formData.append('fees', Number(Fee));
            formData.append('speciality', Specialization);
            formData.append('degree', Education);
            formData.append('about', About);
            formData.append('address', Address);

            const { data } = await axios.post(
                backendUrl + '/api/admin/add-doctor',
                formData,
                { headers: { atoken: aToken } }
            );

            if (data.success) {
                toast.success(data.message);
                setDocImg(false);
                setDocName('');
                setDocEmail('');
                setDocPassword('');
                setDocExperience(1);
                setDocFee('');
                setDocSpecialization('Liječnik opće prakse');
                setDocEducation('');
                setDocAbout('');
                setDocAddress('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message || 'Greška prilikom dodavanja doktora.');
            console.log(error);
        }
    };




    return (
        <form onSubmit={onSubmitHandler} className="w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-3">
            {/* Naslov */}
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">Dodaj doktora </h2>

            {/* Upload slike */}
            <div className="flex flex-col items-center">
                <label
                    htmlFor="doc-img"
                    className="cursor-pointer flex flex-col items-center justify-center bg-gray-100 border border-dashed border-gray-400 rounded-xl w-20 h-20 hover:bg-gray-200 transition"
                >
                    <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Upload" className="w-20 h-20" />
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />

                </label>
                <span className="mt-2 text-sm text-gray-600">Stavi sliku doktora</span>

            </div>

            {/* Osnovni podaci */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <p className="text-sm font-medium text-gray-700">Ime doktora</p>
                    <input onChange={(e) => setDocName(e.target.value)} value={Name}
                        type="text"
                        placeholder="Ime"
                        required
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <input onChange={(e) => setDocEmail(e.target.value)} value={Email}
                        type="email"
                        placeholder="Email"
                        required
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-700">Lozinka doktora</p>
                    <input onChange={(e) => setDocPassword(e.target.value)} value={Password}
                        type="password"
                        placeholder="Lozinka"
                        required
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-700">Iskustvo</p>
                    <select onChange={(e) => setDocExperience(e.target.value)} value={Experience}
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        <option value="1">1 godina</option>
                        <option value="2">2 godine</option>
                        <option value="3">3 godine</option>
                        <option value="4">4 godine</option>
                        <option value="5">5 godina</option>
                        <option value="6">6 godina</option>
                        <option value="7">7 godina</option>
                        <option value="8">8 godina</option>
                        <option value="9">9 godina</option>
                        <option value="10">10 godina</option>
                    </select>
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-700">Naknada</p>
                    <div className="flex items-center gap-2 mt-1">
                        <input onChange={(e) => setDocFee(e.target.value)} value={Fee}
                            type="number"
                            placeholder="Naknada"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        <span className="text-gray-600">€</span>
                    </div>
                </div>
            </div>

            {/* Ostali podaci */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <p className="text-sm font-medium text-gray-700">Specijalizacija</p>
                    <select onChange={(e) => setDocSpecialization(e.target.value)} value={Specialization}
                        name="specijalizacija"
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        <option value="Liječnik opće prakse">Liječnik opće prakse</option>
                        <option value="Stomatolog">Stomatolog</option>
                        <option value="Dermatolog">Dermatolog</option>
                        <option value="Pedijatar">Pedijatar</option>
                    </select>
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-700">Edukacija</p>
                    <input onChange={(e) => setDocEducation(e.target.value)} value={Education}
                        type="text"
                        placeholder="Edukacija"
                        required
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-700">Adresa</p>
                    <input onChange={(e) => setDocAddress(e.target.value)} value={Address}
                        type="text"
                        placeholder="Adresa"
                        required
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
            </div>

            {/* O doktoru */}
            <div>
                <p className="text-sm font-medium text-gray-700">O doktoru</p>
                <textarea onChange={(e) => setDocAbout(e.target.value)} value={About}
                    placeholder="O doktoru"
                    rows={3}
                    required
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Gumb */}
            <button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition cursor-pointer"
            >
                Dodaj doktora
            </button>
        </form>
    );
};

export default AddDoctor;
