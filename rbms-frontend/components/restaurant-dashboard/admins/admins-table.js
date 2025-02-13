import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserState } from '@/store/user/userSlice';

import DataTable from 'react-data-table-component';

// Styles
import { DashboardContent, PrimaryButton } from '@/components/UI';
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from '@mui/material';

// Icons
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import EditIcon from '@mui/icons-material/Edit';

// Helpers
import { hasPermission } from '@/helpers/permissionHelper';

// Utils
import { PERMISSIONS } from '@/utils/permissions';
import { SUBROLES } from '@/utils/roles';

const AdminsTable = ({ admins }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  const [adminLevel, setAdminLevel] = useState('');
  const [rowEditId, setRowEditId] = useState('');

  const user = useSelector(selectUserState);

  const handleStatusEdit = (userDetails) => {
    setSelectedUserDetails(userDetails);
    setAdminLevel(userDetails.subRole);
    setRowEditId(userDetails._id);
  };

  const handleStatusReset = () => {
    setSelectedUserDetails(null);
    setAdminLevel('');
    setRowEditId('');
  };

  console.log(adminLevel);

  // const handleStatusUpdate = async () => {
  //   try {
  //     const payload = {
  //       status: candidateStatus,
  //     };

  //     const response = await updateManagedServicesCandidateStatus(
  //       selectedCandidateDetails._id,
  //       payload
  //     );

  //     setCandidates((prevState) => {
  //       const updateIndex = prevState.findIndex(
  //         (candidate) => candidate._id === selectedCandidateDetails._id
  //       );
  //       const updatedProjects = [...prevState];
  //       updatedProjects[updateIndex].status = response.data.status;
  //       return updatedProjects;
  //     });

  //     enqueueSnackbar({
  //       variant: 'success',
  //       message: 'Updated profile status successfully.',
  //     });
  //   } catch (err) {
  //     enqueueSnackbar({
  //       variant: 'error',
  //       message: 'Failed to update candidate profile status.',
  //     });
  //   } finally {
  //     handleStatusReset();
  //   }
  // };

  const columns = [
    {
      name: <Typography variant="body1">Name</Typography>,
      selector: (row) => <Typography variant="body1">{row.name}</Typography>,
      center: 'true',
    },
    {
      name: <Typography variant="body1">Role</Typography>,
      selector: (row) => <Typography variant="body1">{row.role}</Typography>,
      sortable: 'true',
      center: 'true',
    },
    {
      name: <Typography variant="body1">Sub Role</Typography>,
      selector: (row) => {
        const userDetails = row;
        const isEditing = rowEditId === row._id;
        return (
          <Box>
            {isEditing ? (
              <Box display={'flex'} gap={2}>
                <FormControl sx={{ minWidth: '150px' }} size="small">
                  <InputLabel>Candidate Status</InputLabel>
                  <Select
                    value={adminLevel}
                    label="Candidate Status"
                    onChange={(e) => {
                      setAdminLevel(e.target.value);
                    }}
                    size="small"
                  >
                    {Object.entries(SUBROLES).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <PrimaryButton
                  variant="secondary"
                  sx={{
                    color: 'black',
                    minWidth: '100px !important',
                    width: '100px',
                    fontSize: '8px !important',
                  }}
                  // onClick={handleStatusUpdate}
                >
                  Confirm
                </PrimaryButton>
                <PrimaryButton
                  variant="secondary"
                  sx={{
                    color: 'black',
                    minWidth: '100px !important',
                    width: '100px',
                    fontSize: '8px !important',
                  }}
                  onClick={handleStatusReset}
                >
                  Cancel
                </PrimaryButton>
              </Box>
            ) : (
              <Box display={'flex'} gap={2}>
                <Typography variant="body2">{SUBROLES[row.subRole]}</Typography>
                <Tooltip title={'Update Admin Level'}>
                  <EditIcon
                    onClick={() => handleStatusEdit(row)}
                    sx={{ cursor: 'pointer' }}
                  />
                </Tooltip>
              </Box>
            )}
          </Box>
        );
      },
      sortable: 'true',
      center: 'true',
    },
    {
      name: <Typography variant="body1">Actions</Typography>,
      selector: (row) => (
        <React.Fragment>
          <IconButton
            onClick={() => openModalHandler(row)}
            disabled={
              !hasPermission(user.role, user.permissions, PERMISSIONS.MANAGE_ADMIN)
            }
          >
            <Tooltip title="Update Admin Level" placement="top">
              <AdminPanelSettingsIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            onClick={() => openModalHandler(row)}
            disabled={
              !hasPermission(user.role, user.permissions, PERMISSIONS.MANAGE_ADMIN)
            }
          >
            <Tooltip title="Remove Admin Status" placement="top">
              <PersonOffIcon />
            </Tooltip>
          </IconButton>
        </React.Fragment>
      ),
      center: 'true',
    },
  ];

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
          data={admins}
          responsive
          pagination
          paginationPerPage={9}
          paginationRowsPerPageOptions={[9]}
          // progressPending={loading}
          keyField="_id"
        />
      </DashboardContent>
    </React.Fragment>
  );
};

export default AdminsTable;
