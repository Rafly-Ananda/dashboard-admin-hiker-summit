import InformationsTable from "../InformationsTable";
const InformationsHome = () => {
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
