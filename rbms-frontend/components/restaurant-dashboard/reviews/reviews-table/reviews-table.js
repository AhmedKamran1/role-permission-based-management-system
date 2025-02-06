import React, { useEffect, useMemo, useRef, useState } from 'react';

import DataTable from 'react-data-table-component';

// Styles
import { DashboardContent, FlexContainer, InputField } from '@/components/UI';
import { Avatar, IconButton, InputAdornment, Rating, Tooltip } from '@mui/material';

// Icons
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Search from '@mui/icons-material/Search';

// Helpers
import { getDate } from '@/helpers/dateHelpers';
import { getFileUrl } from '@/helpers/fileHelpers';

// Components
import ReviewModal from '../review-modal/review-modal';

const ReviewsTable = ({ reviews }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const reviewDetails = useRef(null);

  const [filterText, setFilterText] = useState('');

  const openModalHandler = (review) => {
    reviewDetails.current = {
      ...review,
      userId: {
        name: review.name,
        id: review.id,
        avatar: review.avatar,
        slug: review.slug,
      },
      id: review.reviewId,
    };
    setShowReviewModal(true);
  };

  const closeModalHandler = () => {
    setShowReviewModal(false);
  };

  const filteredReviews = data.filter(
    (item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.createdAt.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <InputField
        name="search"
        label="Search"
        variant="outlined"
        placeholder="Search Reviews"
        onChange={(event) => setFilterText(event.target.value)}
        value={filterText}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ maxWidth: '300px' }}
      />
    );
  }, [filterText]);

  const columns = [
    {
      name: (
        <FlexContainer gap={0.5}>
          <PersonIcon color="primary" />
          Name
        </FlexContainer>
      ),
      selector: (row) => (
        <FlexContainer>
          <Avatar
            alt="User Avatar"
            src={
              row.avatar &&
              getFileUrl(
                process.env.NEXT_PUBLIC_AWS_S3_USERS_BUCKET,
                `${row.id}/avatar/${row.avatar}`
              )
            }
            sx={{ height: 35, width: 35, mr: 1.25 }}
          >
            {!row.avatar && row.name.slice(0, 1)}
          </Avatar>
          {row.name}
        </FlexContainer>
      ),
      sortable: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <StarIcon color="primary" />
          Rating
        </FlexContainer>
      ),
      selector: (row) => <Rating value={row.rating} size="small" readOnly />,
      sortable: 'true',
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <CalendarMonthIcon color="primary" />
          Posted On
        </FlexContainer>
      ),
      selector: (row) => getDate(row.createdAt),
      sortable: 'true',
      center: 'true',
    },
    {
      selector: (row) => (
        <Tooltip title="Show Review" placement="top">
          <IconButton onClick={() => openModalHandler(row)}>{row.icon}</IconButton>
        </Tooltip>
      ),
      center: 'true',
    },
  ];

  useEffect(() => {
    setLoading(true);
    const data = reviews.map((review) => ({
      name: review.userId.name,
      slug: review.userId.slug,
      rating: review.rating,
      content: review.content,
      createdAt: review.createdAt,
      icon: <VisibilityIcon />,
      avatar: review.userId.avatar,
      id: review.userId.id,
      reviewId: review.id,
      images: review.images,
      votes: review.votes,
      restaurantId: review.restaurantId,
    }));
    setData(data);
    setLoading(false);
  }, [reviews]);

  return (
    <React.Fragment>
      {showReviewModal && (
        <ReviewModal
          showModal={showReviewModal}
          handleCloseModal={closeModalHandler}
          review={reviewDetails.current}
          viewOnly={true}
          hide={true}
        />
      )}
      <DashboardContent>
        <DataTable
          columns={columns}
          data={filteredReviews}
          responsive
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          pagination
          paginationPerPage={9}
          paginationRowsPerPageOptions={[9]}
          progressPending={loading}
          keyField="reviewId"
        />
      </DashboardContent>
    </React.Fragment>
  );
};

export default ReviewsTable;
