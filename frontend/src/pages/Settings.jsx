import React from 'react'
import Sidebar from '../components/SideBar'
import HeaderPage from '../components/pages/HeaderPage'
import { useState , useEffect } from 'react'
import {api} from '../utils/utils';
import UpdateUserProfile from '../components/UpdateUserProfile';
import UpdatePortefeuille from '../components/UpdatePortefeuille';




function Settings() {

  const [user , setUser] = useState(null);
  const [portefeuille , setPortefeuille] = useState(null);

  useEffect(() => {
  api.get("/api/portefeuille/getPortefeuille")
    .then(res => {
      setPortefeuille(res.data.portefeuille);
      console.log(res.data.portefeuille);
    })
    .catch(err => console.error(err));
  }, []);

  useEffect(() => {
  api.get("/api/user/getUser")
    .then(res => {
      setUser(res.data.user);
      console.log(res.data.user);
    })
    .catch(err => console.error(err));
  }, []);


  return (
    <div>
      <Sidebar/>
      <main className="md:ml-[260px] p-6 flex-1 bg-black min-h-screen">
        <HeaderPage title="Settings" description="Find all the information you need to change on your account here."/>
        <div className='w-full p-6 rounded-lg flex md:flex-row flex-col justify-between inset-shadow-stone-300/40 inset-shadow-sm shadow-md shadow-orange-400/30'>
          <UpdateUserProfile initialData={user}/>
          <hr className="hidden md:block w-px bg-white/30 h-auto mx-6" />
          <UpdatePortefeuille initialDataPortefeuille={portefeuille}/>
        </div>
      </main>
    </div>
  )
}

export default Settings
