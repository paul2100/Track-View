import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormAddTrade({onSuccess}) {
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    status: '',
    direction: '',
    paire: '',
    risk_amount: '',
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
      risk_amount: form.risk_amount ? parseFloat(form.risk_amount) : null,
      result: form.result ? parseFloat(form.result) : null,
    };

    axios.post('http://localhost:3000/api/trade/createTrade', payload, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Trade ajouté avec succès !");
          onSuccess?.();
          window.location.reload();
        } else {
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-5 w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg mx-auto border border-gray-100"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center"><span className='text-orange-400'>C</span>reate a trade</h2>

      <div className="flex flex-col">
        <label htmlFor="paire" className="mb-1 font-semibold text-gray-700">Pair</label>
        <input
          type="text"
          id="paire"
          name="paire"
          value={form.paire}
          onChange={handleChange}
          required
          placeholder="Ex: EUR/USD"
          className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:ring-offset-white transition"
        />
        {errors.paire && <p className="text-red-600 text-sm mt-1">{errors.paire}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="direction" className="mb-1 font-semibold text-gray-700">Direction</label>
        <select
          id="direction"
          name="direction"
          value={form.direction}
          onChange={handleChange}
          required
          className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:ring-offset-white transition"
        >
          <option value="">Sélectionnez</option>
          <option value="LONG">LONG</option>
          <option value="SHORT">SHORT</option>
        </select>
        {errors.direction && <p className="text-red-600 text-sm mt-1">{errors.direction}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="status" className="mb-1 font-semibold text-gray-700">Status</label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
          required
          className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:ring-offset-white transition"
        >
          <option value="">Sélectionnez</option>
          <option value="OPEN">OPEN</option>
          <option value="CLOSED">CLOSED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
        {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
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
          placeholder="Prix d'entrée"
          className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:ring-offset-white transition"
        />
        {errors.entryPrice && <p className="text-red-600 text-sm mt-1">{errors.entryPrice}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="exitPrice" className="mb-1 font-semibold text-gray-700">Exit Price</label>
        <input
          type="number"
          id="exitPrice"
          name="exitPrice"
          value={form.exitPrice}
          onChange={handleChange}
          placeholder="Prix de sortie"
          className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:ring-offset-white transition"
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
          placeholder="Stop Loss"
          className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:ring-offset-white transition"
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
          placeholder="Take Profit"
          className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:ring-offset-white transition"
        />
        {errors.takeProfit && <p className="text-red-600 text-sm mt-1">{errors.takeProfit}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="size_lot" className="mb-1 font-semibold text-gray-700">Lot Size</label>
        <input
          type="number"
          id="size_lot"
          name="size_lot"
          value={form.size_lot}
          onChange={handleChange}
          required
          placeholder="Taille du lot"
          className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:ring-offset-white transition"
        />
        {errors.size_lot && <p className="text-red-600 text-sm mt-1">{errors.size_lot}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="risk_amount" className="mb-1 font-semibold text-gray-700">Risk amount</label>
        <input
          type="number"
          id="risk_amount"
          name="risk_amount"
          value={form.risk_amount}
          onChange={handleChange}
          placeholder="Risk amount"
          className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:ring-offset-white transition"
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
          placeholder="Résultat"
          className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:ring-offset-white transition"
        />
      </div>

      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition duration-300 shadow-md cursor-pointer"
      >
        Create a trade now
      </button>

      {error && <p className="text-red-600 text-center mt-3 font-medium">{error}</p>}
    </form>
  );
}

export default FormAddTrade;
