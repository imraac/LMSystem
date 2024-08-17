import React from 'react';
import InstructorsList from '../../components/dashboards/instructors/InstructorsList';

const Instructors = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-[#FF6247] text-white p-6 rounded-b-lg shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Instructors</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-6">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Meet Our Instructors</h2>
          <p className="mt-2 text-gray-600">Learn more about our experienced instructors who will guide you through your web development journey.</p>
          <InstructorsList />
        </section>
      </main>
    </div>
  );
};

export default Instructors;
