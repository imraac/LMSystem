import React, { useState } from 'react';

const ActivityFeed = ({ activities }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedActivities = showAll ? activities : activities.slice(0, 5);

  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div>
        {displayedActivities.length > 0 ? (
          displayedActivities.map((activity, index) => (
            <p key={index} className="border-b border-gray-300 py-2">{activity}</p>
          ))
        ) : (
          <p>No recent activities.</p>
        )}
      </div>
      {activities.length > 5 && (
        <button 
          onClick={() => setShowAll(!showAll)} 
          className="text-[#FF6247] hover:underline"
        >
          {showAll ? 'Show less' : 'See all'}
        </button>
      )}
    </section>
  );
};

export default ActivityFeed;
