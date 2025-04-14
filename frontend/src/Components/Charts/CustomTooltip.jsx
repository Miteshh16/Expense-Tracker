import React from 'react'

const CustomTooltip = ({ active, payload }) => {
  // Show tooltip when the chart element is active and payload exists
  if (active && payload && payload.length) {
    return (
      <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
        <p className='text-xs font-semibold text-purple-800 mb-1'>
          {/* Tooltip title (if you want to display a category or month) */}
          {payload[0].payload.month}
        </p>
        <p className='text-sm text-gray-600'>
          Amount: 
          <span className='text-sm font-medium text-gray-900'>
            ${payload[0].value}
          </span>
        </p>
      </div>
    )
  }

  // If there's no active item, return null (so the tooltip doesn't show)
  return null;
}

export default CustomTooltip;
