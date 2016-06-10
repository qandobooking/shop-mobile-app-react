import { Schema, arrayOf } from 'normalizr';

const shopSchema = new Schema('shops');
const serviceSchema = new Schema('services');
const bookingSchema = new Schema('bookings');
const serviceWithShopSchema = new Schema('services');

serviceWithShopSchema.define({
  shop: shopSchema
});

bookingSchema.define({
  service: serviceWithShopSchema,
});

export const Schemas = {
  SHOP: shopSchema,
  SHOP_ARRAY: arrayOf(shopSchema),
  SERVICE: serviceSchema,
  SERVICE_ARRAY: arrayOf(serviceSchema),
  BOOKING: bookingSchema,
  BOOKING_ARRAY: arrayOf(bookingSchema),
};
