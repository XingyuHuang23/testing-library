import { render, screen } from "@testing-library/react";
import Event from "../components/Event";
import userEvent from "@testing-library/user-event";

describe("Event", () => {
  test("should render correctly", () => {
    // https://testing-library.com/docs/queries/about/

    //difference between queries returned by render and screen
    const demo = {
        eventName:'event1',
        startDate: "2024-03-16",
        endDate: "2024-03-17",
        id: "123",
    }
    const { getByRole } = render(<Event event={demo}/>);

    const button = getByRole("button",{name:/Delete/i});
    expect(button).toBeInTheDocument();
  });

});
