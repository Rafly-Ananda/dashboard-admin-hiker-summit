import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import DestinationCard from "../components/Destination/DestinationCard";
import { axiosPrivate } from "../api/axiosInstance";

const Informations: FC = () => {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [imgSrc, setImgSrc] = useState<string[]>([]);

  const fetchDestination = async () => {
    const response = await axiosPrivate("/api/v1/destinations");
    setDestinations(response.data.result.docs);
    response.data.result.docs[0].content.image_assets.assets_key.forEach(
      (img: any) =>
        setImgSrc((prev) => [
          ...prev,
          `http://localhost:5000/api/v1/assets?bucket=${response.data.result.docs[0].content.image_assets.bucket}&key=${img}`,
        ])
    );
  };

  const [xoxo, setXoxo] = useState({
    name: "rafly",
    age: 20,
    rules: {
      attention: ["asdsads"],
    },
    content: {
      generalInformation:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime blanditiis ea quod ipsam dicta. Reprehenderit repellendus atque explicabo ut deserunt perferendis veniam beatae, nihil mollitia, esse quaerat. Perspiciatis, molestias velit? Officiis est earum eius! Ut eos, non assumenda maiores nesciunt fugiat impedit? Laborum atque iste debitis repellendus numquam soluta mollitia accusantium temporibus nulla! Sunt iste molestiae reiciendis, vitae voluptate illum!",
    },
  });

  const [payload, setPayload] = useState<any>([]); // ? opt out of ts

  const handleImagePostMultiple = async () => {
    // ? testing multiple images
    const formData = new FormData();

    Object.entries(payload).forEach((data: any, index: number) => {
      console.log(Object.values(data));
      formData.append(`image`, data[1]);
    });

    formData.append("document", JSON.stringify(xoxo));
    console.log(formData);

    const response = await axios.post(
      `${BASE_URL}/api/v1/destinations/6254461f13d8d01989ec3a12?bucket=destination_assets`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTQ0NjFmMTNkOGQwMTk4OWVjM2ExMiIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE2NTExNjc5MDMsImV4cCI6MTY1MTE3NTEwM30.s5TmFD0-AYeIJ4yJYQu0GaOYHF1jRQnftlEhdELWoZA",
        },
      }
    );
  };

  // const handleImagePost = async () => {
  //   // ? testing multiple images
  //   const formData = new FormData();

  //   formData.append("image", payload);

  //   const response = await axios.post(`${BASE_URL}/pictures`, formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  // };

  useEffect(() => {
    fetchDestination();
  }, []);

  return (
    <div
      style={{
        marginTop: "100px",
      }}
    >
      {/* <input
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPayload((prevState) => [...prevState, e.target.files[0]])
        }
      />
      <input
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPayload((prevState) => [...prevState, e.target.files[0]])
        }
      /> */}
      <img src="" alt="" />
      <div>
        {destinations.length > 0
          ? destinations.map((destination, index) => (
              <div key={index}>
                <div
                  style={{
                    border: "2px solid red",
                    width: "20vw",
                    height: "20vh",
                    margin: "2em",
                    overflow: "hidden",
                  }}
                >
                  <h1>{destination.title}</h1>

                  <img
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                    }}
                    src={`http://localhost:3000/api/v1/assets?bucket=${destination.content.image_assets.bucket}&key=${destination.content.image_assets.assets_key[0]}`}
                    alt="img-1"
                  />
                </div>
              </div>
            ))
          : "loading"}
      </div>
      {/* <button onClick={handleImagePostMultiple}>submit</button> */}
    </div>
  );
};

export default Informations;
