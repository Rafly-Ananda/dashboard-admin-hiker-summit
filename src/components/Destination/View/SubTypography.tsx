import { FC } from "react";
import Typography from "@mui/material/Typography";

interface ComponentProps {
  title: string;
  content: string;
}

const SubTypography: FC<ComponentProps> = ({ title, content }) => {
  return (
    <Typography variant="subtitle2" fontWeight="medium">
      {title} :{" " + content[0].toUpperCase() + content.slice(1)}
    </Typography>
  );
};

export default SubTypography;
