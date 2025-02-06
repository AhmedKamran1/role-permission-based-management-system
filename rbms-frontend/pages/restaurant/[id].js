import React from 'react';
import { RestaurantProvider } from '@/context/restaurant';

import { getRestaurantBySlug, getRestaurantSlugs } from '@/services';

import Restaurant from '@/components/restaurant/restaurant';
import { useRouter } from 'next/router';

const RestaurantPage = ({ restaurant, notFound }) => {
  const router = useRouter();

  if (notFound) {
    router.push('/404');
    return;
  }
  return (
    <RestaurantProvider>
      <Restaurant restaurant={restaurant} />
    </RestaurantProvider>
  );
};

export default RestaurantPage;

RestaurantPage.getInitialProps = async ({ query }) => {
  try {
    const { data } = await getRestaurantBySlug(query.id);
    return {
      restaurant: data,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

// export async function getStaticProps({ params }) {
//   const response = await getRestaurantBySlug(params.id);

//   return {
//     props: {
//       restaurant: response.data,
//     },
//     revalidate: 300,
//   };
// }

// export async function getStaticPaths() {
//   const response = await getRestaurantSlugs();
//   const slugs = response.data;

//   const paths = slugs
//     ? slugs.map((s) => ({
//         params: { id: s.slug },
//       }))
//     : [];

//   return {
//     paths,
//     fallback: false,
//   };
// }
