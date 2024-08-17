import React from 'react';
import welcome from '../../assets/images/welcome-image.png'; // Ensure the path is correct

function WelcomeSection() {
  return (
    <div className="w-1/2 bg-coral-50 p-12 flex flex-col justify-center ">
        <p className='font-semibold'>SkillQuest 🧠</p>
      <h1 className="text-4xl font-bold mb-6 text-black leading-tight">
        Welcome to<br />SkillQuest<br />Learning Platform
      </h1>
      <div className="mt-2">
        <img src={welcome} alt="Learning illustration" className="w-full" />
      </div>
    </div>
  );
}

export default WelcomeSection;