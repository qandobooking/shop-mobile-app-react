const evironment='production';

export const BOOKING_FRONTED_URL = evironment === 'production'
  ? 'http://booking.qando.it'
  : 'http://localhost:3000';

export const BOOKING_API_URL = evironment === 'production'
  ? 'http://api.qando.it/api'
  : 'http://localhost:8000/api';
