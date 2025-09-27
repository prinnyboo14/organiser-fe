import "react-big-calendar/lib/css/react-big-calendar.css";

import * as enGBModule from "date-fns/locale/en-GB";

import {
  BookingSchemaType,
  mapBookingToBookingSchema,
} from "@/domain/bookings/bookingSchema";
import { Calendar, View, dateFnsLocalizer } from "react-big-calendar";
import {
  CalendarEvent,
  transformBookingsToEvents,
} from "../../../utils/calendar";
import { format, getDay, parse as parseDateFns, startOfWeek } from "date-fns";
import { useEffect, useState } from "react";

import { Booking } from "@/types/bookings";
import { BookingDialog } from "./Dialogs/BookingDialog";
import { useUpdateBooking } from "@/hooks/bookings";

const enGB = (enGBModule as any).default ?? enGBModule;
const localizer = dateFnsLocalizer({
  format,
  parse: (value: any, formatString: any) =>
    parseDateFns(value, formatString, new Date()),
  startOfWeek,
  getDay,
  locales: { "en-GB": enGB },
});

interface Props {
  bookings?: Booking[];
}
export const BookingCalendar = ({ bookings }: Props) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [view, setView] = useState<View>("week");
  const [date, setDate] = useState(new Date());
  const [filter, setFilter] = useState<"all" | "mot" | "nonMot">("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const { mutate, error } = useUpdateBooking();

  const handleSave = (data: BookingSchemaType) => {
    if (!selectedBooking) return;

    mutate({
      id: selectedBooking.id,
      data: {
        ...data,
        bookingDate: data.bookingDate.toISOString(),
      },
    });

    setOpenDialog(false);
  };

  useEffect(() => {
    if (bookings?.length) {
      const transformed = transformBookingsToEvents(bookings).map(
        (booking) => ({
          ...booking,
          color: booking.resource.isMOT ? "#dbeafe" : "#d1fae5",
        })
      );
      setEvents(transformed);
    }
  }, [bookings]);

  const filteredEvents = events.filter((e) => {
    if (filter === "mot") return e.resource.isMOT;
    if (filter === "nonMot") return !e.resource.isMOT;
    return true;
  });

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedBooking(event.resource);
    setOpenDialog(true);
  };

  return (
    <div className="h-[80vh] p-4">
      <div className="flex space-x-2 mb-4">
        <button
          className="px-3 py-1 rounded border bg-white hover:bg-gray-100"
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className="px-3 py-1 rounded border bg-green-100 hover:bg-green-200"
          onClick={() => setFilter("nonMot")}
        >
          Main
        </button>
        <button
          className="px-3 py-1 rounded border bg-blue-100 hover:bg-blue-200"
          onClick={() => setFilter("mot")}
        >
          MOT
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        popup
        view={view}
        date={date}
        onView={setView}
        onNavigate={setDate}
        onSelectEvent={handleSelectEvent}
        views={["month", "week", "day", "agenda"]}
        min={new Date(0, 0, 0, 8, 0)}
        max={new Date(0, 0, 0, 18, 0)}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color,
          },
        })}
      />

      <BookingDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        initialValues={
          selectedBooking
            ? mapBookingToBookingSchema(selectedBooking)
            : undefined
        }
        onSave={handleSave}
      />
    </div>
  );
};
