import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => transition(CREATE);
  const onCancel = () => back();
  const onDelete = () => transition(CONFIRM);

  //save() is passed to Form as props and will be the event handler for onClick on the Save/Confirm button
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    //id in bookInterview() refers to appointment id
    props.bookInterview(props.id, interview);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={onCancel}
        />
      )}
    </article>
  );
}
