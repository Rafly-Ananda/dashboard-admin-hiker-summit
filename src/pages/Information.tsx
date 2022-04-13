import { useState, useEffect, FC } from "react";
import axios from "axios";
import styles from "./scss/information.module.scss";
import { BASE_URL, IMG_URL } from "../config";
import DestinationCard from "../components/DestinationCard";

const Information: FC = () => {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [payload, setPayload] = useState<any>(null); // ? opt out of ts
  const [imgSrc, setImgSrc] = useState<string>("");

  // const fetchDestination = async () => {
  //   const response = await axios.get(`${BASE_URL}/destinations`);
  //   console.log(response);
  //   setDestinations(response.data);
  // };

  const handleImagePostMultiple = async () => {
    // ? testing multiple images
    const formData = new FormData();

    Object.entries(payload).forEach((data: any, index: number) => {
      console.log(Object.values(data));
      formData.append(`image`, data[1]);
    });

    // formData.append("document", JSON.stringify(xoxo));

    //   const response = await axios.post(
    //     `${BASE_URL}/pictures/destination`,
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   console.log(response);
  };

  const handleImagePost = async () => {
    // ? testing multiple images
    const formData = new FormData();

    formData.append("image", payload);

    const response = await axios.post(`${BASE_URL}/pictures`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
  };

  // const fetchImage = async () => {
  //   try {
  //     const { data } = await axios.get(`${BASE_URL}/pictures/`);
  //     if (!data[0]) return;
  //     console.log(data);
  //     // setImgSrc(data && data[0].img_uri);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // fetchImage();
    // fetchDestination();
  }, []);

  return (
    <div className={styles.page__wrapper}>
      <div>
        {/* {destinations.length > 0
          ? destinations.map((destination, index) => {
              return <DestinationCard key={index} destination={destination} />;
            })
          : "loading"} */}

        {/* {imgSrc.length > 1 ? (
          <img src={IMG_URL + imgSrc} alt="ryomen" />
        ) : (
          "loading image"
        )} */}

        {/* <div>
          <p>normal upload</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleImagePost();
            }}
          >
            <input
              type="file"
              name="image"
              onChange={(e) => e.target.files && setPayload(e.target.files[0])}
            />
            <input type="submit" value="Upload Image" />
          </form>
        </div>

        <div
          style={{
            marginTop: "30px",
          }}
        >
          <p>destination upload (multiple) </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleImagePostMultiple();
            }}
          >
            <input
              type="file"
              name="image"
              onChange={(e) => e.target.files && setPayload(e.target.files)}
              multiple
            />
            <input type="submit" value="Upload Image" />
          </form>
        </div>

        <div
          style={{
            marginTop: "30px",
          }}
        >
          <p>app upload</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="file"
              name="image"
              onChange={(e) => e.target.files && setPayload(e.target.files[0])}
            />
            <input type="submit" value="Upload Image" />
          </form>
        </div> */}
      </div>
    </div>
  );
};

export default Information;
