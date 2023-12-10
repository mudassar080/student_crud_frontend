import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddResult = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [grade, setGrade] = useState("");
  const [semester, setSemester] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentsAndCourses = async () => {
      try {
        const studentsRes = await axios.get("http://localhost:8000/students");
        const coursesRes = await axios.get("http://localhost:8000/courses");
        setStudents(studentsRes.data);
        setCourses(coursesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentsAndCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/results", {
        StudentId: selectedStudentId,
        CourseId: selectedCourseId,
        grade,
        semester,
      });
      navigate("/results");
    } catch (error) {
      console.error("Error adding result:", error);
    }
  };

  return (
    <div className="add-result-container">
      <form onSubmit={handleSubmit} className="add-result-form">
        <h2>Add Result</h2>
        <label>
          Student:
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Course:
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Grade:
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </label>
        <label>
          Semester:
          <input
            type="text"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
        </label>
        <button type="submit">Add Result</button>
      </form>
    </div>
  );
};

export default AddResult;
