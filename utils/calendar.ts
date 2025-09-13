import { Booking } from "@/types/bookings";

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: Booking;
  color?: string;
}

export function transformBookingsToEvents(
  bookings: Booking[]
): CalendarEvent[] {
  return bookings.map((booking) => ({
    id: booking.id,
    start: new Date(booking.bookingDate),
    end: new Date(
      new Date(booking.bookingDate).getTime() +
        booking.estimatedDuration * 60 * 1000
    ),
    title: booking.service,
    // title: `${booking.customer.firstName} ${booking.customer.lastName} - ${booking.service}`
    resource: booking,
  }));
}
