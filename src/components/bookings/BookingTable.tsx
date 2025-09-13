"use client";

import { Booking } from "@/types/bookings";

interface Props {
  bookings?: Booking[];
}

export const BookingsTable = ({ bookings }: Props) => {
  return (
    <>
      {bookings && bookings.length > 0 ? (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Bookings (Table)</h2>
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">ID</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{b.id}</td>
                  <td className="border px-4 py-2">{b.bookingStatus}</td>
                  <td className="border px-4 py-2">{b.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h1 className="text-2xl font-bold mt-8 mb-4">Bookings (Calendar)</h1>
        </div>
      ) : (
        <div>No bookings found</div>
      )}
    </>
  );
};
