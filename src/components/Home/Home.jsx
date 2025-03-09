import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h1 className="text-3xl font-bold mb-4">Hello, {user ? user : 'Guest'}!</h1>
        <p className="mb-6">Welcome to SecureConnect. Please choose an action below:</p>
          <button  onClick={logout} type="submit" className="w-full !bg-blue-500 text-white p-2 rounded hover:!bg-white hover:!text-blue-500 hover:border-blue-500 border border-blue-500 ">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;