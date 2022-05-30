import React, { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Destination } from "../../interfaces";
import {
  editRulesContent,
  addRulesField,
  removeRulesField,
} from "../../redux/slice/destinationsSlice";

interface ComponentProps {
  dispatch: any;
  destination: Destination;
}

const EditRulesRow: FC<ComponentProps> = ({ dispatch, destination }) => {
  return (
    <>
      {Object.entries(destination.content.rules).map((e) => (
        <React.Fragment key={e[0]}>
          <Box>
            <Typography fontWeight="bold" variant="subtitle1">
              {e[0][0].toUpperCase() + e[0].slice(1)}
            </Typography>
            {Object.values(e[1]).map((point, i) => (
              <TextField
                key={point + i}
                margin="normal"
                id={e[0]}
                name={e[0]}
                label={`${e[0][0].toUpperCase() + e[0].slice(1)} ${i + 1}`}
                type="text"
                maxRows={5}
                defaultValue={point}
                onBlur={(e) =>
                  dispatch(
                    editRulesContent({
                      destination: destination,
                      key: i as unknown as string,
                      content: e.target.value,
                      field: e[0],
                    })
                  )
                }
                fullWidth
                multiline
                variant="outlined"
              />
            ))}
          </Box>
          <Box mt={2} mb={2}>
            <Button
              variant="contained"
              color="error"
              size="medium"
              sx={{ textTransform: "none", mr: 2, width: "10vw" }}
              onClick={() =>
                dispatch(
                  removeRulesField({
                    destination: destination,
                    field: e[0],
                  })
                )
              }
            >
              Remove
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              sx={{ textTransform: "none", mr: 2, width: "10vw" }}
              onClick={() =>
                dispatch(
                  addRulesField({
                    destination: destination,
                    field: e[0],
                  })
                )
              }
            >
              Add
            </Button>
          </Box>
        </React.Fragment>
      ))}
    </>
  );
};

export default EditRulesRow;
