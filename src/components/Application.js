import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Diogo Pinto",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      },
    },
  },
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8001/api/days`).then((res) => {
      setDays(res.data);
      console.log(res.data);
    });
  }, []);

  console.log("From Application.js", day);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* 
        We could pass these props one by one, and when we do, we might notice a pattern. Our object keys match the prop names.
        <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={appointment.interview} />
        Instead we can spread each appointment inside the map with {...appointment}
        */}
        {appointments.map((appointment) => {
          return <Appointment key={appointment.id} {...appointment} />;
        })}
        <Appointment key="last" time="6pm" />
      </section>
    </main>
  );
}
