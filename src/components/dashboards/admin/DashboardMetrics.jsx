import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardMetrics = () => {
  const [activeCourses, setActiveCourses] = useState(0);
  const [revenue, setRevenue] = useState("KSH0.00");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchActiveCourses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/courses/count");
        setActiveCourses(response.data.count);
      } catch (error) {
        console.error("Error fetching active courses:", error);
        setError(
          (prevError) =>
            `${
              prevError ? prevError + ", " : ""
            }An error occurred while fetching the number of active courses.`
        );
      }
    };

    const fetchPaymentSummary = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/payment-summary");
        if (!response.ok) {
          throw new Error("Failed to fetch payment summary");
        }
        const data = await response.json();
        setRevenue(`KSH ${data.total_paid}`);
      } catch (error) {
        setError(
          (prevError) =>
            `${
              prevError ? prevError + ", " : ""
            }Failed to fetch payment summary`
        );
        console.error("Error fetching payment summary:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:5000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(
          (prevError) =>
            `${prevError ? prevError + ", " : ""}Failed to fetch users`
        );
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await fetchActiveCourses();
      await fetchPaymentSummary();
      await fetchUsers();
      setLoading(false);
    };

    fetchData();
  }, []);
  return (
    <section className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Key Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#E8F5E9] p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-[#4CAF50]">Active Courses</h3>
          <p className="text-2xl font-bold text-[#2E7D32]">
            {loading ? (
              "Loading..."
            ) : error ? (
              <span className="text-red-500">{error}</span>
            ) : (
              activeCourses
            )}
          </p>
        </div>
        <div className="bg-[#E8F5E9] p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-[#4CAF50]">Revenue</h3>
          <p className="text-2xl font-bold text-[#2E7D32]">
            {loading ? (
              "Loading..."
            ) : error ? (
              <span className="text-red-500">{error}</span>
            ) : (
              revenue
            )}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-[#E8F5E9] p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-[#4CAF50] mb-4">
            Active Users
          </h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="space-y-4">
              {users.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
                  >
                    <span className="text-gray-800 font-medium">
                      {user.username}
                    </span>
                    <span className="text-gray-600">{user.email}</span>
                    <span className="text-gray-600">{user.role}</span>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">No users found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashboardMetrics;