import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectUserState } from '@/store/user/userSlice';

// Styles
import * as Styles from './map-theme.styles';
import { FlexContainer } from '@/components/UI';
import { Avatar, Box, Collapse, IconButton, Tooltip } from '@mui/material';

// Icons
import PaletteIcon from '@mui/icons-material/Palette';

// Services
import { updateTheme } from '@/services';

// Snackbar
import { enqueueSnackbar } from 'notistack';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';
import { getFileUrl } from '@/helpers/fileHelpers';

const MapTheme = ({ selectedTheme, setTheme, details }) => {
  const user = useSelector(selectUserState);

  const [showPalette, setShowPalette] = useState(false);

  const themeOptions = [
    {
      value: 'dark',
      color: 'linear-gradient(30deg, rgba(41,41,41,1) 50%, rgba(255,255,255,1) 100%)',
    },
    {
      value: 'light',
      color: 'linear-gradient(30deg, rgba(247,247,247,1) 20%, rgba(216,216,217,1) 60%)',
    },
    {
      value: 'streets',
      color:
        'linear-gradient(30deg, rgba(177,211,163,1) 50%, rgba(154, 231, 243, 1) 90%)',
    },
    {
      value: 'night',
      color: 'linear-gradient(30deg, rgba(65,78,93,1) 45%, rgba(45,125,128,1) 85%)',
    },
    {
      value: 'satellite',
      color: 'linear-gradient(30deg, rgba(69, 95, 41, 1) 50%, rgba(233,212,139,1) 100%)',
    },
  ];

  const showPalleteHandler = () => {
    setShowPalette((prevState) => !prevState);
  };

  const themeChangeHandler = async (theme) => {
    try {
      const response = await updateTheme({ theme: theme });
      enqueueSnackbar({ variant: 'success', message: response.data });
      setTheme(theme);
      showPalleteHandler();
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  return (
    <Styles.ProfileContainer>
      <Tooltip title={details.name} placement="bottom" arrow>
        <Link href={`/profile/${details.slug}`}>
          <Avatar
            alt="User Avatar"
            src={
              details.avatar &&
              getFileUrl(
                process.env.NEXT_PUBLIC_AWS_S3_USERS_BUCKET,
                `${details.id}/avatar/${details.avatar}`
              )
            }
            sx={{ height: 65, width: 65, border: '1px solid rgba(0, 0, 0, 0.2)' }}
          >
            {!details.avatar && details.name.slice(0, 1)}
          </Avatar>
        </Link>
      </Tooltip>
      {user.id === details.id && (
        <Box
          sx={{
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
          }}
          onClick={showPalleteHandler}
        >
          <IconButton color="secondary">
            <PaletteIcon />
          </IconButton>
        </Box>
      )}
      <Box>
        <Collapse orientation="horizontal" in={showPalette}>
          <Styles.CustomPaper elevation={2}>
            <FlexContainer height="100%">
              {themeOptions.map((theme) => (
                <Tooltip title={theme.value} placement="bottom" arrow key={theme.value}>
                  <Styles.ThemeButton
                    onClick={() => themeChangeHandler(theme.value)}
                    selected={+(selectedTheme === theme.value)}
                  >
                    <Styles.Themes
                      sx={{
                        background: theme.color,
                      }}
                    />
                  </Styles.ThemeButton>
                </Tooltip>
              ))}
            </FlexContainer>
          </Styles.CustomPaper>
        </Collapse>
      </Box>
    </Styles.ProfileContainer>
  );
};

export default MapTheme;
