import { FC, useEffect, useState } from "react";
import { User, Destination, Guide, Book } from "../interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import GridTable from "../components/Overview/GridTable";
import Container from "@mui/material/Container";
import Spinner from "../components/Spinner/Spinner";

const Overview: FC = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [destinations, setDestinations] = useState<Array<Destination>>([]);
  const [guides, setGuides] = useState<Array<Guide>>([]);
  const [bookings, setBookings] = useState<Array<Book>>([]);
  const [isFetching, setIsFetching] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const createData = (title: string, result: number) => {
    return { title, result };
  };

  const ticketRows = [
    createData(
      "Mengajukan menjadi pemandu",
      guides.filter((guide: Guide) => guide.approved === "pending").length
    ),
    createData(
      "Menyewa pemandu",
      bookings.filter((book) => book.booking_status === "pending").length
    ),
    createData(
      "Menyarankan informasi gunung",
      destinations.filter(
        (destination: Destination) => destination.approved === "pending"
      ).length
    ),
  ];

  const usersRow = [
    createData(
      "Umum",
      users.filter((user) => user.user_status === "umum").length
    ),
    createData(
      "Pemandu",
      users.filter((user) => user.user_status === "guide").length
    ),
  ];

  const paymentRows = [
    createData(
      "Konfirmasi bukti pembayaran",
      bookings.filter((book) => book.booking_status === "pending").length
    ),
    createData(
      "Selesai",
      bookings.filter((book) => book.booking_status === "accepted").length
    ),
  ];

  const InformationRows = [
    createData(
      "Gunung di pulau Jawa",
      destinations.filter(
        (destination) => destination.location.island === "jawa"
      ).length
    ),
    createData(
      "Gunung di pulau Kalimantan",
      destinations.filter(
        (destination) => destination.location.island === "kalimantan"
      ).length
    ),
    createData(
      "Gunung di pulau Papua",
      destinations.filter(
        (destination) => destination.location.island === "papua"
      ).length
    ),
    createData(
      "Gunung di pulau Sulawesi",
      destinations.filter(
        (destination) => destination.location.island === "sulawesi"
      ).length
    ),
    createData(
      "Gunung di pulau Sumatera",
      destinations.filter(
        (destination) => destination.location.island === "sumatera"
      ).length
    ),
  ];

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchTableData = async (): Promise<void> => {
      setIsFetching(true);

      try {
        const [Users, Destinations, Guides, Bookings] =
          await Promise.allSettled([
            axiosPrivate.get(`/api/v1/users`, {
              signal: controller.signal,
            }),
            await axiosPrivate.get(`/api/v1/destinations`, {
              signal: controller.signal,
            }),
            await axiosPrivate.get(`/api/v1/guides`, {
              signal: controller.signal,
            }),
            await axiosPrivate.get(`/api/v1/bookings`, {
              signal: controller.signal,
            }),
          ]);

        if (
          isMounted &&
          Users.status === "fulfilled" &&
          Guides.status === "fulfilled" &&
          Destinations.status === "fulfilled" &&
          Bookings.status === "fulfilled"
        ) {
          setUsers(Users.value.data.result.docs);
          setGuides(Guides.value.data.result.docs);
          setDestinations(Destinations.value.data.result.docs);
          setBookings(Bookings.value.data.result.docs);
          setIsFetching(false);
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          if (e.message === "canceled") {
            return;
          } else {
            console.error(e);
          }
        }
      }
    };

    fetchTableData();

    // ? cleanup function useEffect
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      {isFetching ? (
        <Box
          sx={{
            position: "relative",
            height: "92%",
          }}
        >
          <Spinner />
        </Box>
      ) : (
        <Container
          maxWidth="xl"
          sx={{
            mt: 5,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              p: 5,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <GridTable
                  navigateTo="/tickets"
                  title="Tickets"
                  rows={ticketRows}
                />
              </Grid>
              <Grid item xs={6}>
                <GridTable navigateTo="/users" title="Users" rows={usersRow} />
              </Grid>
              <Grid item xs={6}>
                <GridTable
                  navigateTo="/payments"
                  title="Payments"
                  rows={paymentRows}
                />
              </Grid>
              <Grid item xs={6}>
                <GridTable
                  navigateTo="/informations"
                  title="Informations"
                  rows={InformationRows}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Overview;

// const Overview: FC = () => {
//   const [soso, setSoso] = useState({});

//   const [xoxo, setXoxo] = useState({
//     content: {
//       rules: {
//         attention: {},
//       },
//     },
//   });

//   const { currentUser }: { currentUser: any } = useAppSelector(
//     (state) => state.user
//   );

//   // const koko = {
//   //   1: "dicky putra haruman adalah mahasiswa binus",
//   //   2: "hati hati bila ingin naik lift di binus kadang suka mati",
//   //   3: "jangan lupa jajan di basemen aja di lantai 9 suka gada tempat duduk",
//   // };

//   // Object.entries(koko).forEach((ele, index) => {
//   //   console.log(ele);
//   // });

//   // for (const [number, content] of Object.entries(koko)) {
//   //   // console.log(`No.${number} ${content}`);
//   // }

//   // console.log(xoxo.content.rules.attention);
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//   };

//   console.log(xoxo);

//   return (
//     <div style={{ marginTop: "100px" }}>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="1">1st input</label>
//         {/* <input
//           type="text"
//           name="1"
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//             setSoso((prev) => ({ ...prev, [e.target.name]: e.target.value }))
//           }
//         />

//         <input
//           type="text"
//           name="2"
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//             setSoso((prev) => ({ ...prev, [e.target.name]: e.target.value }))
//           }
//         />

//         <input
//           type="text"
//           name="3"
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//             setSoso((prev) => ({ ...prev, [e.target.name]: e.target.value }))
//           }
//         /> */}

//         <input
//           type="text"
//           name="1"
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//             setXoxo((prevState) => ({
//               ...prevState,
//               content: {
//                 ...prevState.content,
//                 rules: {
//                   ...prevState.content.rules,
//                   attention: {
//                     ...prevState.content.rules.attention,
//                     [e.target.name]: e.target.value,
//                   },
//                 },
//               },
//             }))
//           }
//         />
//         <label htmlFor="2">2nd input</label>
//         <input
//           type="text"
//           name="2"
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//             setXoxo((prevState) => ({
//               ...prevState,
//               content: {
//                 ...prevState.content,
//                 rules: {
//                   ...prevState.content.rules,
//                   attention: {
//                     ...prevState.content.rules.attention,
//                     [e.target.name]: e.target.value,
//                   },
//                 },
//               },
//             }))
//           }
//         />
//         <label htmlFor="3">3rd input</label>
//         <input
//           type="text"
//           name="3"
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//             setXoxo((prevState) => ({
//               ...prevState,
//               content: {
//                 ...prevState.content,
//                 rules: {
//                   ...prevState.content.rules,
//                   attention: {
//                     ...prevState.content.rules.attention,
//                     [e.target.name]: e.target.value,
//                   },
//                 },
//               },
//             }))
//           }
//         />

//         <button>Submit</button>
//       </form>
//     </div>
//   );
// };
