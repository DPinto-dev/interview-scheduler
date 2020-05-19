import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //To solve the UPDATE SPOTS problem we'll probably need to spread the days, change the spots and make a put req to the API
  function updateSpots(id, operation) {
    if (operation === "add") {
      const spot = state.days.spots;
      const addSpot = {
        ...state.days[id],
        spots: spot + 1,
      };
      return axios.put(`/api/days/${id}`, addSpot);
    }

    if (operation === "remove") {
      const spot = state.days.spots;
      const removeSpot = {
        ...state.days[id],
        spots: spot - 1,
      };
      return axios.put(`/api/days/${id}`, removeSpot);
    }
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    updateSpots(id, "add").then(() => setState({ ...state }));
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => setState({ ...state, appointments }));
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments }));
  }

  return { state, setDay, bookInterview, cancelInterview };
}
