import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserIcon } from "@heroicons/react/24/solid";

const InstructorsList = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:5000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const allUsers = response.data.users;

        // Filter users by role 'admin'
        const filteredAdmins = allUsers.filter((user) => user.role === "admin");
        setAdminUsers(filteredAdmins);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminUsers();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="space-y-4 mt-4">
          {adminUsers.length > 0 ? (
            adminUsers.map((user, index) => (
              <li
                key={index}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex items-center"
              >
                <UserIcon className="h-8 w-8 text-[#FF6247] mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-[#FF6247]">
                    {user.username}
                  </h3>
                  <p className="text-gray-700">{user.email}</p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600">No admin users found</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default InstructorsList;
