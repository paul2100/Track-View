import React from 'react';

function HeaderPage({ title, description, mainButton, extraButtons }) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-5 rounded-md mb-6">
      <div className="mb-4 md:mb-0">
        <h1 className="md:text-4xl text-2xl text-white font-semibold">{title}</h1>
        <span className="text-gray-400 text-base">{description}</span>
      </div>

      <div className="w-full md:w-auto flex md:flex-row-reverse flex-col md:items-center md:justify-center">
        {mainButton && (
          <button
            onClick={mainButton.onClick}
            className="w-full md:w-auto bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition cursor-pointer"
          >
            {mainButton.label}
          </button>
        )}

        {extraButtons && (
          <div className="md:mr-5 md:mt-0 mt-10">
            {extraButtons.map((btn, index) => (
              <button
                key={index}
                onClick={btn.onClick}
                className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-black/40 hover:scale-105 duration-300 ${
                  btn.active
                    ? 'text-orange-400 border border-orange-400 shadow-orange-400'
                    : 'text-gray-200 border border-white shadow-white'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderPage;
