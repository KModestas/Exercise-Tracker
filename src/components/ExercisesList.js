import React, { useState, useEffect } from "react";
import axios from "axios";
import Exercise from "./Exercise";

export default () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then(res => {
        setExercises(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const deleteExercise = id => {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then(res => console.log(res.data));
    setExercises([...exercises.filter(exercise => exercise._id !== id)]);
  };

  return (
    <>
      <h3>All Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map(exercise => (
            <Exercise
              key={exercise._id}
              exercise={exercise}
              deleteExercise={deleteExercise}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
