import React, { useState } from 'react';
import axios from 'axios';

const UserAdministration = ({ addActivity }) => {
  const [showForm, setShowForm] = useState(false);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    image: '',
    video: '',
    techStack: '',
    whatYouWillLearn: ''
  });
  const [courses, setCourses] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      ...courseData,
      techStack: courseData.techStack.split(',').map(item => item.trim()),
      whatYouWillLearn: courseData.whatYouWillLearn.split(',').map(item => item.trim())
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/courses', newCourse);
      setCourses([response.data, ...courses]);
      addActivity(`Course "${courseData.title}" was added.`);
      setCourseData({
        title: '',
        description: '',
        image: '',
        video: '',
        techStack: '',
        whatYouWillLearn: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding course:', error);
      addActivity('An error occurred while adding the course.');
    }
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Course Management</h2>
      <button 
        onClick={() => setShowForm(!showForm)} 
        className="bg-[#FF6247] text-white px-4 py-2 rounded hover:bg-[#FF3E3E] transition"
      >
        {showForm ? 'Hide Form' : 'Add New Course'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-gray-700">Course Title</label>
            <input 
              type="text" 
              name="title"
              className="w-full border border-gray-300 p-2 rounded" 
              placeholder="Enter course title" 
              value={courseData.title} 
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Course Description</label>
            <input 
              type="text" 
              name="description"
              className="w-full border border-gray-300 p-2 rounded" 
              placeholder="Enter course description" 
              value={courseData.description} 
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Course Image URL</label>
            <input 
              type="text" 
              name="image"
              className="w-full border border-gray-300 p-2 rounded" 
              placeholder="Enter image URL" 
              value={courseData.image} 
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Course Video URL</label>
            <input 
              type="text" 
              name="video"
              className="w-full border border-gray-300 p-2 rounded" 
              placeholder="Enter video URL" 
              value={courseData.video} 
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Tech Stack (comma separated)</label>
            <input 
              type="text" 
              name="techStack"
              className="w-full border border-gray-300 p-2 rounded" 
              placeholder="e.g., JavaScript, React, Node.js" 
              value={courseData.techStack} 
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">What You Will Learn (comma separated)</label>
            <input 
              type="text" 
              name="whatYouWillLearn"
              className="w-full border border-gray-300 p-2 rounded" 
              placeholder="e.g., Advanced JavaScript, React, Node.js" 
              value={courseData.whatYouWillLearn} 
              onChange={handleInputChange}
            />
          </div>
          <button 
            type="submit" 
            className="bg-[#FF6247] text-white px-4 py-2 rounded hover:bg-[#FF3E3E] transition"
          >
            Submit
          </button>
        </form>
      )}
      {courses.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Course List</h3>
          <ul>
            {courses.map((course, index) => (
              <li key={index} className="flex justify-between items-center border-b border-gray-300 py-2">
                <div>
                  <h4 className="font-medium">{course.title}</h4>
                  <p>{course.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default UserAdministration;
