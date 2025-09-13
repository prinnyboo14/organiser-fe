"use client";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { BookingCalendar } from "@/components/bookings/BookingCalendar";
import { BookingsTable } from "@/components/bookings/BookingTable";
import { useBookings } from "@/hooks/bookings";

export default function Home() {
  const { data: bookings, isLoading, error } = useBookings();

  if (isLoading) return <div>Loading bookings...</div>;
  if (error) return <div>Error loading bookings: {error.message}</div>;
  return (
    <div>
      <BookingsTable bookings={bookings} />
      <BookingCalendar bookings={bookings} />
    </div>
  );
}
