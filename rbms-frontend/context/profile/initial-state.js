const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  avatar: null,
  cover: null,
  newCover: null,
  mapSlug: null,
  location: {
    country: null,
    coordinates: [null, null], // [0] is longitude, [1] is latitude
  },
  description: null,
  createdAt: null,
};

export default initialState;
