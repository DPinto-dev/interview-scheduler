import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  let isFull = props.spots === 0;
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": isFull,
  });

  const formatSpots = () => {
    if (props.spots === 0) return "no spots remaining";
    if (props.spots === 1) return "1 spot remaining";
    else return `${props.spots} spots remaining`;
  };

  return (
    <li
      className={dayClass}
      data-testid="day"
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
