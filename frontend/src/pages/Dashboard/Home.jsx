import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../Components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { data, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import InfoCard from '../../Components/Cards.jsx/InfoCard';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from "react-icons/io";
import { addThousandsSpeaker } from '../../utils/helper';
import RecentTransaction from '../../Dashboard/RecentTransaction';
import FinanceOverview from '../../Dashboard/FinanceOverview';
import ExpenseTransaction from '../../Dashboard/ExpenseTransaction';
import Last30DaysExpense from '../../Dashboard/Last30DaysExpense'
import RecentIncomeWithChart from '../../Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../Dashboard/RecentIncome';

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBAORD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (err) {
      console.error("Something went wrong:", err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="flex justify-center items-center h-full py-10">
          <p className="text-lg font-semibold text-gray-600">Loading dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="flex justify-center items-center h-full py-10">
          <p className="text-lg font-semibold text-red-600">{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!dashboardData) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="flex justify-center items-center h-full py-10">
          <p className="text-lg font-semibold text-gray-600">No dashboard data available.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        {/* Info Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={`₹ ${addThousandsSpeaker(dashboardData?.totalBalance || 0)}`}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={`₹ ${addThousandsSpeaker(dashboardData?.totalIncome || 0)}`}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={`₹ ${addThousandsSpeaker(dashboardData?.totalExpense || 0)}`}
            color="bg-red-500"
          />
        </div>

        {/* Recent Transactions */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransaction
            transactions={dashboardData?.recentTransaction}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome ||0}
            totalExpense={dashboardData?.totalExpense || 0}
            />

            <ExpenseTransaction
             transactions={dashboardData?.last30DaysExpense?.transaction ||[]}
             onSeeMore={()=>navigate("/expense")}
             />

             <Last30DaysExpense
              data={dashboardData?.last30DaysExpense?.transaction ||[]}
              />

            <RecentIncomeWithChart
              data={dashboardData?.last60DaysIncome?.transaction?.slice(0, 4) || []}
              totalIncome={dashboardData?.totalIncome || 0}
              />



              <RecentIncome
               transactions={dashboardData?.last60DaysIncome?.transaction || []}
               onSeeMore={()=>navigate("/income")}  
               /> 
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
