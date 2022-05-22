import InformationsTable from "./InformationsTable";
import { useAppSelector } from "../../hooks/reduxHooks";
const InformationsHome = () => {
  // ! PLACEHOLDER, because if destination in that island does not exist it will not render the table
  const islands = [
    "jawa",
    "sulawesi",
    "sumatera",
    "kalimantan",
    "papua",
    "lainnya",
  ];
  return (
    <>
      {islands.map((island) => (
        <InformationsTable key={island} tableTitle={island} />
      ))}
    </>
  );
};

export default InformationsHome;
