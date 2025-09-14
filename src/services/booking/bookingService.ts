import { BOOKING_URL } from "../urls";
import { Booking } from "@/types/bookings";
import { UUID } from "crypto";
import { apiClient } from "../../../utils/axiosApiClient";
import { updateBookingDto } from "@/domain/bookings/bookingDto";

const getBookingData = async (): Promise<Booking[]> => {
  const res = await apiClient.get<Booking[]>(BOOKING_URL);
  return res;
};

const updateBookingData = async (
  id: UUID,
  body: updateBookingDto
): Promise<Booking> => {
  const res = await apiClient.put<Booking, updateBookingDto>(
    `${BOOKING_URL}/${id}`,
    body
  );
  return res;
};

export const bookingService = { getBookingData, updateBookingData };
