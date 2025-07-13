import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="md:w-65 hidden h-screen fixed top-0 left-0 bg-gray-50 shadow-lg border-r border-r-stone-300 z-40 md:flex flex-col justify-between">
      
      
      <div className="border-b border-b-stone-300 flex items-center px-5 py-3 bg-gradient-to-r from-red-100 to-white">
        <div className="p-1 bg-red-200 rounded-lg">
          <img src="src/assets/icon.svg" alt="Logo" className="h-8 w-8" />
        </div>
        <div className="ml-2 flex flex-col leading-tight">
          <h2 className="text-lg font-semibold">
            <Link to={'/dashboard'}><span className="text-orange-400">T</span>rackView</Link>
          </h2>
          <span className="text-xs text-gray-500">beta</span>
        </div>
      </div>

      
      <nav className="flex flex-col gap-4 px-5 py-6 flex-grow">
        <div className="mb-2">
          <h3 className="text-xs font-semibold uppercase text-gray-500 tracking-wide">Main</h3>
        </div>

        
                
        <Link to="/dashboard" className="flex items-center gap-3 text-rose-500 transition bg-rose-100 hover:bg-red-50 border border-rose-300 rounded-lg px-2 py-2 duration-400">
          <svg className="w-7 h-7 p-2 rounded bg-rose-300 " fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 1.32L0.66 8.13L1.34 8.87L2 8.25V14H7V9H9V14H14V8.25L14.66 8.87L15.34 8.13Z M8 2.68L13 7.33V13H10V8H6V13H3V7.33Z" />
          </svg>
          Dashboard
        </Link>

        
        <Link to="/trades" className="group flex items-center gap-3 text-gray-500 hover:text-rose-500 transition hover:bg-red-50 border-rose-300 rounded-lg px-2 py-2 duration-400">
          <svg className="w-7 h-7 p-2 rounded bg-gray-200 group-hover:bg-rose-300 duration-500" fill="currentColor" viewBox="0 0 16 16">
            <path d="M.64 11.85L0 11.1 2.57 8.85l2.02 1.55 4.68-5.15 3.72 3.59 2.4-2.05.65.75-3.08 2.66-3.65-3.52-4.6 5.08-2.1-1.62-1.95 1.71z" />
          </svg>
          Trades
        </Link>

        
        <Link to="/journals" className="group flex items-center gap-3 text-gray-500 hover:text-rose-500 transition hover:bg-red-50 border-rose-300 rounded-lg px-2 py-2 duration-400">
          <svg className="w-7 h-7 p-2 rounded bg-gray-200 group-hover:bg-rose-300 duration-500" fill="currentColor" viewBox="0 0 48 48">
            <path d="M31 48H5a5.006 5.006 0 0 1-5-5V9a1 1 0 0 1 .293-.707l8-8A1 1 0 0 1 9 0h22a5.006 5.006 0 0 1 5 5v22h-2V5a3 3 0 0 0-3-3H9.414L2 9.414V43a3 3 0 0 0 3 3h26a3 3 0 0 0 3-3v-2h2v2a5.006 5.006 0 0 1-5 5z" />
            <path d="M7 10H5V8h2a1 1 0 0 0 1-1V1h2v6a3 3 0 0 1-3 3z" />
            <path d="M31.769 41a1 1 0 0 1-.707-.293l-2.769-2.769a1 1 0 0 1 0-1.415l15.231-15.23a1 1 0 0 1 1.414 0l2.769 2.769a1 1 0 0 1 0 1.415l-15.231 15.23a1 1 0 0 1-.707.293zm-1.355-3.77 1.355 1.356 13.817-13.817-1.355-1.355z" />
            <path d="M32 41h-3a1 1 0 0 1-1-1v-3h2v2h2zM32 9h-2V7a1 1 0 0 0-1-1h-2V4h2a3 3 0 0 1 3 3zM23 4h2v2h-2z" />
            <path d="M12 21H6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1zm-5-2h4v-4H7zM12 31H6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1zm-5-2h4v-4H7zM12 41H6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1zm-5-2h4v-4H7z" />
            <path d="M15 14h17v2H15zM15 18h17v2H15zM15 24h17v2H15zM15 28h17v2H15zM15 34h11v2H15zM15 38h11v2H15z" />
            <path d="m5.292 19.293 6-6 1.414 1.414-6 6zM5.292 29.293l6-6 1.414 1.414-6 6zM5.293 39.293l6-6 1.414 1.415-6 6z" />
          </svg>
          Trading Journal
        </Link>
      </nav>

      
      <div className="px-5 py-6 border-t">
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/';
          }}
          className="text-red-500 hover:text-red-600 transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
