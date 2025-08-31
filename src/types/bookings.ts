import { Customer } from './customer';
import { BookingStatusEnum } from './enums';

export type Booking = {
  id: string;
  service: string;
  bookingDate: Date;
  bookingStatus: BookingStatusEnum;
  notes?: string;
  createdAt: Date;
  updatedAt?: Date;
  customer: Customer;
};
