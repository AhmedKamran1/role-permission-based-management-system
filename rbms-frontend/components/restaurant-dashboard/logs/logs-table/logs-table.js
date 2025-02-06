import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { enqueueSnackbar } from 'notistack';
import { useRestaurantContext } from '@/context/restaurant';

// Services
import { getRestaurantRecords } from '@/services';

// Styles
import { DashboardContent, FlexContainer, InputField } from '@/components/UI';
import { Chip, InputAdornment } from '@mui/material';

// Icons
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Search } from '@mui/icons-material';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';
import { getDate } from '@/helpers/dateHelpers';

const LogsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState('');

  const { details } = useRestaurantContext();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (!details.id) return;
        const response = await getRestaurantRecords(details.id);
        setData(response.data);
      } catch (e) {
        enqueueSnackbar({ variant: 'error', message: getError(e) });
      } finally {
        setLoading(false);
      }
    })();
  }, [details.id]);

  const filteredLogs = data.filter(
    (item) =>
      item.id.toLowerCase().includes(filterText.toLowerCase()) ||
      item.type.toLowerCase().includes(filterText.toLowerCase()) ||
      item.status.toLowerCase().includes(filterText.toLowerCase()) ||
      (item.remarks && item.remarks.toString().includes(filterText)) ||
      getDate(item.createdAt).toLowerCase().includes(filterText)
  );

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <InputField
        name="search"
        label="Search"
        variant="outlined"
        placeholder="Search"
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
          Id
        </FlexContainer>
      ),
      selector: (row) => row.id,
      sortable: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <StarIcon color="primary" />
          Type
        </FlexContainer>
      ),
      selector: (row) => (
        <Chip
          label={row.type}
          color={row.type === 'listing' ? 'primary' : 'info'}
          sx={{ color: 'text.primary' }}
        />
      ),
      sortable: 'true',
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
          label={row.status}
          color={row.status === 'approved' ? 'success' : 'error'}
          sx={{ color: 'text.primary' }}
        />
      ),
      sortable: 'true',
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <CalendarMonthIcon color="primary" />
          Remarks
        </FlexContainer>
      ),
      selector: (row) => row.remarks,
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <CalendarMonthIcon color="primary" />
          Time
        </FlexContainer>
      ),
      selector: (row) => getDate(row.createdAt),
      sortable: 'true',
      center: 'true',
    },
  ];

  return (
    <DashboardContent>
      <DataTable
        columns={columns}
        data={filteredLogs}
        responsive
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        pagination
        paginationPerPage={15}
        paginationRowsPerPageOptions={[15]}
        progressPending={loading}
      />
    </DashboardContent>
  );
};

export default LogsTable;
