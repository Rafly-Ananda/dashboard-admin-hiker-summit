interface LocationProps {
  province: string;
  island: string;
  city?: string;
  district: string;
  ward: string;
  level: string;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  destination_wishlist: Array<string>;
  is_admin: boolean;
  createdAt: string;
  updatedAt: string;
  current_access_token: string;
}

export interface DestinationProps {
  destination: {
    _id: string;
    approved: boolean;
    added_by: boolean;
    title: string;
    location: {
      [key: string]: LocationProps;
    };
    content: {
      image_galery: Array<string>;
    };
  };
}
