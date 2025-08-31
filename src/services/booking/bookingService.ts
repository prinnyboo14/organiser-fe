import { Booking } from '@/types/bookings';
import { apiClient } from '../../../utils/axiosApiClient';
import { BOOKING_URL } from '../urls';

const getBookingData = async (): Promise<Booking[]> => {
  const res = await apiClient.get<Booking[]>(BOOKING_URL);
  return res; 
};

export const bookingService = { getBookingData };