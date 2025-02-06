const initialState = {
  id: null,
  name: null,
  taxId: null,
  slug: null,
  userId: null,
  phoneNumber: null,
  rating: null,
  count: null,
  categories: [],
  menu: [],
  address: null,
  location: {
    country: null,
    coordinates: [null, null], // [0] is longitude, [1] is latitude
  },
  status: null,
  images: [],
  isFeatured: false,
  isVerified: false,
  createdAt: null,
};

export default initialState;
