export type messagetype = {
  id?: number;
  text: string;
  houseId?: string;
  timestamp: string;
  sender?: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
};
