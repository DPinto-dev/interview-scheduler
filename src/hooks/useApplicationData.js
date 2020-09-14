import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  // OUR ACTION TYPES:
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          ...action.payload
        };
      case SET_INTERVIEW:
        return {
          ...state,
          ...action.payload
        };
      default:
        throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
    }
  }

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL || "ws://localhost:8001");
    webSocket.onopen = () => webSocket.send("Pinnnnnnnng");
    webSocket.onmessage = function (event) {
      console.log("Message Received: ", event.data);
    };

    Promise.all([axios.get(`/api/days`), axios.get(`/api/appointments`), axios.get(`/api/interviewers`)]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        payload: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }
      });
    });
  }, []);

  function updateSpots(dayName, operation) {
    const modifiedDays = [...state.days];

    // Implicitly, if operation === "EDIT" spots are not updated
    modifiedDays.forEach(day => {
      if (day.name === dayName) {
        if (operation === "CREATE") {
          day.spots = day.spots - 1;
        } else if (operation === "CANCEL") {
          day.spots = day.spots + 1;
        }
      }
    });
    return modifiedDays;
  }

  function bookInterview(id, interview, operation) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const modifiedDays = updateSpots(state.day, operation);
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        payload: { appointments, days: modifiedDays }
      });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const modifiedDays = updateSpots(state.day, "CANCEL");
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        payload: { appointments, days: modifiedDays }
      });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
