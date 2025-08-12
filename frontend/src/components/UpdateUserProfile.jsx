import React, { useState, useEffect } from 'react';
import { api } from '../utils/utils.js';

function UpdateUserProfile({ initialData }) {
  const [form, setForm] = useState({
    username: '',
    experience: '',
    language: '',
    timezone: '',
    tradingStyle: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const timezones = Intl.supportedValuesOf('timeZone');

  useEffect(() => {
    if (initialData) {
      setForm({
        username: initialData.profile?.username || '',
        experience: initialData.profile?.experience || '',
        language: initialData.profile?.language || '',
        timezone: initialData.profile?.timezone || '',
        tradingStyle: initialData.profile?.tradingStyle || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.patch(`/api/user/updateUserProfile/${initialData.id}`, form);
      setMessage('Profile updated successfully!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      setMessage('Error updating profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="md:w-[48%] w-full mx-auto md:my-0 my-4 bg-gray-200/10 p-6 rounded-2xl shadow-lg space-y-5 border border-stone-500/60"
    >
      <h2 className="text-2xl font-semibold text-white text-start mb-4">Update Profile</h2>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-black/30 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Experience</label>
        <select
          name="experience"
          value={form.experience}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-black/30 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Select your level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
      </div>
    
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Language</label>
        <select
          name="language"
          value={form.language}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-black/30 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Select your language</option>
          <option value="fr">FR</option>
          <option value="en">EN</option>
          <option value="gr">GR</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Timezone</label>
        <select
          name="timezone"
          value={form.timezone}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-black/30 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Select timezone</option>
          {timezones.map((tz) => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Trading Style</label>
        <select
          name="tradingStyle"
          value={form.tradingStyle}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-black/30 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Select your trading style</option>
          <option value="scalping">Scalping</option>
          <option value="day">Day Trading</option>
          <option value="swing">Swing Trading</option>
          <option value="position">Position Trading</option>
        </select>
      </div>


      <button 
        type="submit" 
        disabled={loading} 
        className="w-full py-2 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold text-white transition duration-200 disabled:opacity-50 cursor-pointer"
      >
        {loading ? 'Mise à jour...' : 'Save Changes'}
      </button>


      {message && (
        <p className={`text-center font-medium ${message.startsWith ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </form>
  );
}

export default UpdateUserProfile;
