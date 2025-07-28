import React, { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar'
import axios from 'axios';
import FormAddJournal from '../components/FormAddJournal';
import CardJournal from '../components/CardJournal';
import JournalDetail from '../components/JournalDetail';
import FormUpdateJournal from '../components/FormUpdateJournal';

function Journal() {
  const [period, setPeriod] = useState('week');
  const [createFormOpen, setCreateFormOpen] = useState(false);  
  const [allJournaux, setAllJournaux] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [editingJournal, setEditingJournal] = useState(null);

  const fetchJournalById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/journal/getJournalById/${id}`, {withCredentials: true});
      setSelectedJournal(res.data.journal);
      console.log(res.data.journal)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllJournaux = () => {
    axios.get(`http://localhost:3000/api/journal/getAllJournaux?period=${period}`, {withCredentials: true})
    .then(res => {
      if (res.status === 200) {
        setAllJournaux(res.data.allJournaux);
        console.log(res.data.allJournaux)
      }
    })
    .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchAllJournaux();
  }, [period]);

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce journal ?')) {
      axios.delete(`http://localhost:3000/api/journal/deleteJournalById/${id}`, { withCredentials: true})
      .then(res => {
        if (res.status === 200) {
          console.log('Journal supprimé avec succès !');
          fetchAllJournaux();
        }
      })
      .catch(err => console.error(err));
    }
  };

  const handleEdit = (journal) => {
    setEditingJournal(journal);
  };

  const handleUpdateSuccess = () => {
    setEditingJournal(null);
    fetchAllJournaux();
  };

  return (
    <div className="flex relative">
      <Sidebar />
      <main className="md:ml-[260px] p-6 flex-1 bg-black min-h-screen text-neutral-900">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-5 rounded-md mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="md:text-4xl text-white text-2xl font-semibold">Journals</h1>
            <span className="text-gray-400 text-base">
              View all your trading journals on this page
            </span>
          </div>

          <div className="w-full md:w-auto flex md:flex-row-reverse flex-col md:items-center md:justify-center">
            <button onClick={() => setCreateFormOpen(true)} className="w-full md:w-auto bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition cursor-pointer">
              + Create
            </button>

            <div className="md:mr-5 md:mt-0 mt-10">
              <button onClick={() => setPeriod('week')} className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-black/40  hover:scale-105  duration-300 ${period === 'week' ? 'text-orange-400 border border-orange-400 shadow-orange-400' : 'text-gray-200 border border-white shadow-white'}`}>Week</button>
              <button onClick={() => setPeriod('month')} className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-black/40  hover:scale-105 duration-300 ${period === 'month' ? 'text-orange-400 border border-orange-400 shadow-orange-400' : 'text-gray-200 border border-white shadow-white'}`}>Month</button>
              <button onClick={() => setPeriod('year')} className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-black/40  hover:scale-105  duration-300 ${period === 'year' ? 'text-orange-400 border border-orange-400 shadow-orange-400' : 'text-gray-200 border border-white shadow-white'}`}>Year</button>
            </div>
          </div>
        </div>

        {createFormOpen && (
          <div className='fixed top-0 right-0 h-full md:w-[400px] w-full bg-white z-50 shadow-xl overflow-y-auto p-6'>
            <button onClick={() => setCreateFormOpen(false)} className="text-rose-500 mb-4 cursor-pointer border border-red-600 px-4 py-1 rounded-lg bg-rose-100 hover:bg-red-600 hover:text-white duration-300">
              Close
            </button>
            <FormAddJournal onSuccess={() => { 
              fetchAllJournaux(); 
              setCreateFormOpen(false); 
            }} />
          </div>
        )}

        {editingJournal && (
          <div className='fixed top-0 right-0 h-full md:w-[500px] w-full bg-white z-50 shadow-xl overflow-y-auto p-6'>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Modifier le Journal</h2>
              <button 
                onClick={() => setEditingJournal(null)} 
                className="text-rose-500 cursor-pointer border border-red-600 px-4 py-1 rounded-lg bg-rose-100 hover:bg-red-600 hover:text-white duration-300"
              >
                Close
              </button>
            </div>
            <FormUpdateJournal 
              journalId={editingJournal.id}
              onUpdate={handleUpdateSuccess}
              onClose={() => setEditingJournal(null)}
            />
          </div>
        )}

        {allJournaux.length === 0 ? (
          <div className='flex justify-center flex-col items-center h-screen bg-gray-100 rounded-lg'>
            <h3 className='text-sm mb-10 text-black'>You have not added any trades yet, please add one!</h3>
            <div className='p-10 bg-rose-100 rounded-[300px]'>
              <img src="src/assets/image.svg" alt="" className='h-15 w-15 opacity-40'/>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold text-gray-200 mb-4">
              <span className='text-orange-400'>A</span>ll newspapers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allJournaux.map(journal => (
                <CardJournal 
                  key={journal.id} 
                  journal={journal} 
                  VoirPlus={fetchJournalById}
                  onEdit={handleEdit}
                  onDelete={handleDelete} 
                />
              ))}
            </div>
          </div>
        )}

        {selectedJournal && (
          <div className="fixed top-0 md:left-65 w-full left-0 h-full bg-black/40 z-50 overflow-x-hidden overflow-y-auto p-6">
            <JournalDetail journal={selectedJournal} onClose={() => setSelectedJournal(null)} />
          </div>
        )}
      </main>
    </div>
  );
}

export default Journal;