function selectUserByName(state, name) {
  const filteredNames = state.users.filter((user) => user.name === name);
  return filteredNames;
}

export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  } else {
    let appointmentKeys = [];
    const appointmentsForDay = [];

    //Retrieves the array of appointments for that day
    for (const dayObj of state.days) {
      if (dayObj.name === day) {
        appointmentKeys = dayObj.appointments;
        break;
      }
    }

    //Uses the ids of appointmentKeys to retrieve appointment data
    if (appointmentKeys.length === 0) {
      return [];
    } else {
      for (const key of appointmentKeys) {
        if (key === state.appointments[key].id) {
          appointmentsForDay.push(state.appointments[key]);
        }
      }
      return appointmentsForDay;
    }
  }
}

export function getInterview(state, interview) {
  if (interview) {
    const student = interview.student;
    const interviewerId = interview.interviewer;

    return {
      student: student,
      interviewer: {
        id: interviewerId,
        name: state.interviewers[interviewerId].name,
        avatar: state.interviewers[interviewerId].avatar,
      },
    };
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  } else {
    let interviewerKeys = [];
    const interviewersForDay = [];

    //Retrieves the array of interviewers for that day
    for (const dayObj of state.days) {
      if (dayObj.name === day) {
        interviewerKeys = dayObj.interviewers;
        break;
      }
    }

    //Uses the ids of interviewerKeys to retrieve appointment data
    if (interviewerKeys.length === 0) {
      return [];
    } else {
      for (const key of interviewerKeys) {
        if (key === state.interviewers[key].id) {
          interviewersForDay.push(state.interviewers[key]);
        }
      }
      return interviewersForDay;
    }
  }
}
