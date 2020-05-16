function selectUserByName(state, name) {
  const filteredNames = state.users.filter((user) => user.name === name);
  return filteredNames;
}

export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  } else {
    let appointmentsArr,
      appointments = [];

    for (const appDay of state.days) {
      if (appDay.name === day) {
        appointmentsArr = appDay.appointments;
        break;
      } else {
        appointmentsArr = [];
      }
    }

    if (appointmentsArr.length === 0) {
      return [];
    } else {
      for (const appointment of appointmentsArr) {
        if (appointment === state.appointments[appointment].id) {
          appointments.push(state.appointments[appointment]);
        }
      }
      return appointments;
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
