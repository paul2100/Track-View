import React, { useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    


    try {
      console.log('Sending data:', form);
      const res = await axios.post('http://localhost:3000/register', form, { withCredentials: true });

      if (res.data.Status === "Success") {
        console.log('User registered successfully:', res.data.user);
        setForm({ name: '', email: '', password: '' });
        navigate('/login');
      } else {
        setError(res.data.Error || 'Erreur lors de l’inscription');
        console.error(res.data.Error);
      }
    } catch (err) {
      setError('Erreur réseau, veuillez réessayer.');
      console.error(err);
    }
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <h1 className="text-2xl font-semibold text-center mb-6">
        <Link to={'/'} ><span className="text-orange-400">T</span>rack-View</Link>
      </h1>

      <div className="w-full max-w-md p-8 shadow-lg rounded-lg bg-white">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold">Create Account</h3>
          <p className="text-sm text-neutral-500 mt-2">
            Track your performance now with Track-View
          </p>
        </div>

        <button className="flex items-center justify-center gap-3 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 32 32"
          >
            <path
              fill="#000"
              d="M16.003906 14.0625 L 16.003906 18.265625 L 21.992188 18.265625 C 21.210938 20.8125 19.082031 22.636719 16.003906 22.636719 C 12.339844 22.636719 9.367188 19.664063 9.367188 16 C 9.367188 12.335938 12.335938 9.363281 16.003906 9.363281 C 17.652344 9.363281 19.15625 9.96875 20.316406 10.964844 L 23.410156 7.867188 C 21.457031 6.085938 18.855469 5 16.003906 5 C 9.925781 5 5 9.925781 5 16 C 5 22.074219 9.925781 27 16.003906 27 C 25.238281 27 27.277344 18.363281 26.371094 14.078125 Z"
            ></path>
          </svg>
          Sign up with Google
        </button>

        <div className="flex items-center gap-4 my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="text-sm text-gray-500">Or sign up with email</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="JohnDoe"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Johndoe@gmail.com"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="flex items-start text-sm mt-1">
            <input type="checkbox" className="mr-2 mt-1" id="terms" required />
            <label htmlFor="terms">
              I agree to the{' '}
              <a href="#" className="text-orange-500 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-orange-500 underline">
                Privacy Policy
              </a>
            </label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-2 rounded-md hover:bg-orange-500 transition cursor-pointer mt-2"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-orange-500">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
