import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/courses")
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const deleteCourse = (id) => {
    axios
      .delete(`http://localhost:8000/courses/${id}`)
      .then(() => setCourses(courses.filter((course) => course.id !== id)))
      .catch((error) => console.error("Error deleting course:", error));
  };

  return (
    <div className="course-list-container">
      <h2>Courses</h2>
      <Link to="/add-course" className="add-course-link">
        Add Course
      </Link>
      <table className="course-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>
                <Link to={`/edit-course/${course.id}`}>Edit</Link>
                <button onClick={() => deleteCourse(course.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
