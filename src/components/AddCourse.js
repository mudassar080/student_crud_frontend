import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/courses', { name, description })
      .then(() => navigate('/'))
      .catch(error => console.error('Error adding course:', error));
  };

  return (
    <div className="add-course-container">

    <form onSubmit={handleSubmit} className="add-course-form">
      <h2>Add Course</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button type="submit">Add</button>
    </form>
    </div>
  );
};

export default AddCourse;
