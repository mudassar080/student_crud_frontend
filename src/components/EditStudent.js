import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditStudent = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const { studentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      const result = await axios.get(`http://localhost:8000/students/${studentId}`);
      setName(result.data.name);
      setAge(result.data.age);
    };
    fetchStudent();
  }, [studentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/students/${studentId}`, { name, age });
    navigate('/');
  };

  return (
    <div className="edit-student-container">
    <form onSubmit={handleSubmit} className="edit-student-form">
      <label>
      <h2>Edit Student</h2>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Age:
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>
      <button type="submit">Update</button>
    </form>
    </div>
  );
};

export default EditStudent;
