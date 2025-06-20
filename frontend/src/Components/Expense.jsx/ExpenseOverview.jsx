import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChartData } from '../../utils/helper'
import { LuPlus } from 'react-icons/lu'
import CustomLineChart from '../Charts/CustomLineChart'

const ExpenseOverview = ({ transaction, onExpenseIncome }) => {
  const [charData, setCharData] = useState([])

  useEffect(() => {
    const result = prepareExpenseLineChartData(transaction)
    setCharData(result)

    return () => {}
  }, [transaction])

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='text-lg'>Expense Overview</h5>
          <p className='text-xs text-gray-400 mt-0.5'>
            Track your spending over time and gain insights into where your money goes
          </p>
        </div>

        <button className='add-btn flex items-center gap-1' onClick={onExpenseIncome}>
          <LuPlus className='text-lg' />
          Add Expense
        </button>
      </div>

      <div className='mt-10'>
        <CustomLineChart data={charData} />
      </div>
    </div>
  )
}

export default ExpenseOverview
