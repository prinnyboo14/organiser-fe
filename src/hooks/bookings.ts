import { useQuery } from '@tanstack/react-query';
import { bookingService } from '@/services/booking/bookingService';
import type { Booking } from '@/types/bookings';

export function useBookings() {
  return useQuery<Booking[], Error>({
    queryKey: ['bookings'],
    queryFn: bookingService.getBookingData,
    staleTime: 1000 * 60, // 1 minute cache
    refetchOnWindowFocus: false,
  });
}
