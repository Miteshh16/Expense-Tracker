import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Components/Cards.jsx/TransactionInfoCard'
import moment from 'moment'

const ExpenseTransaction = ({ transactions, onSeeMore }) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Expense</h5>
        <button className='card-bth' onClick={onSeeMore}>
          See All <LuArrowRight className='text-base' />
        </button>
      </div>

      <div className='mt-6'>
        {transactions?.length === 0 && (
          <p className="text-sm text-gray-400">No expenses found.</p>
        )}

        {transactions?.slice(0, 5)?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")} // <- fixed key
            amount={expense.amount}
            type="expense"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  )
}

export default ExpenseTransaction
