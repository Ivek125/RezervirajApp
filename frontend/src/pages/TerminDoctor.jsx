import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import RelatedDoctors from "../components/FiltriraniDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { backendUrl, token, doctors, getDoctorsData } = useContext(AppContext);

  // State samo za datum/vrijeme
  const [slotDate, setSlotDate] = useState("");
  const [slotTime, setSlotTime] = useState("");

  // Ako doktori nisu učitani, dohvatimo ih
  useEffect(() => {
    if (doctors.length === 0) getDoctorsData();
  }, [doctors, getDoctorsData]);

  // Nađi doktora direktno iz contexta
  const doctor = doctors.find((d) => d._id === docId);

  // Generira 14 dana od sutra
  const getDates = () => {
    const dates = [];
    for (let i = 1; i <= 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
  };

  // Generira sate 09:00 - 17:00
  const getTimes = () =>
    Array.from({ length: 17 - 9 + 1 }, (_, i) => {
      const hour = i + 9;
      return [
        `${hour.toString().padStart(2, "0")}:00`,
        ...(hour < 17 ? [`${hour.toString().padStart(2, "0")}:30`] : []),
      ];
    }).flat();

  // Provjera zauzetosti
  const isBooked = (date, time) =>
    doctor?.slots_booked?.[date]?.includes(time);

  // Rezervacija termina
  const handleBooking = async () => {
    if (!slotDate || !slotTime) return toast.error("Odaberite datum i vrijeme!");
    if (!token) return toast.error("Molimo prijavite se!");

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { doctorId:docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Termin uspješno rezerviran!");
        setSlotDate("");
        setSlotTime("");
        getDoctorsData(); // refresha doktore i update-a zauzete termine
        navigate("/mojiTermini");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Greška kod rezervacije termina.");
    }
  };

  // Loading dok se doktor još ne nađe
  if (!doctor) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Učitavanje podataka o doktoru...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-5 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-6  space-y-4">
        {/* Info o doktoru */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0">
          <img
            src={doctor.image || "/default-image.png"}
            alt={doctor.name}
            className="w-40 rounded-full object-cover md:w-50"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{doctor.name}</h1>
            <p className="text-gray-600">
              {doctor.speciality} | {doctor.degree}
            </p>
            <p className="text-green-600 font-semibold mt-5">
              {doctor.fees}€ po terminu
            </p>
            <p className="mt-2 text-gray-900">Iskustvo: {doctor.experience} godina</p>
            <p className="mt-2 text-gray-700">{doctor.about}</p>
            {doctor.available === false && (
              <p className="mt-2 text-red-600">Nedostupan</p>
            )}
          </div>
        </div>

        {/* Rezervacija */}
        <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
          {!token ? (
            <p className="text-center text-red-600 font-semibold text-lg">
              Ulogiraj se za rezervaciju termina
            </p>
          ) : !doctor.available ? (
            <p className="text-center text-red-600 font-semibold text-lg">
              Doktor nije dostupan
            </p>
          ) : (
            <>
              {/* Datum i vrijeme */}
              <div className="grid grid-cols-1 gap-6">
                {/* Datum */}
                <div>
                  <label className="block text-sm font-medium mb-2">Datum:</label>
                  {!slotDate && (
                    <p className="text-gray-500 text-sm mb-4">
                      Molimo prvo odaberite datum
                    </p>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-7 gap-2">
                    {getDates().map((date) => {
                      const d = new Date(date);
                      return (
                        <button
                          key={date}
                          onClick={() => {
                            setSlotDate(date);
                            setSlotTime("");
                          }}
                          className={`p-3 border rounded-lg text-center transition ${
                            slotDate === date
                              ? "bg-blue-500 text-white"
                              : "border-gray-300 hover:border-blue-500"
                          }`}
                        >
                          <div className="text-sm font-medium">
                            {d.toLocaleDateString("hr-HR", { weekday: "short" })}
                          </div>
                          <div className="text-xs">
                            {d.toLocaleDateString("hr-HR", {
                              day: "numeric",
                              month: "short",
                            })}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Vrijeme */}
                <div>
                  <label className="block text-sm font-medium mb-2">Vrijeme:</label>
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {getTimes().map((time) => (
                      <button
                        key={time}
                        onClick={() => setSlotTime(time)}
                        disabled={!slotDate || isBooked(slotDate, time)}
                        className={`p-2 border rounded-lg text-center transition ${
                          slotTime === time
                            ? "bg-blue-500 text-white"
                            : isBooked(slotDate, time)
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "border-gray-300 hover:border-blue-500"
                        }`}
                      >
                        <span className={isBooked(slotDate, time) ? "line-through" : ""}>
                          {time}
                        </span>
                        {isBooked(slotDate, time) && (
                          <div className="text-xs">Zauzeto</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sažetak */}
              {slotDate && slotTime && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-1">
                  <h3 className="font-semibold">Sažetak rezervacije:</h3>
                  <p>
                    <strong>Doktor:</strong> {doctor.name}
                  </p>
                  <p>
                    <strong>Datum:</strong>{" "}
                    {new Date(slotDate).toLocaleDateString("hr-HR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>
                    <strong>Vrijeme:</strong> {slotTime}
                  </p>
                  <p>
                    <strong>Cijena:</strong> {doctor.fees}€
                  </p>
                </div>
              )}

              {/* Gumb za rezervaciju */}
              <button
                onClick={handleBooking}
                disabled={!slotDate || !slotTime}
                className={`w-full py-3 rounded-lg font-medium transition cursor-pointer ${
                  !slotDate || !slotTime
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-800"
                }`}
              >
                Rezerviraj termin
              </button>
            </>
          )}
          <RelatedDoctors />
        </div>
      </div>
    </div>
  );
};

export default Appointment;
