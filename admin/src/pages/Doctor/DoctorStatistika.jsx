import React, { useContext, useEffect, useMemo } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DoctorDashboard = () => {
  const { dashboardData, getDashData, dToken } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) getDashData();
  }, [dToken]);

  const { weeklyAppointments, todayAppointments } = useMemo(() => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayDate = new Date().toISOString().split("T")[0];

  // ako nema podataka odmah vrati prazne nizove
  if (!dashboardData?.latestAppointments) {
    return { weeklyAppointments: weekDays.map(day => ({ day, count: 0 })), todayAppointments: [] };
  }

  // računanje
  const weekly = weekDays.map((day) => ({ day, count: 0 }));
  const today = {};

  dashboardData.latestAppointments.forEach((appt) => {
    // Weekly
    const dayIndex = new Date(appt.slotDate).getDay();
    weekly[dayIndex].count++;

    // Daily (samo današnji)
    if (appt.slotDate === todayDate) {
      const hour = appt.slotTime.split(":")[0] + ":00";
      today[hour] = (today[hour] || 0) + 1;
    }
  });

  // pretvori "today" objekt u niz za graf
  const todayAppointments = Object.entries(today)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .map(([hour, count]) => ({ hour, count }));


  return { weeklyAppointments: weekly, todayAppointments };
}, [dashboardData]);
  // 🔹 Ako nema podataka
  if (!dashboardData) {
    return <div className="p-6 text-gray-600">Učitavanje podataka...</div>;
  }

  return (
    <div className="justify-center py-10 p-8 w-6xl mx-auto bg-white rounded-2xl shadow-lg space-y-6">
      <h1 className="text-2xl font-bold">Doktorski Dashboard</h1>

      {/* Statistika */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">Ukupno pacijenata</h2>
          <p className="text-3xl font-bold text-blue-600">{dashboardData.patients}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">Ukupno termina</h2>
          <p className="text-3xl font-bold text-green-600">{dashboardData.appointments}</p>
        </div>
      </div>

      {/* 📊 Graf 1: Termini po danima u tjednu */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Termini ovaj tjedan</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyAppointments}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 Graf 2: Današnji termini po satima */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Današnji termini po satima</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={todayAppointments}>
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Zadnji termini */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Zadnji termini</h2>
        <ul className="space-y-2">
          {dashboardData.latestAppointments.length > 0 ? (
            dashboardData.latestAppointments.map((appt) => (
              <li
                key={appt._id}
                className="p-3 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">Pacijent: {appt.userData?.name || "Nepoznato"}</p>
                  <p className="text-sm text-gray-600">
                    {appt.slotDate} u {appt.slotTime}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    appt.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : appt.status === "canceled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {appt.status}
                </span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">Nema termina za prikaz</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DoctorDashboard;
