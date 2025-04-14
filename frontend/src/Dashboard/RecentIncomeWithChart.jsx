import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Components/Charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [charData, setCharData] = useState([]);

  const prepareCharData = () => {
    const dataArr = data?.map((item) => ({
      name: item.source || "Unknown Source",
      amount: item.amount || 0
    })) || [];

    setCharData(dataArr);
  };

  useEffect(() => {
    prepareCharData();
    return () => {};
  }, [data]);

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Last 60 Days Income</h5>
      </div>

      {charData.length === 0 ? (
        <p className="text-sm text-gray-500 mt-4">No income data to display.</p>
      ) : (
        <CustomPieChart
          data={charData}
          label="Total Income"
          totalAmount={`₹${totalIncome}`}
          showTextAnchor
          colors={COLORS}
        />
      )}
    </div>
  );
};

export default RecentIncomeWithChart;
