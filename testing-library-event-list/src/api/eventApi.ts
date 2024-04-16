const baseURL =
  "https://my-json-server.typicode.com/XingyuHuang23/fake_db/events";
type Event = {
  eventName: string;
  startDate: string;
  endDate: string;
  id: string;
};
const getEvents = async () => {
  try {
    const response = await fetch(baseURL, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
const postEvents = async (event: Event) => {
  try {
    const response = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error("Failed to post data");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
const deleteEvents = async (datas: { event_id: string }) => {
  try {
    const response = await fetch(baseURL + `/${datas.event_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return response;
  } catch (error) {
    console.error("Error delete event:", error);
    throw error;
  }
};

const updateEvents = async (event: Event) => {
  try {
    const response = await fetch(baseURL + `/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    const data = await response.json();
    console.log(data);
    return response;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export { getEvents, updateEvents, deleteEvents, postEvents };
