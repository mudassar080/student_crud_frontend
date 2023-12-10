import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CourseStudents = () => {
  const [students, setStudents] = useState([]);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/courses/${courseId}/students`);
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
        // Implement error handling as needed
      }
    };

    fetchStudents();
  }, [courseId]);

  return (
    <div>
      <h2>Students in Course</h2>
      {students.length > 0 ? (
        <ul>
          {students.map(student => (
            <li key={student.id}>
              {student.name} - Age: {student.age}
            </li>
          ))}
        </ul>
      ) : (
        <p>No students found for this course.</p>
      )}
    </div>
  );
};

export default CourseStudents;
