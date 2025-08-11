import React, { useState } from 'react';
import axios from 'axios';

function FormAddCapital() {
  const [form, setForm] = useState({ solde_initial: '', currency: '' , leverage: '' , risk_per_trade: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3000/api/portefeuille/createPortefeuille', form, { withCredentials: true })
      .then((res) => {
        if (res.status === 201) {
          console.log('Portefeuille créé avec succès !', res.data);
          window.location.reload();
        } else {
          console.error('Erreur :', res.data?.error || 'Erreur inconnue');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la requête :', error.response?.data || error.message);
      });
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col space-y-5 w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">Create your portfolio</h2>


        <label htmlFor="solde_initial" className="mb-1 text-sm font-medium text-gray-700">
          Initial balance
        </label>
        <input
          type="number"
          min= "1"
          name="solde_initial"
          value={form.solde_initial}
          onChange={handleChange}
          required
          placeholder="Enter the inital balance"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <label htmlFor="currency" className="mb-1 text-sm font-medium text-gray-700">
          Currency
        </label>
        <select
          name="currency"
          value={form.currency}
          onChange={handleChange}
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Select currency</option>
          <option value="€">€</option>
          <option value="$">$</option>
          <option value="£">£</option>
        </select>


        <label htmlFor="leverage" className="mb-1 text-sm font-medium text-gray-700">
          Leverage
        </label>
        <input
          type="number"
          name="leverage"
          value={form.leverage}
          onChange={handleChange}
          required
          placeholder="Enter your leverage account"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <label htmlFor="risk_per_trade" className="mb-1 text-sm font-medium text-gray-700">
          risk_per_trade
        </label>
        <input
          type="number"
          name="risk_per_trade"
          value={form.risk_per_trade}
          onChange={handleChange}
          required
          placeholder="Enter your risk per trade"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 cursor-pointer"
      >
        Create wallet
      </button>
    </form>
  );
}

export default FormAddCapital;
