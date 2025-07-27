import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddJournalForm() {
  const [allTradeNoJournal, setAllTradeNoJournal] = useState([]);
  const [selectedTradeId, setSelectedTradeId] = useState('');
  const [form, setForm] = useState({plan_trade: '',emotions: '',indicators: '',post_trade_analysis: ''});

  const [images, setImages] = useState([
    { file: null, type: 'Before', timeframe: 'M15' },
    { file: null, type: 'After', timeframe: 'M15' },
  ]);

  const handleImageChange = (index, field, value) => {
  setImages(prev =>
    prev.map((img, i) => (i === index ? { ...img, [field]: value } : img))
  );
};


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedTradeId || images.some(img => !img.file)) {
      return alert('Choisis un trade et sélectionne les deux images.');
    }

    const formData = new FormData();
    formData.append('tradeId', selectedTradeId);
    formData.append('plan_trade', form.plan_trade);
    formData.append('emotions', form.emotions);
    formData.append('indicators', form.indicators);
    formData.append('post_trade_analysis', form.post_trade_analysis);

    images.forEach(img => {
      formData.append('images', img.file);
      formData.append('types', img.type);
      formData.append('timeframes', img.timeframe);
    });

    axios.post('http://localhost:3000/api/journal/createTradeJournal', formData, {withCredentials: true,headers: { 'Content-Type': 'multipart/form-data' }})
    .then(res => {
      console.log(res.data);
      window.location.reload();
    })
    .catch(err => console.error(err));
  };

  useEffect(() => {
    axios.get('http://localhost:3000/api/trade/getTradeClosedNoJournal', { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          setAllTradeNoJournal(res.data.tradeclosedNoJournal);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="chose-trade" className='block text-sm mt-2 font-semibold text-gray-700'>Choose a trade :</label>
      <select className='outline-none w-full p-2 border-2 border-orange-500 rounded-xl cursor-pointer' value={selectedTradeId} onChange={e => setSelectedTradeId(e.target.value)} required>
        <option value="">Choisis un trade fermé sans journal</option>
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

      <label htmlFor="plan_trade" className='block text-sm mt-2 font-semibold text-gray-700'>Plan trade :</label>
      <textarea
        className='focus:outline-2 focus:outline-orange-500 focus:border-none resize-none border w-full h-25 p-2 rounded-lg bg-slate-100' 
        name="plan_trade" 
        placeholder="Plan de trade" 
        value={form.plan_trade} 
        onChange={handleChange} 
       />

      <label htmlFor="emotions" className='block text-sm mt-2 font-semibold text-gray-700'>Emotions :</label>
      <textarea 
        className='focus:outline-2 focus:outline-orange-500 focus:border-none resize-none border w-full h-25 p-2 rounded-lg bg-slate-100' 
        name="emotions" 
        placeholder="Émotions" 
        value={form.emotions} 
        onChange={handleChange} 
      />

      <label htmlFor="indicators" className='block text-sm mt-2 font-semibold text-gray-700'>Indicators :</label>
      <textarea 
        className='focus:outline-2 focus:outline-orange-500 focus:border-none resize-none border w-full h-25 p-2 rounded-lg bg-slate-100' 
        name="indicators" 
        placeholder="Indicateurs" 
        value={form.indicators} 
        onChange={handleChange} 
      />

      <label htmlFor="post_trade_analysis" className='block text-sm mt-2 font-semibold text-gray-700'>Post trade analysis :</label>
      <textarea 
        className='focus:outline-2 focus:outline-orange-500 focus:border-none resize-none border w-full h-25 p-2 rounded-lg bg-slate-100' 
        name="post_trade_analysis" 
        placeholder="Analyse post-trade" 
        value={form.post_trade_analysis} 
        onChange={handleChange} 
      />

      {images.map((img, index) => (
        <div key={index} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{img.type} Image :</label>

          <label
            htmlFor={`file-upload-${index}`}
            className="inline-block bg-orange-500 text-white px-4 py-1 rounded-md cursor-pointer hover:bg-orange-600 transition"
          >
            Select the {img.type} image
          </label>

          <input
            id={`file-upload-${index}`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => handleImageChange(index, 'file', e.target.files[0])}
            required
          />

          {img.file && (
            <img
              src={URL.createObjectURL(img.file)}
              alt={`${img.type} preview`}
              className="w-40 mt-2 rounded shadow"
            />
          )}

          <label className="block text-sm mt-2 font-medium text-gray-700">Image timeframe :</label>
          <select
            value={img.timeframe}
            onChange={e => handleImageChange(index, 'timeframe', e.target.value)}
            required
            className="border rounded px-2 py-1 outline-none"
          >
            <option value="M15">M15</option>
            <option value="H1">H1</option>
            <option value="H4">H4</option>
            <option value="D1">D1</option>
          </select>
        </div>
      ))}

      <button type="submit" className='w-full border cursor-pointer py-1 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition'>Envoyer</button>

    </form>
  );
}

export default AddJournalForm;
