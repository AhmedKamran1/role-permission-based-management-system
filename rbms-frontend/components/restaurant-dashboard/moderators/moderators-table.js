import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserState } from '@/store/user/userSlice';

import DataTable from 'react-data-table-component';

// Styles
import { DashboardContent, FlexContainer } from '@/components/UI';
import { IconButton, Tooltip, Typography } from '@mui/material';

// Icons
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PersonOffIcon from '@mui/icons-material/PersonOff';

// Helpers
import { hasPermission } from '@/helpers/permissionHelper';

// Utils
import { PERMISSIONS } from '@/utils/permissions';
import ModeratorPermissionsModal from './permissions-modal';

const ModeratorsTable = ({ moderators }) => {
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  const user = useSelector(selectUserState);

  const openModalHandler = (userDetails) => {
    setSelectedUserDetails(userDetails);
    setShowPermissionsModal(true);
  };

  const closeModalHandler = () => {
    setSelectedUserDetails(null);
    setShowPermissionsModal(false);
  };

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
              !hasPermission(user.role, user.permissions, PERMISSIONS.MANAGE_MODERATOR)
            }
          >
            <Tooltip title="Update Permissions" placement="top">
              <WorkspacePremiumIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            // onClick={() => openModalHandler(row)}
            disabled={
              !hasPermission(user.role, user.permissions, PERMISSIONS.MANAGE_ADMIN)
            }
          >
            <Tooltip title="Make Admin" placement="top">
              <AdminPanelSettingsIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            // onClick={() => openModalHandler(row)}
            disabled={
              !hasPermission(user.role, user.permissions, PERMISSIONS.MANAGE_MODERATOR)
            }
          >
            <Tooltip title="Remove Moderator Status" placement="top">
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
      {showPermissionsModal && (
        <ModeratorPermissionsModal
          showModal={showPermissionsModal}
          handleCloseModal={closeModalHandler}
          selectedUserPermissions={selectedUserDetails.permissions}
        />
      )}
      <DashboardContent>
        <DataTable
          columns={columns}
          data={moderators}
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

export default ModeratorsTable;
