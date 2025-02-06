import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import DataTable from 'react-data-table-component';

// Styles
import { DashboardContent, FlexContainer, InputField } from '@/components/UI';
import { Chip, InputAdornment } from '@mui/material';

// Icons
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Search from '@mui/icons-material/Search';

// Helpers
import { getDate } from '@/helpers/dateHelpers';

const FeatureTable = ({ payments }) => {
  const [filterText, setFilterText] = useState('');

  const filteredPayments = payments?.filter((item) => {
    const filterTextLower = filterText.toLowerCase();
    const isActiveFilterMatch =
      (filterTextLower === 'active' && item.planId.isActive) ||
      (filterTextLower === 'expired' && !item.planId.isActive);

    return (
      getDate(item.createdAt).toLowerCase().includes(filterTextLower) ||
      isActiveFilterMatch ||
      item.stripeId.toString().includes(filterTextLower) ||
      item.planId.title.toString().toLowerCase().includes(filterTextLower) ||
      item.planId.charges.toString().includes(filterTextLower)
    );
  });

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
          Payment ID
        </FlexContainer>
      ),
      selector: (row) => row.stripeId,
      sortable: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <StarIcon color="primary" />
          Feature Date
        </FlexContainer>
      ),
      selector: (row) => getDate(row.createdAt),
      sortable: 'true',
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <CalendarMonthIcon color="primary" />
          Expiration Date
        </FlexContainer>
      ),
      selector: (row) =>
        getDate(dayjs(row.createdAt).add(row.planId.durationInMonths, 'month')),
      sortable: 'true',
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <CalendarMonthIcon color="primary" />
          Charges
        </FlexContainer>
      ),
      selector: (row) => row.planId.charges + `$${row.planId.currency}`,
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <CalendarMonthIcon color="primary" />
          Status
        </FlexContainer>
      ),
      selector: (row) => (
        <Chip
          label={row.planId.isActive ? 'Active' : 'Expired'}
          color={row.planId.isActive ? 'success' : 'error'}
          sx={{ color: 'text.primary' }}
        />
      ),
      center: 'true',
    },
  ];

  return (
    <DashboardContent>
      <DataTable
        columns={columns}
        data={filteredPayments}
        responsive
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        pagination
        paginationPerPage={8}
        paginationRowsPerPageOptions={[8]}
      />
    </DashboardContent>
  );
};

export default FeatureTable;
