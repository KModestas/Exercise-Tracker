import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateExercise = props => {
  const [state, setState] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: []
  });

  // remember we specificed 5000 as the port in the backend

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/")
      .then(res => {
        if (res.data.length) {
          setState({
            ...state,
            users: res.data.map(user => user.username),
            username: res.data[0].username
          });
        }
      })
      .catch(error => console.log(error));
  }, []);

  const onChangeUsername = e => {
    setState({
      ...state,
      username: e.target.value
    });
  };

  const onChangeDescription = e => {
    setState({
      ...state,
      description: e.target.value
    });
  };

  const onChangeDuration = e => {
    setState({
      ...state,
      duration: e.target.value
    });
  };

  const onChangeDate = date => {
    setState({
      ...state,
      date
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    const exercise = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: state.date
    };

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then(res => console.log(res.data), props.history.push("/"));
  };

  return (
    <div>
      <h3>Create New Exercise</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={state.username}
            onChange={onChangeUsername}
          >
            {state.users.map(user => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={state.description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={state.duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={state.date} onChange={onChangeDate} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default withRouter(CreateExercise);
