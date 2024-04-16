import React from "react";
import { useState } from "react";
import { updateEvents, postEvents } from "../../api/eventApi";
import { useEvents } from "../../context/eventContext";
import { randomUUID } from "crypto";
type Event = {
  eventName: string;
  startDate: string;
  endDate: string;
  id: string;
};

const EditEvent = ({
  setOff,
  type,
  event,
}: {
  setOff: () => void;
  type: string;
  event?: Event;
}) => {
  const [name, setName] = useState(event?.eventName || "");
  const [startDate, setStartDate] = useState(event?.startDate || "");
  const [endDate, setEndDate] = useState(event?.endDate || "");
  const { handleAddEvent, handleEditEvent } = useEvents();
  const handleSave = () => {
    if (name.length === 0 || startDate === "" || endDate === "") {
      alert("Invalid data inputed!");
      return;
    }
    const startDateInput = new Date(startDate);
    const endDateInput = new Date(endDate);
    if (startDateInput > endDateInput) {
      alert("End date must be after start date!");
      return;
    }

    const newEvent: Event = {
      eventName: name,
      startDate: startDate,
      endDate: endDate,
      id: event ? event.id : randomUUID(),
    };

    if (type === "add") {
      handleAddEvent(newEvent);
    } else if (type === "edit") {
      handleEditEvent(newEvent);
    }

    setOff();
  };

  const handleCancel = () => {
    setOff();
  };

  return (
    <div className="event__item">
        <div>Edit Event</div>
      <input
        className="name_new"
        value={name}
        placeholder="Edit Input"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="date"
        className="event__start"
        id="start_new"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        className="event__end"
        id="end_new"
        value={endDate}
        role="input"
        onChange={(e) => setEndDate(e.target.value)}
      />
      <div className="event__actions">
        <button className="event__save-btn" onClick={handleSave} role="button">
          Save
        </button>
        <button className="event__cancel-btn" onClick={handleCancel}  role="button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditEvent;
