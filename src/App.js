import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import StudentList from "./components/StudentsList";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";
import StudentCourses from "./components/StudentCourses";
import CourseList from "./components/CourseList";
import AddCourse from "./components/AddCourse";
import EditCourse from "./components/EditCourse";
import CourseStudents from "./components/CourseStudents";
import AddResult from "./components/AddResult";
import EditResult from "./components/EditResult";
import ResultList from "./components/ResultList";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/results">Results</Link>
        </nav>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/edit-student/:studentId" element={<EditStudent />} />
            <Route
              path="/student/:studentId/courses"
              element={<StudentCourses />}
            />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/edit-course/:courseId" element={<EditCourse />} />
            <Route
              path="/course/:courseId/students"
              element={<CourseStudents />}
            />{" "}
            <Route path="/results" element={<ResultList />} />
            <Route path="/add-result" element={<AddResult />} />
            <Route path="/edit-result/:resultId" element={<EditResult />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
