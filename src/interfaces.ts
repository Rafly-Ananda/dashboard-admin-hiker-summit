export interface User {
  profile_picture: string;
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
}

// TODO : update this interface later
export interface Destination {
  _id: string;
  status: string;
  added_by: boolean;
  title: string;
  location: {
    province: string;
    island: string;
    city?: string;
    district: string;
    ward: string;
    level: string;
  };
  content: {
    image_galery: Array<string>;
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
