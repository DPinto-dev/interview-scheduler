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

  function updateSpots(dayName, operation) {
    const modifiedDays = [...state.days];

    //maybe we could try to use forEach to modify array with new spots number directly???
    let currentSpots = modifiedDays.filter((day) => day.name === dayName)[0]
      .spots;
    let newSpots;

    operation === "bookAppt"
      ? (newSpots = currentSpots - 1)
      : (newSpots = currentSpots + 1) /* cancelAppt */;

    for (const day of modifiedDays) {
      if (day.name === dayName) {
        day.spots = newSpots;
      }
    }

    return modifiedDays;
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
    const modifiedDays = updateSpots(state.day, "bookAppt");
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => setState({ ...state, appointments, days: modifiedDays }));
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
    const modifiedDays = updateSpots(state.day, "cancelAppt");
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days: modifiedDays }));
  }

  return { state, setDay, bookInterview, cancelInterview };
}
