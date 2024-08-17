import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/courses/${id}`);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://lms-backend-1-yx57.onrender.com/courses"
        );
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError(
          "An error occurred while fetching courses. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const notifyActivity = (message) => {
    setNotifications((prev) => [...prev, message]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 3000); 
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/courses/${id}`);
      setCourses(courses.filter((course) => course.id !== id));
      notifyActivity(`Course with ID "${id}" was deleted.`);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleArchiveCourse = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:5000/courses/${id}/archive`);
      setCourses(courses.map(course =>
        course.id === id ? { ...course, isArchived: true } : course
      ));
      notifyActivity(`Course with ID "${id}" was archived.`);
    } catch (error) {
      console.error("Error archiving course:", error);
    }
  };

  const handleUnarchiveCourse = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:5000/courses/${id}/unarchive`);
      setCourses(courses.map(course =>
        course.id === id ? { ...course, isArchived: false } : course
      ));
      notifyActivity(`Course with ID "${id}" was unarchived.`);
    } catch (error) {
      console.error("Error unarchiving course:", error);
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedCourses = Array.from(courses);
    const [movedCourse] = reorderedCourses.splice(result.source.index, 1);
    reorderedCourses.splice(result.destination.index, 0, movedCourse);

    setCourses(reorderedCourses);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Admin Course Management System
      </h2>
      <h1>
        View Course: Browse through the list of courses & DELETE, ARCHIVE, or UNARCHIVE a specific course.
      </h1>

     
      <div className="mb-4">
        {notifications.map((notification, index) => (
          <div key={index} className="bg-green-600 text-white px-4 py-2 rounded mb-2">
            {notification}
          </div>
        ))}
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="courses">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4"
            >
              {courses.map((course, index) => (
                <Draggable draggableId={course.id.toString()} index={index} key={course.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => handleClick(course.id)} 
                      className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105 hover:shadow-2xl border border-gray-200 flex flex-col cursor-pointer relative ${course.isArchived ? 'opacity-50' : ''}`}
                      style={{ height: "450px", width: "300px" }}
                    >
                      <div className="relative h-[45%] w-full">
                        <img
                          src={course.image || "/default-thumbnail.jpg"}
                          alt={`${course.title} thumbnail`}
                          className="absolute inset-0 w-full h-full object-cover rounded-t-2xl"
                        />
                        {course.isArchived && (
                          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                            Archived
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                          {course.title}
                        </h3>
                        <p className="text-gray-700 text-sm flex-grow overflow-hidden">
                          {course.description}
                        </p>
                        {course.tags?.slice(0, 3).length > 0 && (
                          <div className="mt-2 flex flex-wrap">
                            {course.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="inline-block bg-coral-500 text-white text-xs px-2 py-1 rounded-full mr-2 mb-2"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        {course.techStack?.slice(0, 3).length > 0 && (
                          <div className="mt-2 flex flex-wrap">
                            {course.techStack.slice(0, 3).map((tech, index) => (
                              <span
                                key={index}
                                className="inline-block text-white bg-[#FF6247] text-xs px-2 py-1 rounded-full mr-2 mb-2"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex justify-between mt-4">
                          {!course.isArchived ? (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); 
                                  handleDeleteCourse(course.id);
                                }}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                              >
                                Delete
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); 
                                  handleArchiveCourse(course.id);
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                              >
                                Archive
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); 
                                handleUnarchiveCourse(course.id);
                              }}
                              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                            >
                              Unarchive
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default CourseManagement;
