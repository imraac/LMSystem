import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../common/LoginModal';
import { FaHtml5, FaJsSquare, FaReact, FaPython } from 'react-icons/fa';

const icons = {
  html: FaHtml5,
  javascript: FaJsSquare,
  react: FaReact,
  python: FaPython,
};

const iconColors = {
  html: '#E34F26',
  javascript: '#F7DF1E',
  react: '#61DAFB',
  python: '#3776AB',
};

const labs = [
  { id: 1, title: 'HTML', icon: 'html' },
  { id: 2, title: 'Javascript', icon: 'javascript' },
  { id: 3, title: 'React', icon: 'react' },
  { id: 4, title: 'Python', icon: 'python' },
];

function LabsSection() {
  const { isAuthenticated, login } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (title) => {
    if (isAuthenticated) {
      navigate(`/quiz/${title.toLowerCase().replace(/ /g, '-')}`);
    } else {
      setShowModal(true);
    }
  };

  const handleLogin = () => {
    login();
    setShowModal(false);
    navigate(`/quiz/${showModal.toLowerCase().replace(/ /g, '-')}`);
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
    setShowModal(false);
  };

  return (
    <>
      <section className="my-16">
        <h3 className="text-3xl font-semibold mb-10 text-center">Labs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {labs.map((lab) => {
            const IconComponent = icons[lab.icon.toLowerCase()];
            return (
              <div
                key={lab.id}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                onClick={() => handleCardClick(lab.title)}
              >
                <IconComponent
                  className="w-16 h-16 mb-2"
                  style={{ color: iconColors[lab.icon.toLowerCase()] }}
                />
                <span className="font-semibold text-lg text-gray-800">{lab.title}</span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="px-8 py-4 bg-[#F86C6B] text-white rounded-lg text-base hover:bg-[#E55A59] transition-colors duration-300"
            onClick={() => navigate('/labs')}
          >
            View More Labs
          </button>
        </div>
      </section>
      {showModal && (
        <LoginModal
          onClose={() => setShowModal(false)}
          onLogin={handleLogin}
          onSignUp={handleSignUp}
        />
      )}
    </>
  );
}

export default LabsSection;
