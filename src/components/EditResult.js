import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditResult = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [grade, setGrade] = useState("");
  const [semester, setSemester] = useState("");
  const { resultId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentsAndCourses = async () => {
      try {
        const [studentsRes, coursesRes, resultRes] = await Promise.all([
          axios.get("http://localhost:3000/students"),
          axios.get("http://localhost:3000/courses"),
          axios.get(`http://localhost:3000/results/${resultId}`),
        ]);
        setStudents(studentsRes.data);
        setCourses(coursesRes.data);
        const { StudentId, CourseId, grade, semester } = resultRes.data;
        setSelectedStudentId(StudentId);
        setSelectedCourseId(CourseId);
        setGrade(grade);
        setSemester(semester);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentsAndCourses();
  }, [resultId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/results/${resultId}`, {
        StudentId: selectedStudentId,
        CourseId: selectedCourseId,
        grade,
        semester,
      });
      navigate("/results");
    } catch (error) {
      console.error("Error updating result:", error);
    }
  };

  return (
    <div className="edit-result-container">
      <form onSubmit={handleSubmit} className="edit-result-form">
      <h2>Edit Result</h2>
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

export default EditResult;
