import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default props => {
  const [state, setState] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: []
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/" + props.match.params.id)
      .then(res => {
        setState({
          ...state,
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date)
        });
      })
      .catch(error => console.log(error));

    axios
      .get("http://localhost:5000/users/")
      .then(res => {
        if (res.data.length > 0) {
          setState({
            ...state,
            users: res.data.map(user => user.username)
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
      .put(
        "http://localhost:5000/exercises/update" + props.match.params.id,
        exercise
      )
      .then(res => console.log(res.data));
  };

  return (
    <div>
      <h3>Edit Exercise</h3>
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
            value="Edit Exercise"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
