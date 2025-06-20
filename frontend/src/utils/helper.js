import moment from 'moment';

export const validateEmail=(email)=>{
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}
export const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    let initials = '';

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }
    return initials.toUpperCase();
};

export const addThousandsSpeaker = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart
        ? `${formattedInteger}.${fractionalPart}`
        : formattedInteger;
};

export const prepareExpenseBarChartData=(data=[])=>{
    const charData=data.map((item)=>({
        category:item?.category,
        amount:item?.amount
    }))
    return charData
}



export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('Do MMM'), // e.g., "4th Apr"
    amount: Number(item?.amount) || 0,          // Ensure amount is a number
    category: item?.source || 'Other'           // Optional: to show in tooltip
  }))

  return chartData
}


export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))
  
    const chartData = sortedData.map((item) => ({
      month: moment(item?.date).format('Do MMM'),
      amount: Number(item?.amount) || 0, // Ensure amount is a number
      category: item?.category || 'Uncategorized', // Fallback category
    }))
  
    return chartData
  }
