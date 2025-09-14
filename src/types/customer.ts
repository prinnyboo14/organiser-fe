import { UUID } from "crypto";

export type Customer = {
  id: UUID;
  firstName: string;
  lastName?: string;
  phoneNumber: string;
  emailAddress?: string;
  notes?: string;
};
