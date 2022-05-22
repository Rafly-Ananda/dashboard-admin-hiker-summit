export interface User {
  image_assets: {
    bucket: string;
    assets_key: string;
  };
  _id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  destination_wishlist: Array<string>;
  user_status: string;
  is_admin: boolean;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
  verified: boolean;
}

interface Track {
  description: string;
  track_name: string;
  basecamp_name: string;
  road_name: string;
  district: string;
  ward: string;
  village: string;
  postal_code: number;
  accessibility: object;
  phone_number: number;
}

export interface Destination {
  _id: string;
  status: string;
  title: string;
  price_per_day: string;
  difficulty: string;
  likes: number;
  added_by: string;
  location: {
    province: string;
    island: string;
    city?: string;
    track: Array<Track>;
  };
  content: {
    general_information: string;
    rules: {
      attention: object;
      obligation: object;
      prohibition: object;
    };
    accessibility: object;
    image_assets: {
      assets_key: Array<string>;
      bucket: string;
    };
    contact: {
      name: string;
      phone_number: string;
      position: string;
      location: string;
      note: string;
    };
  };
}

export interface Guide {
  _id: string;
  user_id: string;
  destination_id: string;
  hiking_experience: number;
  track_route: string;
  allowed_hiker_count: number;
  status: string;
  about_me: string;
}

export interface Book {
  _id: string;
  user_id: string;
  destination_id: string;
  track_route: Array<object>;
  date: {
    departure: string;
    arrival: string;
  };
  hiker_count: number;
  proof_of_payment: {
    bucket: string;
    assets_key: string;
  }; // ? this will be a string to S3 image
  note: string;
  paid_status: string;
}

export interface UseLocationProps {
  hash?: string;
  key?: string;
  pathname: string;
  search?: string;
  state: object | null;
}
