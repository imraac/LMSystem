

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaAngleRight, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CourseNotifications = () => {
  const [isAllNotices, setIsAllNotices] = useState(false);
  const [message, setMessage] = useState('No recent changes in courses');
  const [messageHistory, setMessageHistory] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false); 

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/courses');
        const notifications = response.data;

        if (notifications.length > 0) {
          const latestMessage = `New Course Added: ${notifications[0].title}`;
          setMessage(latestMessage);
          setMessageHistory(notifications.map(course => `New course added: ${course.title}`));
        } else {
          setMessage('No recent changes in courses');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setMessage('Error loading notifications.');
      }
    };

    fetchNotifications();

    const intervalId = setInterval(fetchNotifications, 60000); 

    return () => clearInterval(intervalId); 
  }, []);

  useEffect(() => {
    if (isAllNotices) {
      const fetchCourses = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:5000/courses');
          setCourses(response.data);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };

      fetchCourses();
    }
  }, [isAllNotices]);

  // Simulate checking subscription status
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/user/subscription-status');
        setIsSubscribed(response.data.isSubscribed);
      } catch (error) {
        console.error('Error checking subscription status:', error);
      }
    };

    checkSubscription();
  }, []);

  return (
    <section className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        {isAllNotices ? 'All Notices' : 'Daily Notice'}
      </h2>

      {isAllNotices ? (
        <>
          <button
            onClick={() => setIsAllNotices(false)}
            className="text-primary hover:text-primary-dark font-medium flex items-center mb-6"
          >
            <FaArrowLeft className="mr-2" /> Back to Daily Notice
          </button>

          {courses.length > 0 ? (
            <ul className="space-y-4">
              {courses.map((course, index) => (
                <li key={index} className="border-b border-gray-300 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                  <p className="text-gray-600">{course.description}</p>
                  {isSubscribed ? (
                    <>
                      <a href={course.video} className="text-blue-600 hover:underline">Watch Video</a>
                      <div className="mt-2">
                        <img src={course.image} alt={course.title} className="w-full h-auto rounded-lg" />
                        <ul className="mt-2 text-gray-600">
                          {course.techStack.map((tech, index) => (
                            <li key={index}>{tech}</li>
                          ))}
                        </ul>
                        <h4 className="mt-2 font-semibold">What You'll Learn:</h4>
                        <ul className="text-gray-600">
                          {course.whatYouWillLearn.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
                      <p className="text-yellow-800 font-semibold">Subscribe to view course details</p>
                      <Link to="/subscribe" className="text-blue-600 hover:underline mt-2 block">
                        Subscribe Now
                      </Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No courses available.</p>
          )}
        </>
      ) : (
        <>
          <p className="text-gray-600 mb-4">{message}</p>
          <p className="text-gray-600 mb-6">Always stay updated in your student portal</p>

          <ul className="text-gray-600 mb-6">
            {messageHistory.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>

          <button
            onClick={() => setIsAllNotices(true)}
            className="text-primary hover:text-primary-dark font-medium flex items-center"
          >
            See all notices <FaAngleRight className="ml-2" />
          </button>
        </>
      )}
    </section>
  );
};

export default CourseNotifications;

