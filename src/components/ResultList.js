import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ResultList = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/results")
      .then((response) => setResults(response.data))
      .catch((error) => console.error("Error fetching results:", error));
  }, []);

  const deleteResult = (id) => {
    axios
      .delete(`http://localhost:8000/results/${id}`)
      .then(() => setResults(results.filter((result) => result.id !== id)))
      .catch((error) => console.error("Error deleting result:", error));
  };

  return (
    <div className="result-list-container">
      <h2>Results</h2>
      <Link to="/add-result" className="add-result-link">
        Add Result
      </Link>
      <table className="result-list-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Course ID</th>
            <th>Grade</th>
            <th>Semester</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.StudentId}</td>
              <td>{result.CourseId}</td>
              <td>{result.grade}</td>
              <td>{result.semester}</td>
              <td>
                <Link to={`/edit-result/${result.id}`}>Edit</Link>
                <button onClick={() => deleteResult(result.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultList;
