import React, { useEffect, useState } from 'react'
import { prepareIncomeBarChartData } from '../../utils/helper'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../../Components/Charts/CustomBarChart'

const IncomeOverview = ({ transaction, onAddIncome }) => {
  const [charData, setCharData] = useState([])

  useEffect(() => {
    const result = prepareIncomeBarChartData(transaction)
    setCharData(result)
    return () => {}
  }, [transaction])

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='text-lg font-semibold'>Income Overview</h5>
          <p className='text-xs text-gray-400 mt-0.5'>Track your earning over time</p>
        </div>

        <button className='add-btn flex items-center gap-1' onClick={onAddIncome}>
          <LuPlus className='text-lg' />
          Add Income
        </button>
      </div>

      <div className='mt-10'>
        <CustomBarChart data={charData} />
      </div>
    </div>
  )
}

export default IncomeOverview
