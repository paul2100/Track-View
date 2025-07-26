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
  });

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
      <select value={selectedTradeId} onChange={e => setSelectedTradeId(e.target.value)} required>
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

      <textarea name="plan_trade" placeholder="Plan de trade" value={form.plan_trade} onChange={handleChange} />
      <textarea name="emotions" placeholder="Émotions" value={form.emotions} onChange={handleChange} />
      <textarea name="indicators" placeholder="Indicateurs" value={form.indicators} onChange={handleChange} />
      <textarea name="post_trade_analysis" placeholder="Analyse post-trade" value={form.post_trade_analysis} onChange={handleChange} />


      {images.map((img, index) => (
  <div key={index} className="space-y-2">
    <label>{img.type} Image :</label>
    <input
      key={index}
      type="file"
      accept="image/*"
      onChange={e => handleImageChange(index, 'file', e.target.files[0])}
      required
    />
    {img.file && (
      <img 
        src={URL.createObjectURL(img.file)} 
        alt={`${img.type} preview`} 
        style={{ width: 150, height: 'auto', marginTop: 8 }}
      />
    )}
    <label>Timeframe :</label>
    <select
      value={img.timeframe}
      onChange={e => handleImageChange(index, 'timeframe', e.target.value)}
      required
    >
      <option value="M15">M-15</option>
      <option value="H1">H-1</option>
      <option value="H4">H-4</option>
      <option value="D1">D-1</option>
    </select>
  </div>
))}



 

      <button type="submit">Envoyer</button>
    </form>
  );
}

export default AddJournalForm;
