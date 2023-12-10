import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const { studentId } = useParams();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/students/${studentId}/courses`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Handle errors here, e.g., showing a notification to the user
      }
    };

    fetchCourses();
  }, [studentId]);

  return (
    <div>
      <h2>Student Courses</h2>
      {courses.length > 0 ? (
        <ul>
          {courses.map(course => (
            <li key={course.id}>
              {course.name} - {course.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses found for this student.</p>
      )}
    </div>
  );
};

export default StudentCourses;
