export const pieData = [
    { name: 'Savings', value: 5424320 },
    { name: 'Investments', value: 4068240 },
    { name: 'Expenses', value:  2712160 },
    { name: 'Others', value: 6000000 }
  ];
  
  export const totalBalance = pieData.reduce((sum, item) => sum + item.value, 0);