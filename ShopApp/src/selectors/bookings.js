import { createSelector } from 'reselect';
import { groupBy, transform, identity, curry, flow } from 'lodash';
import { searchRegExp } from '../utils/regex';
import {
  INCOMING_USER_BOOKINGS_BY_SHOP,
  INCOMING_USER_BOOKINGS_LIST,
} from '../constants/ViewTypes';

function nestShop(model, shops) {
  return { ...model, shop: shops[model.shop] };
}

function nestServiceShop(model, services, shops) {
  return { ...model, service: nestShop(services[model.service], shops) };
}

// Entities for booking relation
const getBookingsEntity = (state) => state.entities.bookings;
const getShopsEntity = (state) => state.entities.shops;
const getServicesEntity = (state) => state.entities.services;

// Transfrom an useless ids list in a cool booking list
// that can be used in the UI!
const mapBookingsIdsToUIList = (ids, bookings, services, shops) => (
  ids.map(id => nestServiceShop(
    bookings[id],
    services,
    shops
  ))
);

const getHistoryUserBookingsIds = (state) => state.userData.bookings.history.list.ids;

// List of history user bookings with nested relation for UI
export const getHistoryUserBookings = createSelector(
  [ getHistoryUserBookingsIds, getBookingsEntity, getServicesEntity, getShopsEntity ],
  mapBookingsIdsToUIList
);

const getHistoryUserBookingsPaginationData = (state) => state.userData.bookings.history.list.pagination;

// Pagination stuff of history user bookings
export const getHistoryUserBookingsPagination = createSelector(
  [ getHistoryUserBookingsPaginationData ],
  pagination => {
    let pages = 0;

    if (pagination.count && pagination.pageSize) {
      pages = Math.ceil(pagination.count / pagination.pageSize);
    }

    return { ...pagination, pages };
  }
);

const getIncomingUserBookingsIds = (state) => state.userData.bookings.incoming.list.ids;

// List of incoming user bookings with nested relation for UI
const getIncomingUserBookings = createSelector(
  [ getIncomingUserBookingsIds, getBookingsEntity, getServicesEntity, getShopsEntity ],
  mapBookingsIdsToUIList
);

// Total count of incoming user bookings without filters
export const getIncomingUserBookingsTotalCount = createSelector(
  [ getIncomingUserBookings ],
  (bookings) => bookings.length
);

const getIncomingUserBookingsSearchFilter = (state) => state.userData.bookings.incoming.filters.search;
const getIncomingUserBookingsStatusFilter = (state) => state.userData.bookings.incoming.filters.status;

// List of incoming user bookings filtered by state
const getIncomingUserBookingsFiltered = createSelector(
  [ getIncomingUserBookings, getIncomingUserBookingsSearchFilter, getIncomingUserBookingsStatusFilter ],
  (bookings, search, status) => {
    // Relax, this mean no filter stuff when falsy value given
    const maybeFilter = fn => v => v ? curry(fn)(v) : identity;

    const searchFilter = (search, booking) => {
      const regex = searchRegExp(search);
      return booking.service.name.match(regex) ||
             booking.service.shop.name.match(regex);
    };
    const statusFilter = (status, booking) => booking.status === status;

    return flow(
      bookings => bookings.filter(maybeFilter(searchFilter)(search)),
      bookings => bookings.filter(maybeFilter(statusFilter)(status))
    )(bookings);
  }
);


// Total count of incoming user bookings filters
export const getIncomingUserBookingsCountFiltered = createSelector(
  [ getIncomingUserBookingsFiltered ],
  (bookings) => bookings.length
);

const getIncomingUserBookingsView = (state) => state.userData.bookings.incoming.view;

// List of incoming user bookings filtered and viewed
export const getIncomingUserBookingsFilteredAndViewed = createSelector(
  [ getIncomingUserBookingsFiltered, getIncomingUserBookingsView ],
  (bookings, view) => {
    switch (view) {
      case INCOMING_USER_BOOKINGS_BY_SHOP:
        return transform(groupBy(bookings, 'service.shop.id'), (r, v, k) => {
          const { service: { shop } } = v[0];
          r.push({ shop, bookings: v });
        }, []);
      case INCOMING_USER_BOOKINGS_LIST:
        return bookings;
      default:
        return bookings;
    }
  }
);

const getUserBooking = (state, props) =>
  state.entities.bookings[props.params.bookingId];

export const makeGetUserBooking = () => {
  return createSelector(
    [ getUserBooking, getServicesEntity, getShopsEntity ],
    (booking, services, shops) => (
      typeof booking === 'undefined'
      ? null
      : nestServiceShop(booking, services, shops)
    )
  );
};

const getBookedRangeId = (state) => state.booking.book.id;

export const getBookedRange = createSelector(
  [ getBookedRangeId, getBookingsEntity, getServicesEntity, getShopsEntity ],
  (id, bookings, services, shops) => (
    id === null
    ? null
    : nestServiceShop(bookings[id], services, shops)
  )
);
