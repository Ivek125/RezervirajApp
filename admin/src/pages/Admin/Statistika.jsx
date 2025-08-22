import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const { aToken, dashData, getDashData } = useContext(AdminContext);
  const [dailyData, setDailyData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [statusCounts, setStatusCounts] = useState({ pending: 0, confirmed: 0, canceled: 0 });

  // Dohvati podatke s backend-a kad postoji token
  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  useEffect(() => {
    if (dashData?.latestAppointments) {
      const appointments = dashData.latestAppointments;

      //graf broj termina po danima u tjednu 
      const weekDays = ['Pon','Uto','Sri','Čet','Pet','Sub','Ned'];
      const daysCount = weekDays.map(day => ({ dan: day, count: 0 }));

      appointments.forEach(apt => {
        const date = new Date(apt.slotDate);
        const dayIndex = date.getDay(); // 0 = Ned, 1 = Pon, ...
        const target = daysCount.find((d, i) => i === dayIndex);
        if (target) target.count += 1;
      });

      setDailyData(daysCount);

      // graf broj termina po satima (9-17
      const hours = Array.from({ length: 9 }, (_, i) => 9 + i); // 9-17
      const hourCount = hours.map(h => ({ sat: `${h}:00`, count: 0 }));

      appointments.forEach(apt => {
        const hour = parseInt(apt.slotTime.split(':')[0], 10);
        const target = hourCount.find(h => parseInt(h.sat, 10) === hour);
        if (target) target.count += 1;
      });

      setHourlyData(hourCount);

      // Statusi 
      const pending = appointments.filter(a => a.status === 'pending').length;
      const confirmed = appointments.filter(a => a.status === 'confirmed').length;
      const canceled = appointments.filter(a => a.status === 'canceled').length;
      setStatusCounts({ pending, confirmed, canceled });
    }
  }, [dashData]);

  return (
    <div className="  bg-white  rounded-2xl shadow-lg space-y-3 p-8 flex flex-col lg:flex-row gap-8 w-6xl mx-auto text-gray-900">
      {/*Lijevi dio: graf */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-10">Statistika </h2>

        {/* graf termini po danima */}
        <h3 className="text-xl font-semibold mb-2">Termini po danima u tjednu</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dan" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4ade80" />
          </BarChart>
        </ResponsiveContainer>

        {/* graf termini po satima */}
        <h3 className="text-xl font-semibold mt-8 mb-2">Termini po satima u danu</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sat" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Desni dio kartica sa statistikom */}
      <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-md p-6 flex flex-col gap-4">
        <h3 className="text-xl font-bold mb-4">Ukupna statistika</h3>
        <p><strong>Doktori:</strong> {dashData?.doctors || 0}</p>
        <p><strong>Pacijenti:</strong> {dashData?.patients || 0}</p>
        <p><strong>Ukupno termina:</strong> {dashData?.appointments || 0}</p>
        <p><strong> *Pending:</strong> {statusCounts.pending}</p>
        <p><strong> *Prihvaćeni:</strong> {statusCounts.confirmed}</p>
        <p><strong> *Otkazani:</strong> {statusCounts.canceled}</p>
      </div>
    </div>
  );
};

export default Dashboard;
