import React, { useEffect, useState } from 'react';
import { useProfileContext } from '@/context/profile';
import dayjs from 'dayjs';

// Styles
import * as Styles from './dining-plan-calender.styles';
import { DetailsContainer } from '@/components/UI';
import { DateCalendar, DayCalendarSkeleton } from '@mui/x-date-pickers';

// Helpers
import { enqueueSnackbar } from 'notistack';
import { getError } from '@/helpers/snackbarHelpers';

// Services
import { getUserInvitedPlans, getUserPlans } from '@/services/dining-plan';

const ServerDay = (props) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.includes(day.format('YYYY-MM-DD'));

  return (
    <Styles.HighlightedDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      selected={isSelected}
    />
  );
};

const DiningPlanCalender = ({ plansType }) => {
  const { details } = useProfileContext();

  const [plansDate, setPlansDate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserCreatedPlans = async () => {
    setIsLoading(true);
    try {
      const response = await getUserPlans(details.id);
      const highlightDays = response.data.map((plan) =>
        dayjs(plan.date).format('YYYY-MM-DD')
      );
      setPlansDate(highlightDays);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
    setIsLoading(false);
  };

  const fetchUserInvitedPlans = async () => {
    setIsLoading(true);
    try {
      const response = await getUserInvitedPlans(details.email);
      const highlightDays = response.data.map((plan) =>
        dayjs(plan.date).format('YYYY-MM-DD')
      );
      setPlansDate(highlightDays);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (details?.id && plansType === 'myPlans') fetchUserCreatedPlans();
    else if (details?.id && plansType === 'invitedPlans') fetchUserInvitedPlans();
  }, [details?.id, plansType]);
  return (
    <DetailsContainer>
      <DateCalendar
        loading={isLoading}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        sx={{
          width: '100%',
          '& .MuiDayCalendar-header *': {
            ml: 1.5,
            mr: 1.5,
            fontWeight: 600,
          },
        }}
        slotProps={{
          day: {
            sx: {
              fontSize: '0.9rem',
              ml: 1.5,
              mr: 1.5,
              color: 'text.secondary',
              '&.Mui-selected:hover': {
                backgroundColor: 'secondary.main',
              },
              '&.Mui-selected:focus': {
                backgroundColor: 'secondary.main',
              },
            },
            highlightedDays: plansDate,
          },
        }}
      />
    </DetailsContainer>
  );
};

export default DiningPlanCalender;
