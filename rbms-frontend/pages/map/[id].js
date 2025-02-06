import React from 'react';
import { getAllMapSlugs, getMapBySlug } from '@/services';
import FavouritesMap from '@/components/favourites-map/favourites-map';
import { useRouter } from 'next/router';

function UserMapPage({ data, notFound }) {
  const router = useRouter();

  if (notFound) {
    router.push('/404');
    return;
  }

  return <FavouritesMap data={data} />;
}

export default UserMapPage;

UserMapPage.getInitialProps = async ({ query }) => {
  try {
    const { data } = await getMapBySlug(query.id);
    return {
      data: data,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

// export async function getStaticProps({ params }) {
//   const response = await getMapBySlug(params.id);

//   return {
//     props: {
//       data: response.data,
//     },
//     revalidate: 300,
//   };
// }

// export async function getStaticPaths() {
//   const response = await getAllMapSlugs();

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
