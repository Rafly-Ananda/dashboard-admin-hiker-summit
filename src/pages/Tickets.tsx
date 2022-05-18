import { useState } from "react";

const Tickets = () => {
  const [address, setAddress] = useState({
    location: {
      track: [],
    },
  });

  const [xoxo, setXoxo] = useState({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("clicked");
    setAddress((prev) => ({
      ...prev,
      location: { ...prev.location, track: Object.values(xoxo) },
    }));
  };

  return (
    <div
      style={{
        marginTop: "50px",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column", maxWidth: "40%" }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="track_name">track_name</label>
        <input
          type="text"
          name="track_name"
          id="0"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setXoxo((prev) => ({
              ...prev,
              [e.target.id]: {
                ...prev[Object.keys(e.target.id)],
                [e.target.name]: e.target.value,
              },
            }))
          }
        />

        <label htmlFor="basecamp_name">basecamp_name</label>
        <input
          type="text"
          name="basecamp_name"
          id="0"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setXoxo((prev) => ({
              ...prev,
              [e.target.id]: {
                ...prev[Object.keys(e.target.id)],
                [e.target.name]: e.target.value,
              },
            }))
          }
        />

        <label htmlFor="road_name">road_name</label>
        <input
          type="text"
          name="road_name"
          id="0"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setXoxo((prev) => ({
              ...prev,
              [e.target.id]: {
                ...prev[Object.keys(e.target.id)],
                [e.target.name]: e.target.value,
              },
            }))
          }
        />

        <label htmlFor="district">district</label>
        <input
          type="text"
          name="district"
          id="0"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setXoxo((prev) => ({
              ...prev,
              [e.target.id]: {
                ...prev[Object.keys(e.target.id)],
                [e.target.name]: e.target.value,
              },
            }))
          }
        />

        <label htmlFor="ward">ward</label>
        <input
          type="text"
          name="ward"
          id="0"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setXoxo((prev) => ({
              ...prev,
              [e.target.id]: {
                ...prev[Object.keys(e.target.id)],
                [e.target.name]: e.target.value,
              },
            }))
          }
        />

        <label htmlFor="village">village</label>
        <input
          type="text"
          name="village"
          id="0"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setXoxo((prev) => ({
              ...prev,
              [e.target.id]: {
                ...prev[Object.keys(e.target.id)],
                [e.target.name]: e.target.value,
              },
            }))
          }
        />

        <label htmlFor="postal_code">postal_code</label>
        <input
          type="number"
          name="postal_code"
          id="0"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setXoxo((prev) => ({
              ...prev,
              [e.target.id]: {
                ...prev[Object.keys(e.target.id)],
                [e.target.name]: e.target.value,
              },
            }))
          }
        />

        <h1>-----------------------------------------</h1>

        <label htmlFor="track_name">track_name</label>
        <input
          type="text"
          name="track_name"
          id="1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setXoxo((prev) => ({
              ...prev,
              [e.target.id]: {
                ...prev[Object.keys(e.target.id)],
                [e.target.name]: e.target.value,
              },
            }))
          }
        />

        <label htmlFor="basecamp_name">basecamp_name</label>
        <input
          type="text"
          name="basecamp_name"
          id="1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setXoxo((prev) => ({
              ...prev,
              [e.target.id]: {
                ...prev[Object.keys(e.target.id)],
                [e.target.name]: e.target.value,
              },
            }))
          }
        />

        <label htmlFor="road_name">road_name</label>
        <input
          type="text"
          name="road_name"
          id="1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setXoxo((prev) => ({
              ...prev,
              [e.target.id]: {
                ...prev[Object.keys(e.target.id)],
                [e.target.name]: e.target.value,
              },
            }))
          }
        />

        <label htmlFor="district">district</label>
        <input
          type="text"
          name="district"
          id="1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setXoxo((prev) => ({
              ...prev,
              [e.target.id]: {
                ...prev[Object.keys(e.target.id)],
                [e.target.name]: e.target.value,
              },
            }))
          }
        />

        <label htmlFor="ward">ward</label>
        <input
          type="text"
          name="ward"
          id="1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setXoxo((prev) => ({
              ...prev,
              [e.target.id]: {
                ...prev[Object.keys(e.target.id)],
                [e.target.name]: e.target.value,
              },
            }))
          }
        />

        <label htmlFor="village">village</label>
        <input
          type="text"
          name="village"
          id="1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setXoxo((prev) => ({
              ...prev,
              [e.target.id]: {
                ...prev[Object.keys(e.target.id)],
                [e.target.name]: e.target.value,
              },
            }))
          }
        />

        <label htmlFor="postal_code">postal_code</label>
        <input
          type="number"
          name="postal_code"
          id="1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setXoxo((prev) => ({
              ...prev,
              [e.target.id]: {
                ...prev[Object.keys(e.target.id)],
                [e.target.name]: e.target.value,
              },
            }))
          }
        />

        <button style={{ maxWidth: "20%", marginTop: "20px" }}>submit</button>
      </form>
    </div>
  );
};

export default Tickets;
