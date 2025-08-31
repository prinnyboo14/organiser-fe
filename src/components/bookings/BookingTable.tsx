'use client';

import { useBookings } from '@/hooks/bookings';

export default function BookingsList() {
  const { data: bookings, isLoading, error } = useBookings();

  if (isLoading) return <div>Loading bookings...</div>;
  if (error) return <div>Error loading bookings: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Bookings</h2>
      {bookings && bookings.length > 0 ? (
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">notes</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr
                key={b.id}
                className="hover:bg-gray-50">
                <td className="border px-4 py-2">{b.id}</td>
                <td className="border px-4 py-2">{b.bookingStatus}</td>

                <td className="border px-4 py-2">{b.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No bookings found</div>
      )}
    </div>
  );
}
