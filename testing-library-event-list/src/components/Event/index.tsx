import { useState } from "react";
import EditEvent from "../EditEvent";
import React from "react";
import { useEvents } from "../../context/eventContext";
type Event = {
  eventName: string;
  startDate: string;
  endDate: string;
  id: string;
};
const Event = ({ event }: { event: Event }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { id, eventName, startDate, endDate } = event;
  const { handleDeleteEvent } = useEvents();

  return (
    <>
      {isEditing ? (
        <EditEvent
          type="edit"
          event={event}
          setOff={() => setIsEditing(false)}
        />
      ) : (
        <div className="event__item" key={id}>
          <div className="event__name">{eventName}</div>
          <p className="event__start">{startDate}</p>
          <p className="event__end">{endDate}</p>
          <div className="event__actions">
            <button
              className="event__del-btn"
              onClick={() => handleDeleteEvent(id)}
              role="button"
            >
              Delete
            </button>
            <button
              className="event__edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Event;
