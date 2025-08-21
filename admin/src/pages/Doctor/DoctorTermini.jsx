import React, { useEffect, useContext, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointments = () => {
  const { appointments, getAppointments, dToken, acceptAppointment, cancelAppointment } =
    useContext(DoctorContext);

  const [filter, setFilter] = useState("all"); // all | pending | accepted | canceled

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  // filtriranje termina
  const filteredAppointments = appointments.filter((item) => {
    if (filter === "pending") return item.status === "pending";
    if (filter === "accepted") return item.status === "confirmed";
    if (filter === "canceled") return item.status === "canceled";
    return true; // all
  });

  return (
    <div className="flex justify-center py-10 p-8 w-6xl mx-auto bg-white rounded-2xl shadow-lg space-y-3">
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">Termini pacijenata</h2>

          {/* Filter dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-md px-3 py-2 shadow-sm cursor-pointer"
          >
            <option value="all">Svi</option>
            <option value="pending">Na čekanju</option>
            <option value="accepted">Prihvaćeni</option>
            <option value="canceled">Otkazani</option>
          </select>
        </div>

        {filteredAppointments.length === 0 ? (
          <p className="text-gray-600 text-lg">Nema termina za prikaz.</p>
        ) : (
          filteredAppointments.map((item, index) => {
            const user = item.userData; 
            if (!user) return null;

            // Odredi boju statusa
            let statusColor = "text-gray-800";
            if (item.status === "canceled") statusColor = "text-red-600";
            if (item.status === "accepted") statusColor = "text-green-600";
            if (item.status === "pending") statusColor = "text-yellow-600";

            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 mb-6 flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-32 h-32 object-cover rounded-md"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-gray-600">Broj Telefona: {user.phone}</p>

                  <p className="text-black mt-2">
                    Termin: {" "}
                    <strong>
                      {new Date(item.slotDate).toLocaleDateString("hr-HR")}
                    </strong>{" "}
                    u <strong>{item.slotTime}</strong>
                  </p>

                  <p className={`mt-2 font-semibold ${statusColor}`}>
                    Status:{" "}
                    {item.status === "pending"
                      ? "Na čekanju"
                      : item.status === "confirmed"
                      ? "Prihvaćen"
                      : "Otkazan"}
                  </p>
                </div>

                {/* Akcije */}
                {item.status === "pending" && (
                  <div className="flex gap-3 mt-4 md:mt-0">
                    <button
                      onClick={() => acceptAppointment(item._id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition"
                    >
                      Prihvati
                    </button>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="px-4 py-2 border-2 border-red-600 text-red-600 rounded-md shadow-md hover:bg-red-600 hover:text-white transition"
                    >
                      Otkaži
                    </button>
                  </div>
                )}

                {item.status === "confirmed" && (
                  <div className="text-green-600 font-bold mt-4 md:mt-0">
                    Prihvaćen
                  </div>
                )}

                {item.status === "canceled" && (
                  <div className="text-red-600 font-bold mt-4 md:mt-0">
                    Otkazan
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
