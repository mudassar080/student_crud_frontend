import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCourse = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/courses/${courseId}`)
      .then(response => {
        setName(response.data.name);
        setDescription(response.data.description);
      })
      .catch(error => console.error('Error fetching course:', error));
  }, [courseId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/courses/${courseId}`, { name, description })
      .then(() => navigate('/'))
      .catch(error => console.error('Error updating course:', error));
  };

  return (
    <div className="edit-course-container">
    <form onSubmit={handleSubmit} className="edit-course-form">
      <h2>Edit Course</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button type="submit">Update</button>
    </form>
    </div>
  );
};

export default EditCourse;
