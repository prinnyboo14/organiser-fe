import { BookingStatusEnum } from "./enums";
import { Customer } from "./customer";
import { UUID } from "crypto";

export type Booking = {
  id: UUID;
  service: string;
  bookingDate: Date;
  estimatedDuration: number;
  bookingStatus: BookingStatusEnum;
  isMOT: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt?: Date;
  customer: Customer;
};
