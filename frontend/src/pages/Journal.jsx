import React, { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar'
import axios from 'axios';
import FormAddJournal from '../components/FormAddJournal';
import CardJournal from '../components/CardJournal';
import JournalDetail from '../components/JournalDetail';

function Journal() {
  const [period, setPeriod] = useState('week');
  const [createFormOpen, setCreateFormOpen] = useState(false);  
  const [allJournaux , setAllJournaux] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);

  const fetchJournalById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/journal/getJournalById/${id}`, {withCredentials: true});
      setSelectedJournal(res.data.journal);
      console.log(res.data.journal)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3000/api/journal/getAllJournaux', {withCredentials: true})
    .then(res => {
      if (res.status === 200) {
        setAllJournaux(res.data.allJournaux);
        console.log(res.data.allJournaux)
      }
    })
    .catch(err => console.error(err));
  }, []);


  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/journal/deleteJournalById/${id}`, { withCredentials: true})
    .then(res => {
      if (res.status === 200) {
        console.log('Journal supprimer avec success !');
        window.location.reload();
      }
    })
    .catch(err => console.error(err));
  }

  return (
    <div className="flex relative">
      <Sidebar />
      <main className="md:ml-[260px] p-6 flex-1 bg-stone-950/95 min-h-screen text-white">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-5 rounded-md mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="md:text-4xl text-2xl font-semibold">Journals</h1>
            <span className="text-gray-400 text-base">
              View all your trading journals on this page
            </span>
          </div>

          <div className="w-full md:w-auto flex md:flex-row-reverse flex-col md:items-center md:justify-center">
            <button onClick={() => setCreateFormOpen(true)} className="w-full md:w-auto bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition cursor-pointer">
              + Create
            </button>

            <div className="md:mr-5 md:mt-0 mt-10">
              <button onClick={() => setPeriod('week')} className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-orange-500/100 hover:scale-110 hover:shadow-orange-500 duration-300 ${period === 'week' ? 'text-orange-400 font-semibold' : ''}`}>Week</button>
              <button onClick={() => setPeriod('month')} className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-orange-500/100 hover:scale-110 hover:shadow-orange-500 duration-300 ${period === 'month' ? 'text-orange-400 font-semibold' : ''}`}>Month</button>
              <button onClick={() => setPeriod('year')} className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-orange-500/100 hover:scale-110 hover:shadow-orange-500 duration-300 ${period === 'year' ? 'text-orange-400 font-semibold' : ''}`}>Year</button>
            </div>
          </div>
        </div>

        {createFormOpen && (
          <div className='fixed top-0 right-0 h-full md:w-[400px] w-full bg-zinc-900 z-50 shadow-xl overflow-y-auto p-6'>
            <button onClick={() => setCreateFormOpen(false)} className="text-red-400 font-semibold cursor-pointer mb-4 hover:text-red-300">
              Close
            </button>
            <FormAddJournal onSuccess={() => { fetchTrades(); setCreateFormOpen(false); }} />
          </div>
        )}

        {allJournaux.length === 0 ? (
          <div className='flex justify-center flex-col items-center h-screen bg-zinc-900 rounded-lg'>
            <h3 className='text-sm mb-10 text-gray-400'>You have not added any trades yet, please add one!</h3>
            <div className='p-10 bg-rose-900/30 rounded-[300px]'>
              <img src="src/assets/image.svg" alt="" className='h-15 w-15 opacity-40'/>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold text-white mb-4"><span className='text-orange-400'>A</span>ll newspapers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allJournaux.map(journal => (
                <CardJournal key={journal.id} journal={journal} VoirPlus={fetchJournalById} onDelete={handleDelete} />
              ))}
            </div>
          </div>
        )}

        {selectedJournal && (
          <div className="fixed top-0 md:left-65 w-full left-0 h-full bg-zinc-900 z-50 overflow-x-hidden overflow-y-auto p-6">
            <button onClick={() => setSelectedJournal(null)} className="text-white mb-4 cursor-pointer border border-red-600 px-4 py-1 rounded-lg bg-red-700/30 hover:bg-transparent duration-300">
              Close
            </button>
            <JournalDetail journal={selectedJournal} />
          </div>
        )}
      </main>
    </div>
  );
}

export default Journal;
