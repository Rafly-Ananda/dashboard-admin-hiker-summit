import { FC, useState, useEffect } from "react";
import MainTable from "../components/Tickets/MainTable";
import TicketDetail from "../components/Tickets/TicketDetail";
import { axiosPublic } from "../api/axiosInstance";
import { useAppSelector } from "../hooks/reduxHooks";
import { Destination, Guide, TicketsInterface } from "../interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Spinner from "../components/Spinner/Spinner";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Tickets: FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const [tickets, setTickets] = useState<Array<TicketsInterface>>([]);
  const { users } = useAppSelector((state) => state.users);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isfetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setIsFetching(true);
    const controller = new AbortController();

    (async () => {
      try {
        const {
          data: {
            result: { docs: guideDocs },
          },
        } = await axiosPublic.get("/api/v1/guides");
        const {
          data: {
            result: { docs: destinationsDocs },
          },
        } = await axiosPublic.get("/api/v1/destinations");
        const {
          data: {
            result: { docs: TicketDocs },
          },
        } = await axiosPrivate.get("/api/v1/tickets");

        isMounted &&
          setTickets(() => [
            ...guideDocs.filter((guide: Guide) => guide.approved === "pending"),
            ...destinationsDocs?.filter(
              (destination: Destination) => destination.approved === "pending"
            ),
            ...TicketDocs,
          ]);
        setIsFetching(false);
      } catch (e) {
        console.warn(e);
      }
    })();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const foo = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const sum = foo.reduce((a, b) => a + b);
    console.log(sum);
  }, []);

  return (
    <>
      {isfetching ? (
        <Box
          sx={{
            position: "relative",
            height: "92%",
          }}
        >
          <Spinner />
        </Box>
      ) : (
        <>
          {tickets.length < 1 ? (
            <Container
              maxWidth="xl"
              sx={{
                mt: 5,
                p: 5,
              }}
            >
              <Box
                height="40vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow={3}
                borderRadius={3}
                sx={{ backgroundColor: "#ffffff" }}
              >
                <Typography variant="h5" fontWeight={700}>
                  No Tickets Available
                </Typography>
              </Box>
            </Container>
          ) : (
            <>
              {users && tickets && openModal && (
                <TicketDetail
                  users={users}
                  tickets={tickets}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  setTickets={setTickets}
                />
              )}
              {users && tickets && (
                <MainTable
                  tickets={tickets}
                  users={users}
                  setOpenModal={setOpenModal}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Tickets;

// const [address, setAddress] = useState({
//   location: {
//     track: [],
//   },
// });

// const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   console.log("clicked");
//   // setAddress((prev) => ({
//   //   ...prev,
//   //   location: { ...prev.location, track: Object.values(xoxo) },
//   // }));
// };

{
  /* <form
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
      </form> */
}
