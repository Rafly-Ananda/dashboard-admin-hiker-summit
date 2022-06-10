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
  createdAt: Date;
  updatedAt: Date;
  accessToken: string;
  verified: boolean;
}

export interface DestinationTrack {
  description: string;
  track_name: string;
  basecamp_name: string;
  road_name: string;
  district: string;
  ward: string;
  village: string;
  postal_code: number;
  accessibility: {
    [key: string]: string;
  };
  phone_number: number;
}

export interface DestinationRules {
  attention: {
    [key: string]: string;
  };
  obligation: {
    [key: string]: string;
  };
  prohibition: {
    [key: string]: string;
  };
}

export interface DestinationLocation {
  province: string;
  island: string;
  city?: string;
  track: Array<DestinationTrack>;
}

export interface Destination {
  _id: string;
  status: string;
  title: string;
  price_per_day: string;
  difficulty: string;
  likes: number;
  user_id: string;
  location: DestinationLocation;
  content: {
    general_information: string;
    rules: DestinationRules;
    image_assets: {
      assets_key: Array<string>;
      bucket: string;
    };
  };
  approved: string;
  createdAt: Date;
  updatedAt: Date;
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
  approved: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Book {
  _id: string;
  user_id: string;
  destination_id: string;
  guide_id: string;
  track_route: Array<DestinationTrack>;
  date: {
    departure: string;
    arrival: string;
  };
  hiker_count: number;
  payment_deadline: number;
  payment_amount: number;
  proof_of_payment: {
    bucket: string;
    assets_key: string;
  };
  note: string;
  paid_status: string;
  booking_status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tickets {
  _id: string;
  user_id: string;
  destination_id: string;
  subject: string;
  details: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketsInterface extends Destination, Guide, Tickets {
  createdAt: Date;
  updatedAt: Date;
}

export interface UseLocationProps {
  hash?: string;
  key?: string;
  pathname: string;
  search?: string;
  state: object | null;
}
