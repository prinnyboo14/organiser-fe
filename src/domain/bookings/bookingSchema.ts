import * as z from "zod";

import { Booking } from "@/types/bookings";

export const bookingSchema = z.object({
  // customerName: z.string().min(1, "Customer name is required"),
  service: z.string().min(1, "Service is required"),
  // date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  // hours: z.number().min(0).max(24),
  // minutes: z.number().min(0).max(59),
  // isMOT: z.boolean(),
  notes: z.string().optional(),
});

export type BookingSchemaType = z.infer<typeof bookingSchema>;

export const mapBookingToBookingSchema = (
  booking: Booking
): BookingSchemaType => {
  return {
    service: booking.service,
    notes: booking.notes ?? "",
  };
};
