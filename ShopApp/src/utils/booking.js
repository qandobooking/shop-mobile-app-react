import { BookingActions, BookingStatuses } from '../constants/Booking';

export function getBookingsStatusesList() {
  return [
    BookingStatuses.PENDING,
    BookingStatuses.DENIED,
    BookingStatuses.CONFIRMED,
    BookingStatuses.CANCELED,
  ];
};

export function getBookingsActionsList() {
  return [
    BookingActions.CANCEL,
  ];
};

export function humanizeBookingStatus(status) {
  return {
    [BookingStatuses.PENDING]: 'In Attesa',
    [BookingStatuses.DENIED]: 'Rifiutato',
    [BookingStatuses.CONFIRMED]: 'Confermato',
    [BookingStatuses.CANCELED]: 'Cancellato',
  }[status];
};

export function humanizeBookingAction(action) {
  return {
    [BookingActions.CANCEL]: 'Cancella',
  }[action];
};
