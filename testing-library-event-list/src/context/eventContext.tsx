import {
    createContext,
    useContext,
    useReducer,
    useState,
    useEffect,
  } from "react";
  import {
    getEvents,
    updateEvents,
    deleteEvents,
    postEvents,
  } from "../api/eventApi";
  
  type Event = {
    eventName: string;
    startDate: string;
    endDate: string;
    id: string;
  };
  
  const EventsContext = createContext({
    events: [],
    handleDeleteEvent: (id: string) => {},
    handleAddEvent: (newEvent: Event) => {},
    handleEditEvent: (newEvent: Event) => {},
  });
  
  const eventsReducer = (events:Event[] = [], action:any) => {
    const { type, payload } = action;
    switch (type) {
      case "DELETE_EVENT":
        return events.filter((_event) => _event.id !== payload);
      case "ADD_EVENT":
        return [...events, payload];
      case "SET_EVENTS":
        return payload;
      case "UPDATE_EVENTS":
        return events.map((event: Event) =>
          event.id === payload.id ? payload : event
        );
    }
  };
  
  export default function EventsProvider({ children }:{ children: React.ReactNode }) {
    const [events, dispatchEvents] = useReducer(eventsReducer, []);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const events = await getEvents();
  
          dispatchEvents({ type: "SET_EVENTS", payload: events });
        } catch (e) {
          alert(e);
        }
      };
      fetchData();
    }, []);
    const handleDeleteEvent = async (id: string) => {
      try {
        const res = await deleteEvents({ event_id: id });
        //it should be if(res.ok) to validate, but the remote json server can only allow fake action...
        //so if we use res.ok, and try to operate new element, that will make error.
        if (res !== null) dispatchEvents({ type: "DELETE_EVENT", payload: id });
      } catch (e) {}
    };
  
    const handleEditEvent = async (newEvent: Event) => {
      const res = await updateEvents(newEvent);
      if (res !== null)
        dispatchEvents({ type: "UPDATE_EVENTS", payload: newEvent });
    };
  
    const handleAddEvent = async (newEvent: Event) => {
      const res = await postEvents(newEvent);
      if (res !== null) dispatchEvents({ type: "ADD_EVENT", payload: newEvent });
    };
  
    return (
      <EventsContext.Provider
        value={{
          events,
          handleDeleteEvent,
          handleAddEvent,
          handleEditEvent,
        }}
      >
        {children}
      </EventsContext.Provider>
    );
  }
  
  export function useEvents() {
    return useContext(EventsContext);
  }
  