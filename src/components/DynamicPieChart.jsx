import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { pieData, totalBalance } from '../assets/totalBalance'; // default import, rename to pieData for clarity

const DynamicPieChart = () => {
  const COLORS = ['#bfa75d', '#7f6b3a', '#e6d589', '#6c5331'];

  return (
    <div className="flex justify-center items-center h-full -mt-20">
      <div className="relative">
        <PieChart width={750} height={600}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={200}
            outerRadius={230}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>

        {/* Center Balance Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-sm font-semibold text-gray-700">
          <span className='text-gold text-xl'>Total Balance</span>
          <span className='text-gold text-5xl font-bold'>{totalBalance.toLocaleString()} IRT</span>
        </div>
      </div>
    </div>
  );
};

export default DynamicPieChart