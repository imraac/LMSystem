import React from 'react';

const LoginForm = ({ email, setEmail, password, setPassword, handleSubmit, error, isLoading }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-coral-500 focus:border-coral-500 sm:text-sm"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-coral-500 focus:border-coral-500 sm:text-sm"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button
          type="submit"
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
            isLoading ? 'bg-green-500 text-white cursor-not-allowed' : 'text-white bg-coral-500 hover:bg-coral-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors duration-200`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span>Signing in...</span>
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
