import { render, screen } from "@testing-library/react";
import EditEvent from "../components/EditEvent";
import userEvent from "@testing-library/user-event";

describe("EditEvent",  () => {
  test("buttons should mount correctly", async () => {
    // https://testing-library.com/docs/queries/about/
    const user = userEvent.setup();
    const demo = {
        eventName:'event1',
        startDate: "2024-03-16",
        endDate: "2024-03-17",
        id: "123",
    }
    const setOff = jest.fn();
    const { getByRole } = render(<EditEvent event={demo} type="add" setOff={setOff}/>);

     const save_button = getByRole("button",{name:/Save/i});
     const cancel_button = getByRole("button",{name:/Cancel/i});
    
    expect(save_button).toBeInTheDocument();
    expect(cancel_button).toBeInTheDocument();
  });


  test("set off should run correctly", async () => {
    // https://testing-library.com/docs/queries/about/
    const user = userEvent.setup();
    const demo = {
        eventName:'event2',
        startDate: "2024-03-16",
        endDate: "2024-03-17",
        id: "123",
    }
    const setOff = jest.fn();
    const { getByRole } = render(<EditEvent event={demo} type="add" setOff={setOff}/>);

     const save_button = getByRole("button",{name:/Save/i});
     const cancel_button = getByRole("button",{name:/Cancel/i});
    
     await user.click(save_button);
     await user.click(cancel_button);
     await user.click(cancel_button);

     expect(setOff).toHaveBeenCalledTimes(3);
  });

  test("edit input should exist", async () => {
    // https://testing-library.com/docs/queries/about/
    const demo = {
        eventName:'event3',
        startDate: "2024-03-16",
        endDate: "2024-03-17",
        id: "123",
    }
    const setOff = jest.fn();
    const { getByPlaceholderText } = render(<EditEvent event={demo} type="add" setOff={setOff}/>);

    const edit_input = getByPlaceholderText("Edit Input");
    
    expect(edit_input).toBeInTheDocument();
  });

  test("text should render correctly", async () => {
    // https://testing-library.com/docs/queries/about/
    const demo = {
        eventName:'event3',
        startDate: "2024-03-16",
        endDate: "2024-03-17",
        id: "123",
    }
     const setOff = jest.fn();
     const { getByText } = render(<EditEvent event={demo} type="add" setOff={setOff}/>);
     const text = getByText(/Edit Event/);

    expect(text).toBeInTheDocument();
  });
});
