import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Demo from './pages/Demo';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Trades from './pages/Trades';
import PrivateRoute from './components/PrivateRoute';
import Performance from './pages/Performance';
import Account from './pages/Account';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/pricing" element={<Pricing />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journals" element={<Journal />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/account" element={<Account />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
