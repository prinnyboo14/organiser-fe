import { BookingStatusEnum } from "./enums";
import { Customer } from "./customer";

export type Booking = {
  id: string;
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
