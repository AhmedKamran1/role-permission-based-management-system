import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import DataTable from 'react-data-table-component';

// Styles
import { DashboardContent, FlexContainer } from '@/components/UI';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';

// Icons
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddModeratorIcon from '@mui/icons-material/AddModerator';

// Helpers
import { hasPermission } from '@/helpers/permissionHelper';
import { selectUserState } from '@/store/user/userSlice';

// Utils
import { PERMISSIONS } from '@/utils/permissions';

const UsersTable = ({ users }) => {
  const [loading, setLoading] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const user = useSelector(selectUserState);

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
      name: <FlexContainer gap={0.5}>Actions</FlexContainer>,
      selector: (row) => (
        <React.Fragment>
          <IconButton
            onClick={() => openModalHandler(row)}
            disabled={
              !hasPermission(user.role, user.permissions, PERMISSIONS.MANAGE_ADMIN)
            }
          >
            <Tooltip title="Make Admin" placement="top">
              <AdminPanelSettingsIcon />
            </Tooltip>
          </IconButton>

          <IconButton
            onClick={() => openModalHandler(row)}
            disabled={
              !hasPermission(user.role, user.permissions, PERMISSIONS.MANAGE_MODERATOR)
            }
          >
            <Tooltip title="Make Moderator" placement="top">
              <AddModeratorIcon fontSize="small" />
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
          data={users}
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

export default UsersTable;
