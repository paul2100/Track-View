import axios from 'axios';
import React, { useState, useEffect } from 'react';

function FormUpdateJournal({ journalId, onUpdate, onClose }) {
    const [form, setForm] = useState({
        plan_trade: '',
        emotions: '',
        indicators: '',
        post_trade_analysis: ''
    });
    
    const [images, setImages] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (index, field, value) => {
        setImages(prev => prev.map((img, i) => 
            i === index ? { ...img, [field]: value } : img
        ));
    };

    useEffect(() => {
        if (!journalId) {
            setError('Journal ID manquant');
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:3000/api/journal/getJournalById/${journalId}`, { withCredentials: true })
            .then(res => {
                if (res.status === 200 && res.data.journal) {
                    const journal = res.data.journal;
                    
                    setForm({
                        plan_trade: journal.plan_trade || '',
                        emotions: journal.emotions || '',
                        indicators: journal.indicators || '',
                        post_trade_analysis: journal.post_trade_analysis || '',
                    });
                    
                    const screenshots = journal.tradeScreenshots || [];
                    const formattedImages = screenshots.map(screenshot => ({
                        id: screenshot.id,
                        file: null,
                        existingUrl: screenshot.screenshotUrl,
                        type: screenshot.type || 'Before',
                        timeframe: screenshot.timeframe || 'M15',
                        hasExisting: true
                    }));
                    
                    if (formattedImages.length === 0) {
                        setImages([
                            { id: null, file: null, existingUrl: null, type: 'Before', timeframe: 'M15', hasExisting: false },
                            { id: null, file: null, existingUrl: null, type: 'After', timeframe: 'M15', hasExisting: false }
                        ]);
                    } else {
                        setImages(formattedImages);
                    }
                    
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error('Erreur lors de la récupération du journal:', err);
                setError('Erreur lors du chargement des données');
                setLoading(false);
            });
    }, [journalId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();

        formData.append('plan_trade', form.plan_trade);
        formData.append('emotions', form.emotions);
        formData.append('indicators', form.indicators);
        formData.append('post_trade_analysis', form.post_trade_analysis);

        images.forEach((img, index) => {
            if (img.file) {
                formData.append('images', img.file);
                formData.append('types', img.type);
                formData.append('timeframes', img.timeframe);
                if (img.id) {
                    formData.append('replaceImageIds', img.id);
                }
            } else if (img.hasExisting && img.id) {
                formData.append('updateImageMeta', JSON.stringify({
                    id: img.id,
                    type: img.type,
                    timeframe: img.timeframe
                }));
            }
        });

        axios.patch(`http://localhost:3000/api/journal/updateJournalById/${journalId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        })
        .then(res => {
            if (res.status === 200) {
                if (onUpdate) {
                    onUpdate(journalId);
                }
                if (onClose) {
                    onClose();
                } else {
                    window.location.reload();
                }
            }
        })
        .catch(err => {
            console.error('Erreur lors de la mise à jour:', err);
            setLoading(false);
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="text-orange-500">Chargement...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
            </div>
        );
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                    <label htmlFor="plan_trade" className='block text-sm mt-2 font-semibold text-gray-700'>
                        Plan trade :
                    </label>
                    <textarea
                        className='focus:outline-2 focus:outline-orange-500 focus:border-none resize-none border w-full h-25 p-2 rounded-lg bg-slate-100' 
                        name="plan_trade" 
                        placeholder="Plan de trade" 
                        value={form.plan_trade} 
                        onChange={handleChange} 
                    />
                </div>

                <div>
                    <label htmlFor="emotions" className='block text-sm mt-2 font-semibold text-gray-700'>
                        Émotions :
                    </label>
                    <textarea 
                        className='focus:outline-2 focus:outline-orange-500 focus:border-none resize-none border w-full h-25 p-2 rounded-lg bg-slate-100' 
                        name="emotions" 
                        placeholder="Émotions" 
                        value={form.emotions} 
                        onChange={handleChange} 
                    />
                </div>

                <div>
                    <label htmlFor="indicators" className='block text-sm mt-2 font-semibold text-gray-700'>
                        Indicateurs :
                    </label>
                    <textarea 
                        className='focus:outline-2 focus:outline-orange-500 focus:border-none resize-none border w-full h-25 p-2 rounded-lg bg-slate-100' 
                        name="indicators" 
                        placeholder="Indicateurs" 
                        value={form.indicators} 
                        onChange={handleChange} 
                    />
                </div>

                <div>
                    <label htmlFor="post_trade_analysis" className='block text-sm mt-2 font-semibold text-gray-700'>
                        Analyse post-trade :
                    </label>
                    <textarea 
                        className='focus:outline-2 focus:outline-orange-500 focus:border-none resize-none border w-full h-25 p-2 rounded-lg bg-slate-100' 
                        name="post_trade_analysis" 
                        placeholder="Analyse post-trade" 
                        value={form.post_trade_analysis} 
                        onChange={handleChange} 
                    />
                </div>

                {images.map((img, index) => (
                    <div key={index} className="space-y-2 border rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">
                                Image {img.type} :
                            </label>
                        </div>

                        {img.hasExisting && img.existingUrl && !img.file && (
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Image actuelle :</p>
                                <img
                                    src={img.existingUrl}
                                    alt={`${img.type} current`}
                                    className="w-40 rounded shadow border"
                                />
                            </div>
                        )}

                        <label
                            htmlFor={`file-upload-${index}`}
                            className="inline-block bg-orange-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-orange-600 transition"
                        >
                            {img.hasExisting ? `Remplacer l'image ${img.type}` : `Sélectionner l'image ${img.type}`}
                        </label>

                        <input
                            id={`file-upload-${index}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => handleImageChange(index, 'file', e.target.files[0])}
                        />

                        {img.file && (
                            <div>
                                <p className="text-sm text-green-600 mb-2">Nouvelle image sélectionnée :</p>
                                <img
                                    src={URL.createObjectURL(img.file)}
                                    alt={`${img.type} preview`}
                                    className="w-40 rounded shadow border"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm mt-2 font-medium text-gray-700">
                                Timeframe de l'image :
                            </label>
                            <select
                                value={img.timeframe}
                                onChange={e => handleImageChange(index, 'timeframe', e.target.value)}
                                className="border rounded px-2 py-1 outline-none bg-white w-full"
                            >
                                <option value="M15">M15</option>
                                <option value="H1">H1</option>
                                <option value="H4">H4</option>
                                <option value="D1">D1</option>
                            </select>
                        </div>
                    </div>
                ))}

                <button 
                    type="submit" 
                    disabled={loading}
                    className='w-full border cursor-pointer py-3 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition disabled:opacity-50'
                >
                    {loading ? 'Mise à jour...' : 'Mettre à jour le journal'}
                </button>

            </form>
        </div>
    );
}

export default FormUpdateJournal;