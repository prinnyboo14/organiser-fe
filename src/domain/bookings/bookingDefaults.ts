export const defaultBookingValues = {
  customerName: "",
  service: "",
  date: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
  hours: 0,
  minutes: 0,
  isMOT: false,
  notes: "",
};
// add a type
