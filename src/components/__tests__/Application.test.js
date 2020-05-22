import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  queryByText,
  queryByAltText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  getByTestId,
} from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];

    /* user clicks the add button */
    fireEvent.click(getByAltText(appointment, "Add"));

    /* user enters a student name */
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {
        value: "Lydia Miller-Jones",
      },
    });

    /* user clicks the first interviewer on the list */
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    /* user clicks the save button */
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    /* save operation completes and displays student's name */
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    /* selects Monday and asserts the reduction in spots */
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Selects the appointment to be deleted
    const appointment = getAllByTestId(container, "appointment").find((appt) =>
      queryByText(appt, "Archie Cohen")
    );

    // 4. Clicks on the trash can button
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 5. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    // 6. Clicks the "Confirm" button
    fireEvent.click(getByText(appointment, "Confirm"));

    // 7. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

    // 8. Wait until the "Add" button is displayed for that appointment
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 9. Check that the spots for the DayListItem with text "Monday" have increased by 1.
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, edits an interview and does not affect the spots remaining", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find((appt) =>
      queryByText(appt, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));

    expect(getByText(appointment, "Save")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Diogo Pinto" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Diogo Pinto"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    axios.put.mockRejectedValueOnce();

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    await waitForElement(() =>
      getByText(appointment, "Could not save appointment.")
    );
  });

  it("shows the delete error when failing to delete an appointment", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    axios.delete.mockRejectedValueOnce();

    const appointment = getAllByTestId(container, "appointment").find((appt) =>
      queryByText(appt, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    fireEvent.click(queryByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
    await waitForElement(() =>
      getByText(appointment, "Could not cancel appointment.")
    );
  });
});
