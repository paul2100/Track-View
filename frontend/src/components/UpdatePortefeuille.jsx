import React, { useState, useEffect } from 'react';
import { api } from '../utils/utils.js';

function UpdatePortefeuille({ initialDataPortefeuille }) {
  const [form, setForm] = useState({
    currency: '',
    leverage: '',
    risk_per_trade: '',
    solde_initial: '',
    capital_actuel: '',  // ajouté pour comparaison
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (initialDataPortefeuille) {
      setForm({
        currency: initialDataPortefeuille.currency || '',
        leverage: initialDataPortefeuille.leverage || '',
        risk_per_trade: initialDataPortefeuille.risk_per_trade || '',
        solde_initial: initialDataPortefeuille.solde_initial || '',
        capital_actuel: initialDataPortefeuille.capital_actuel || '',
      });
    }
  }, [initialDataPortefeuille]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const canEditSoldeInitial = Number(form.solde_initial) === Number(form.capital_actuel);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.patch(`/api/portefeuille/updatePortefeuille/${initialDataPortefeuille.id}`, form);
      setMessage('Portefeuille updated successfully!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error) {
        setMessage(err.response.data.error);
      } else {
        setMessage('Error updating portefeuille.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="md:w-[48%] w-full mx-auto md:my-0 my-4 bg-gray-200/10 p-6 rounded-2xl shadow-lg space-y-5 border border-stone-500/60"
    >
      <h2 className="text-2xl font-semibold text-white text-start mb-4">Update Portefeuille</h2>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Currency</label>
        <select
          name="currency"
          value={form.currency}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-black/30 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Select currency</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Leverage</label>
        <input
          type="number"
          name="leverage"
          value={form.leverage}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-black/30 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Risk per Trade</label>
        <input
          type="number"
          name="risk_per_trade"
          value={form.risk_per_trade}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-black/30 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Solde Initial</label>
        <input
          type="number"
          name="solde_initial"
          value={form.solde_initial}
          onChange={handleChange}
          min="0"
          step="0.01"
          className="w-full px-4 py-2 rounded-lg bg-black/30 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {!canEditSoldeInitial && (
          <p className="text-yellow-400 text-sm mt-1">
            Attention : le solde initial ne sera pas modifié car il diffère du capital actuel.
          </p>
        )}
      </div>

      <button 
        type="submit" a
        disabled={loading} 
        className="w-full py-2 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold text-white transition duration-200 disabled:opacity-50 cursor-pointer"
      >
        {loading ? 'Mise à jour...' : 'Save Changes'}
      </button>

      {message && (
        <p className={`text-center font-medium ${message.startsWith('Portefeuille') || message.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </form>
  );
}

export default UpdatePortefeuille;
