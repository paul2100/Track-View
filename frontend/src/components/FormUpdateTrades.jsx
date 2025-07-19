import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormUpdateTrades({ tradeId , onSuccess }) {
  const [form, setForm] = useState({
    status: '',
    direction: '',
    paire: '',
    ratio_risk: '',
    size_lot: '',
    entryPrice: '',
    takeProfit: '',
    stopLoss: '',
    exitPrice: '',
    result: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (tradeId) {
      axios.get(`http://localhost:3000/api/trade/getTradeById/${tradeId}`, { withCredentials: true })
        .then(res => {
          if (res.status === 200) {
            setForm({
              status: res.data.trade.status || '',
              direction: res.data.trade.direction || '',
              paire: res.data.trade.paire || '',
              ratio_risk: res.data.trade.ratio_risk || '',
              size_lot: res.data.trade.size_lot || '',
              entryPrice: res.data.trade.entryPrice || '',
              takeProfit: res.data.trade.takeProfit || '',
              stopLoss: res.data.trade.stopLoss || '',
              exitPrice: res.data.trade.exitPrice || '',
              result: res.data.trade.result || ''
            });
          }
        })
        .catch(err => {
          const message = err.response?.data?.error || "Erreur de chargement du trade";
          toast.error(message);
        });
    }
  }, [tradeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  
  const dataToSend = {
    ...form,
    exitPrice: form.exitPrice === "" ? null : parseFloat(form.exitPrice),
    result: form.result === "" ? null : parseFloat(form.result),
    entryPrice: form.entryPrice === "" ? null : parseFloat(form.entryPrice),
    takeProfit: form.takeProfit === "" ? null : parseFloat(form.takeProfit),
    stopLoss: form.stopLoss === "" ? null : parseFloat(form.stopLoss),
    size_lot: form.size_lot === "" ? null : parseFloat(form.size_lot),
    ratio_risk: form.ratio_risk === "" ? null : parseFloat(form.ratio_risk),
  };

  axios.patch(`http://localhost:3000/api/trade/updateTrade/${tradeId}`, dataToSend, { withCredentials: true })
    .then((res) => {
    if (res.status === 200 && onSuccess) {
      onSuccess();
      window.location.reload();
    }
    })
    .catch((error) => {
      
      const message = error.response?.data?.error || error.message || "Erreur réseau";
      setError(message);
      toast.error(message);
    });
};


  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-5 w-full bg-white p-6 rounded-2xl shadow-lg max-w-xl mx-auto border border-gray-100">

  <h2 className="text-2xl font-bold text-gray-800 text-center"><span className='text-orange-400'>E</span>dit Trade</h2>

  <div className="flex flex-col">
    <label htmlFor="paire" className="mb-1 font-semibold text-gray-700">Pair</label>
    <input
      type="text"
      id="paire"
      name="paire"
      value={form.paire}
      onChange={handleChange}
      required
      className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="direction" className="mb-1 font-semibold text-gray-700">Direction</label>
    <select
      id="direction"
      name="direction"
      value={form.direction}
      onChange={handleChange}
      required
      className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
    >
      <option value="">Sélectionnez</option>
      <option value="LONG">LONG</option>
      <option value="SHORT">SHORT</option>
    </select>
  </div>

  <div className="flex flex-col">
    <label htmlFor="status" className="mb-1 font-semibold text-gray-700">Status</label>
    <select
      id="status"
      name="status"
      value={form.status}
      onChange={handleChange}
      required
      className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
    >
      <option value="">Sélectionnez</option>
      <option value="OPEN">OPEN</option>
      <option value="CLOSED">CLOSED</option>
      <option value="CANCELLED">CANCELLED</option>
    </select>
  </div>

  <div className="flex flex-col">
    <label htmlFor="entryPrice" className="mb-1 font-semibold text-gray-700">Entry Price</label>
    <input
      type="number"
      id="entryPrice"
      name="entryPrice"
      value={form.entryPrice}
      onChange={handleChange}
      required
      className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="exitPrice" className="mb-1 font-semibold text-gray-700">Exit Price</label>
    <input
      type="number"
      id="exitPrice"
      name="exitPrice"
      value={form.exitPrice}
      onChange={handleChange}
      className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="stopLoss" className="mb-1 font-semibold text-gray-700">Stop Loss</label>
    <input
      type="number"
      id="stopLoss"
      name="stopLoss"
      value={form.stopLoss}
      onChange={handleChange}
      className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="takeProfit" className="mb-1 font-semibold text-gray-700">Take Profit</label>
    <input
      type="number"
      id="takeProfit"
      name="takeProfit"
      value={form.takeProfit}
      onChange={handleChange}
      className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="size_lot" className="mb-1 font-semibold text-gray-700">Lot Size</label>
    <input
      type="number"
      id="size_lot"
      name="size_lot"
      value={form.size_lot}
      onChange={handleChange}
      className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="ratio_risk" className="mb-1 font-semibold text-gray-700">Risk Ratio</label>
    <input
      type="number"
      id="ratio_risk"
      name="ratio_risk"
      value={form.ratio_risk}
      onChange={handleChange}
      className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="result" className="mb-1 font-semibold text-gray-700">Result</label>
    <input
      type="number"
      id="result"
      name="result"
      value={form.result}
      onChange={handleChange}
      className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
    />
  </div>

  <button
    type="submit"
    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition duration-300 shadow-md cursor-pointer"
  >
    Update Now
  </button>

  {error && <p className="text-red-600 text-center mt-3 font-medium">{error}</p>}
</form>

  );
}

export default FormUpdateTrades;
