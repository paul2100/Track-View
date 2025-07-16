import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormAddTrade() {
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    setError('');
  };

  const validate = () => {
    const newErrors = {};

    if (!form.paire.trim()) newErrors.paire = "Le pair est obligatoire.";

    if (!form.direction) newErrors.direction = "La direction est obligatoire.";

    if (!form.status) newErrors.status = "Le statut est obligatoire.";

    if (!form.entryPrice) newErrors.entryPrice = "Le prix d'entrée est obligatoire.";
    else if (isNaN(parseFloat(form.entryPrice))) newErrors.entryPrice = "Prix d'entrée invalide.";

    if (form.takeProfit) {
      if (isNaN(parseFloat(form.takeProfit))) newErrors.takeProfit = "Take profit invalide.";
      else if (parseFloat(form.takeProfit) <= parseFloat(form.entryPrice)) {
        newErrors.takeProfit = "Le take profit doit être supérieur au prix d'entrée.";
      }
    }

    if (form.ratio_risk) {
      const ratio = parseFloat(form.ratio_risk);
      if (isNaN(ratio)) newErrors.ratio_risk = "Ratio risque invalide.";
      else if (ratio < 0.1 || ratio > 10) {
        newErrors.ratio_risk = "Le ratio risque doit être entre 0.1 et 10.";
      }
    }

    if (!form.size_lot) newErrors.size_lot = "La taille du lot est obligatoire.";
    else if (isNaN(parseFloat(form.size_lot))) newErrors.size_lot = "Taille du lot invalide.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Veuillez corriger les erreurs dans le formulaire.");
      return;
    }

    const payload = {
      ...form,
      entryPrice: parseFloat(form.entryPrice),
      exitPrice: form.exitPrice ? parseFloat(form.exitPrice) : null,
      stopLoss: form.stopLoss ? parseFloat(form.stopLoss) : null,
      takeProfit: form.takeProfit ? parseFloat(form.takeProfit) : null,
      size_lot: parseFloat(form.size_lot),
      ratio_risk: form.ratio_risk ? parseFloat(form.ratio_risk) : null,
      result: form.result ? parseFloat(form.result) : null,
    };

    axios
      .post('http://localhost:3000/api/trade/createTrade', payload, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Trade ajouté avec succès !");
          navigate('/dashboard', { state: { toastMessage: "Trade ajouté avec succès !" } });
        } else {
          console.error('Erreur :', res.data?.error || 'Erreur inconnue');
          setError("Erreur lors de l'ajout de votre trade.");
          toast.error("Erreur lors de l'ajout de votre trade.");
        }
      })
      .catch((error) => {
        const message = error.response?.data?.error || error.message || "Erreur réseau";
        setError(message);
        toast.error(`Erreur lors de la requête : ${message}`);
      });
  };

  return (
    <>
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col space-y-5 w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Create Trade</h2>

        <div className="flex flex-col">
          <label htmlFor="paire" className="mb-1 text-sm font-medium text-gray-700 pt-2">Pair</label>
          <input
            type="text"
            name="paire"
            value={form.paire}
            onChange={handleChange}
            required
            placeholder="e.g. EUR/USD"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.paire && <p className="text-red-500 text-sm">{errors.paire}</p>}

          <label htmlFor="direction" className="mb-1 text-sm font-medium text-gray-700 pt-2">Direction</label>
          <select
            name="direction"
            value={form.direction}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select a direction</option>
            <option value="LONG">LONG</option>
            <option value="SHORT">SHORT</option>
          </select>
          {errors.direction && <p className="text-red-500 text-sm">{errors.direction}</p>}

          <label htmlFor="status" className="mb-1 text-sm font-medium text-gray-700 pt-2">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select status</option>
            <option value="OPEN">OPEN</option>
            <option value="CLOSED">CLOSED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}

          <label htmlFor="entryPrice" className="mb-1 text-sm font-medium text-gray-700 pt-2">Entry Price</label>
          <input
            type="number"
            name="entryPrice"
            value={form.entryPrice}
            onChange={handleChange}
            required
            placeholder="Enter the trade entry price"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.entryPrice && <p className="text-red-500 text-sm">{errors.entryPrice}</p>}

          <label htmlFor="exitPrice" className="mb-1 text-sm font-medium text-gray-700 pt-2">Exit Price</label>
          <input
            type="number"
            name="exitPrice"
            value={form.exitPrice}
            onChange={handleChange}
            placeholder="Enter the trade exit price"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <label htmlFor="stopLoss" className="mb-1 text-sm font-medium text-gray-700 pt-2">Stop Loss</label>
          <input
            type="number"
            name="stopLoss"
            value={form.stopLoss}
            onChange={handleChange}
            placeholder="Enter stop loss"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <label htmlFor="takeProfit" className="mb-1 text-sm font-medium text-gray-700 pt-2">Take Profit</label>
          <input
            type="number"
            name="takeProfit"
            value={form.takeProfit}
            onChange={handleChange}
            placeholder="Enter take profit"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.takeProfit && <p className="text-red-500 text-sm">{errors.takeProfit}</p>}

          <label htmlFor="size_lot" className="mb-1 text-sm font-medium text-gray-700 pt-2">Lot Size</label>
          <input
            type="number"
            name="size_lot"
            value={form.size_lot}
            onChange={handleChange}
            required
            placeholder="Enter lot size"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.size_lot && <p className="text-red-500 text-sm">{errors.size_lot}</p>}

          <label htmlFor="ratio_risk" className="mb-1 text-sm font-medium text-gray-700 pt-2">Risk Ratio</label>
          <input
            type="number"
            name="ratio_risk"
            value={form.ratio_risk}
            onChange={handleChange}
            placeholder="Enter risk/reward ratio"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.ratio_risk && <p className="text-red-500 text-sm">{errors.ratio_risk}</p>}

          <label htmlFor="result" className="mb-1 text-sm font-medium text-gray-700 pt-2">Result</label>
          <input
            type="number"
            name="result"
            value={form.result}
            onChange={handleChange}
            placeholder="Enter the result of the trade"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 cursor-pointer"
        >
          Create Trade
        </button>

        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
      </form>
    </>
  );
}

export default FormAddTrade;
