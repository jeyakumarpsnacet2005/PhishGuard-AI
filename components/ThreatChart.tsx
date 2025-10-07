import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', attempts: 12 },
  { name: 'Tue', attempts: 19 },
  { name: 'Wed', attempts: 3 },
  { name: 'Thu', attempts: 5 },
  { name: 'Fri', attempts: 2 },
  { name: 'Sat', attempts: 3 },
  { name: 'Sun', attempts: 7 },
];

const ThreatChart: React.FC = () => {
  return (
    <div className="bg-secondary p-6 rounded-lg border border-border h-80">
      <h3 className="text-lg font-semibold mb-4 text-text-primary">Daily Phishing Attempts</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
          <XAxis dataKey="name" stroke="#8B949E" />
          <YAxis stroke="#8B949E" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#161B22',
              borderColor: '#30363D',
              color: '#C9D1D9',
            }}
          />
          <Legend wrapperStyle={{ color: '#8B949E' }} />
          <Bar dataKey="attempts" fill="#58A6FF" name="Phishing Attempts" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ThreatChart;
