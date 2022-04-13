import { FC } from "react";
import { DestinationProps } from "../interfaces";

const DestinationCard: FC<DestinationProps> = (props) => {
  return (
    <div>
      <p>{props.destination._id}</p>
      <p>{props.destination.approved ? "approved" : "not approved"}</p>
      <p>{props.destination.title}</p>
      {props.destination.content.image_galery.map((src) => {
        return (
          <img
            key={src}
            src={"http://localhost:5000/api/v1/pictures/" + src}
            alt={src}
          />
        );
      })}
    </div>
  );
};

export default DestinationCard;
