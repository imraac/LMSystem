import React, { useState } from 'react';
import TopBar from '../../components/dashboards/admin/TopBar';
import NavigationSidebar from '../../components/dashboards/admin/NavigationSidebar';
import DashboardMetrics from '../../components/dashboards/admin/DashboardMetrics';
import ActivityFeed from '../../components/dashboards/admin/ActivityFeed';
import UserAdministration from '../../components/dashboards/admin/UserAdministration';
import CourseAdministration from '../../components/dashboards/admin/CourseAdministration';

const AdminDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [activities, setActivities] = useState([

  ]);

  const addActivity = (activity) => {
    setActivities([activity, ...activities]);
  };

  const handleNotificationClick = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar notifications={notifications} onNotificationClick={handleNotificationClick} />
      <div className="flex flex-grow">
        <NavigationSidebar />
        <div className="flex-grow p-6 bg-gray-100">
          <DashboardMetrics />
          <ActivityFeed activities={activities} />
          <UserAdministration addActivity={addActivity} />
          <CourseAdministration addActivity={addActivity} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
