import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all"); // all | pending | confirmed | canceled

  // Dohvati sve termine korisnika
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error("Greška pri učitavanju termina");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Termin otkazan");
        getUserAppointments(); // Ponovno učitaj termine
        getDoctorsData(); // Ažuriraj podatke o doktorima
      } else {
        toast.error(data.message || "Neuspješno otkazivanje");
      }
    } catch (error) {
      console.error(error);
      toast.error("Greška pri otkazivanju termina");
    }
  };

  // Filtriraj termine prema statusu
  const filteredAppointments = appointments.filter((item) => {
    if (filter === "pending") return item.status === "pending";
    if (filter === "confirmed") return item.status === "confirmed";
    if (filter === "canceled") return item.status === "canceled";
    return true; // all
  });

  return (
    <div className="flex justify-center py-10 bg-gray-100 min-h-[60vh]">
      <div className="w-[80%]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Moji termini</h2>

          {/* Filter dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-md px-3 py-2 shadow-sm cursor-pointer"
          >
            <option value="all">Svi</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Prihvaćeni</option>
            <option value="canceled">Otkazani</option>
          </select>
        </div>

        {filteredAppointments.length === 0 ? (
          <p className="text-gray-600 text-lg">Nema termina za prikaz.</p>
        ) : (
          filteredAppointments.map((item, index) => {
            const doctor = item.docData;
            if (!doctor) return null;

            // Odredi boju statusa
            let statusColor = "text-gray-800";
            if (item.status === "canceled") statusColor = "text-red-600";
            if (item.status === "confirmed") statusColor = "text-green-600";
            if (item.status === "pending") statusColor = "text-yellow-600";

            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 mb-6 flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                <img
                  src={doctor.image || "/default-image.png"}
                  alt={doctor.name}
                  className="w-32 h-32 object-cover rounded-md"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {doctor.name}
                  </h3>
                  <p className="text-gray-600">{doctor.speciality}</p>
                  <p className="text-gray-600">{doctor.degree}</p>
                  <p className="text-gray-600">{doctor.address}</p>
                  <p className="text-green-600 mt-2">
                    <strong>Cijena: {doctor.fees} eura</strong>
                  </p>
                  <p className="text-black mt-1">
                    Termin:{" "}
                    <strong>
                      {new Date(item.slotDate).toLocaleDateString("hr-HR")}
                    </strong>{" "}
                    u <strong>{item.slotTime}</strong>
                  </p>
                  <p className={`mt-2 font-semibold ${statusColor}`}>
                    Status:{" "}
                    {item.status === "pending"
                      ? "Pending"
                      : item.status === "confirmed"
                      ? "Prihvaćeno"
                      : "Otkazano"}
                  </p>
                </div>

                {item.status === "canceled" ? (
                  <div className="text-red-600 font-bold mt-4 md:mt-0">
                    Otkazano
                  </div>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="mt-4 md:mt-0 text-red-600 border-2 hover:bg-red-600 hover:text-white cursor-pointer px-4 py-2 rounded-md shadow-md transition"
                  >
                    Otkaži termin
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
