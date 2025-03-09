import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (username.length < 3) newErrors.username = 'Username must be at least 8 characters';
    if (!password) newErrors.password = 'Password is required';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert('Signup successful!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  const passwordCriteria = {
    length: password.length >= 3,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    specialChar: /[!@#$%^&*]/.test(password),
  };

  const isFormValid =
    username.length >= 3 &&
    Object.values(passwordCriteria).every(Boolean) &&
    password === confirmPassword &&
    confirmPassword !== '';

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-2 border rounded ${username.length >= 3 ? 'border-green-500' : 'border-gray-300'}`}
            />
            {errors.username && <p className="text-red-500">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border ${
                passwordCriteria.length && 
                passwordCriteria.lowercase && 
                passwordCriteria.uppercase && 
                passwordCriteria.specialChar ? 'border-green-500':'border-gray-300'}  rounded`}
            />
            <ul className="mt-2 text-sm">
              <li className={`flex items-center ${passwordCriteria.length ? 'text-green-500' : 'text-gray-500'}`}>
                {passwordCriteria.length ? <CheckCircle size={16} /> : <XCircle size={16} />} At least 8 characters
              </li>
              <li className={`flex items-center ${passwordCriteria.lowercase ? 'text-green-500' : 'text-gray-500'}`}>
                {passwordCriteria.lowercase ? <CheckCircle size={16} /> : <XCircle size={16} />} One lowercase letter
              </li>
              <li className={`flex items-center ${passwordCriteria.uppercase ? 'text-green-500' : 'text-gray-500'}`}>
                {passwordCriteria.uppercase ? <CheckCircle size={16} /> : <XCircle size={16} />} One uppercase letter
              </li>
              <li className={`flex items-center ${passwordCriteria.specialChar ? 'text-green-500' : 'text-gray-500'}`}>
                {passwordCriteria.specialChar ? <CheckCircle size={16} /> : <XCircle size={16} />} One special character
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-2 border rounded ${confirmPassword && (password === confirmPassword ? 'border-green-500' : 'border-red-500')}`}
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full p-2 rounded text-white ${isFormValid ? '!bg-green-500 hover:!bg-green-800' : '!bg-gray-400 cursor-not-allowed'}`}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;