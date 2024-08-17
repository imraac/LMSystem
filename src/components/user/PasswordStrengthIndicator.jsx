import React from 'react';

const PasswordStrengthIndicator = ({ strength }) => {
  const getStrengthColor = () => {
    switch (strength) {
      case 'Strong':
        return 'text-green-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'Weak':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="mt-2">
      <p className={`text-sm ${getStrengthColor()}`}>
        Password Strength: {strength}
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;