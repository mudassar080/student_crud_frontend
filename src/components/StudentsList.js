import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const result = await axios.get("http://localhost:8000/students/");
      setStudents(result.data);
    };
    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:8000/students/${id}`);
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="student-list-container">
      <h2>Students</h2>
      <Link to="/add-student" className="add-student-link">
        Add Student
      </Link>
      <table className="student-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>
                <Link to={`/edit-student/${student.id}`}>Edit</Link>
                <button onClick={() => deleteStudent(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
