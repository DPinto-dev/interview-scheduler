import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { cleanup } from "@testing-library/react";
import { reducer, SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, CANCEL_INTERVIEW } from "./useApplicationData-SpotsReducer";

export default function useApplicationData() {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const setDay = day => dispatch({ type: SET_DAY, day });

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
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        payload: { id, interview, operation: "CREATE" }
      });
    });
  }

  function cancelInterview(id) {
    const modifiedDays = updateSpots(state.day, "CANCEL");
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        payload: { id, interview: null, operation: "CANCEL" }
      });
    });
  }

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL || "ws://localhost:8001");
    webSocket.onopen = () => webSocket.send("ping");

    webSocket.onmessage = function (message) {
      console.log("Message Received: ", message.data);
      const { type, id, interview } = JSON.parse(message.data);

      if (type === "SET_INTERVIEW") {
        // bookInterview(id, interview);
        console.log("Asking to set");
        dispatch({ type, payload: { id, interview: interview || null } });
      }
    };

    // return function cleanup() {
    //   webSocket.close();
    // };
  });

  useEffect(() => {
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

  return { state, setDay, bookInterview, cancelInterview };
}
