import React, {useState } from 'react';
import Sidebar from '../components/SideBar';
import CardStats from '../components/CardStats';
import CapitalChart from '../components/Graphiques/CapitalChart';

function Dashboard() {

  const [capital , setCapital] = useState('26536.73');
  const [currencies] = useState(['$', '¥', '€']);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  return (
    <div className="flex">
      <Sidebar />

      <main className="md:ml-[260px] flex-1 p-6 bg-gray-50 min-h-screen">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-5 rounded-md  mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="md:text-4xl text-2xl font-semibold">Dashboard</h1>
            <span className="text-gray-500 text-base">
              Welcome back! Here's your activity overview.
            </span>
          </div>

          <div className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition cursor-pointer">
              + Create
            </button>
          </div>
        </div>

        <div className='mb-5'>
          <label className='text-lg font-normal'>Currency :</label>
          <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} className='border border-stone-400 px-4 py-1 ml-5 rounded-lg outline-none'>
            {currencies.map((cur , index) => (
              <option key={index} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        <div className="flex md:justify-between md:flex-row flex-col">
          <CardStats title = "Capital" value = {capital} currency={selectedCurrency}  img = '/src/assets/icon.svg' />
          <CardStats title = "Total trades" value = {'17'}   img = '/src/assets/icon.svg'/>
          <CardStats title = "Daily result" value = {'-636.93'} currency={selectedCurrency} img = '/src/assets/icon.svg'/>
          <CardStats title = "Monthly result" value = {'2563.38'} currency={selectedCurrency} img = '/src/assets/icon.svg'/>
        </div>

        <div className='flex md:flex-row flex-col justify-between mt-5 w-full'>
          <CapitalChart/>
          <CapitalChart/>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;
