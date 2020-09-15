export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

//Move to a helper file
function updateSpots(state, dayName, operation) {
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

export function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        ...action.payload
      };
    case SET_INTERVIEW:
      const { id, interview, operation } = action.payload;

      const modifiedDays = updateSpots(state, state.day, operation);
      const modifiedInterview = operation === "CREATE" ? { ...interview } : null;

      const appointment = {
        ...state.appointments[id],
        interview: modifiedInterview
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      return {
        ...state,
        days: modifiedDays,
        appointments
      };
    default:
      throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
  }
}
