import { useEffect, useState } from "react";
import "./styles.css";
import EditEvent from "./components/EditEvent";
import Event from "./components/Event";
import { useEvents } from "./context/eventContext";
export default function App() {
  const [newEvents, setNewEvents] = useState<number[]>([]);
  const { events } = useEvents();
  return (
    <div className="App">
      <button
        className="event-new-button"
        onClick={() => {
          setNewEvents((pre) => [
            ...pre,
            pre.length === 0 ? 0 : pre[pre.length - 1] + 1,
          ]);
        }}
      >
        Add New Event
      </button>
      <div className="outer">
        <thead className="title">
          <tr>
            <th>Event Name</th>
            <th>Start</th>
            <th>End</th>
            <th>Actions</th>
          </tr>
        </thead>
        <div className="event-list">
          {events.map((event: Event) => (
            <Event event={event} key={event.id} />
          ))}
          {newEvents.map((addEventId: number) => (
            <EditEvent
              key={addEventId}
              setOff={() => {
                setNewEvents((pre) => pre.filter((id) => id !== addEventId));
              }}
              type="add"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
