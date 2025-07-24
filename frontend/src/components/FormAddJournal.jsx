import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddJournalForm() {
  const [allTradeNoJournal, setAllTradeNoJournal] = useState([]);
  const [selectedTradeId, setSelectedTradeId] = useState('');
  const [form, setForm] = useState({
    plan_trade: '',
    emotions: '',
    indicators: '',
    post_trade_analysis: '',
    type: '',
    timeframe:''
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedTradeId || !file) {
      return alert('Sélectionne un trade et une image');
    }

    const formData = new FormData();
    formData.append('tradeId', selectedTradeId);
    formData.append('plan_trade', form.plan_trade);
    formData.append('emotions', form.emotions);
    formData.append('indicators', form.indicators);
    formData.append('post_trade_analysis', form.post_trade_analysis);
    formData.append('image', file);
    formData.append('type', form.type);
    formData.append('timeframe', form.timeframe);


    axios.post('http://localhost:3000/api/journal/createTradeJournal', formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
    .then(res => {
      console.log(res.data);
      window.location.reload();
    })
    .catch(err => console.error(err));
  };

  useEffect(() => {
    axios.get('http://localhost:3000/api/trade/getTradeClosedNoJournal', {withCredentials: true})
    .then(res => {
      if (res.status === 200) {
        setAllTradeNoJournal(res.data.tradeclosedNoJournal);
      }
    })
    .catch(err => console.error(err));
  }, []);


  return (
    <form onSubmit={handleSubmit}>
      <select value={selectedTradeId} onChange={e => setSelectedTradeId(e.target.value)} required>
        <option value="">-- Choisis un trade fermé sans journal --</option>
        {allTradeNoJournal.map(trade => {
          const closedAt = new Date(trade.closedAt).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
          });
          return (
            <option key={trade.id} value={trade.id}>
              {`Date ${closedAt} - ${trade.paire} - ${trade.status}`}
            </option>
          );
        })}
      </select>

      <textarea name="plan_trade" placeholder="Plan de trade" value={form.plan_trade} onChange={handleChange} />
      <textarea name="emotions" placeholder="Émotions" value={form.emotions} onChange={handleChange} />
      <textarea name="indicators" placeholder="Indicateurs" value={form.indicators} onChange={handleChange} />
      <textarea name="post_trade_analysis" placeholder="Analyse post-trade" value={form.post_trade_analysis} onChange={handleChange} />
      
      <input type="file" name="image" onChange={handleFileChange} />
      <textarea name="type" placeholder="type" value={form.type} onChange={handleChange} />
      <textarea name="timeframe" placeholder="timeframe" value={form.timeframe} onChange={handleChange} />


      <button type="submit">Envoyer</button>
    </form>
  );
}

export default AddJournalForm;
