import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Booking } from "@/types/bookings";
import { UUID } from "crypto";
import { bookingService } from "@/services/booking/bookingService";
import { updateBookingDto } from "@/domain/bookings/bookingDto";

export function useBookings() {
  return useQuery<Booking[], Error>({
    queryKey: ["bookings"],
    queryFn: bookingService.getBookingData,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
}

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: UUID; data: updateBookingDto }) =>
      bookingService.updateBookingData(id, data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      console.error("Failed to update booking:", error);
    },
  });
}
