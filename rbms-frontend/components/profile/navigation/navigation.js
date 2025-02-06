import React, { useMemo, useRef, useState } from 'react';
import { useOnScreen } from '@/hooks/useOnScreen';

import { useSelector } from 'react-redux';
import { selectUserState } from '@/store/user/userSlice';
import { useProfileContext } from '@/context/profile';

// Components
import Review from '@/components/reviews/review';
import RestaurantCard from '../restaurant-card/restaurant-card';
import ReviewsGraph from '../reviews-graph/reviews-graph';
import VotesGraph from '../votes/votes-graph/votes-graph';
import VotesActivity from '@/components/profile/votes/vote-activity/vote-activity';
import DiningPlanCard from '../dining-plan-card/dining-plan-card';
import DiningPlanCalender from '../dining-plan-calender/dining-plan-calender';

// Styles
import * as Styles from './navigation.styles';
import { Text } from '@/components/UI';
import { Tabs, Tab, Box, Grid, Toolbar } from '@mui/material';

// Icons
import ReviewIcon from '@mui/icons-material/Reviews';
import VoteIcon from '@mui/icons-material/ThumbsUpDown';
import PlanIcon from '@mui/icons-material/EventNote';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Utils
import { UserRoles } from '@/utils/roles';

const Navigation = () => {
  const user = useSelector(selectUserState);
  const { details } = useProfileContext();

  const tabsRef = useRef(null);
  const tabsOnScreen = useOnScreen(tabsRef);

  const [value, setValue] = useState(0);
  const [plansType, setPlansType] = useState('myPlans');

  const tabItems = [
    {
      value: 'Reviews',
      icon: <ReviewIcon fontSize="medium" />,
      label: 'Reviews',
      childComponent: <Review profileDetails={details} />,
      detailComponent: <ReviewsGraph profileDetails={details} />,
    },
    {
      value: 'Votes',
      icon: <VoteIcon fontSize="medium" />,
      label: 'Votes',
      childComponent: <VotesActivity />,
      detailComponent: <VotesGraph />,
    },
    {
      value: 'Plans',
      icon: <PlanIcon fontSize="medium" />,
      label: 'Plans',
      hide: user.id !== details.id,
      childComponent: (
        <DiningPlanCard plansType={plansType} setPlansType={setPlansType} />
      ),
      detailComponent: <DiningPlanCalender plansType={plansType} />,
    },
    {
      value: 'Favourites',
      icon: <FavoriteIcon fontSize="medium" />,
      label: 'Favourites',
      childComponent: <RestaurantCard mapSlug={details.mapSlug} favouriteTab={true} />,
    },
    {
      value: 'Restaurants',
      icon: <RestaurantIcon fontSize="medium" />,
      label: 'Restaurants',
      hide: user.role !== UserRoles.MANAGER || user.id !== details.id,
      childComponent: <RestaurantCard />,
    },
  ];

  const visibleTabItems = useMemo(
    () => tabItems.filter((item) => !item.hide),
    [tabItems]
  );

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      {!tabsOnScreen && (
        <Styles.FixedTabs>
          <Toolbar sx={{ width: '100%', justifyContent: 'center' }} disableGutters>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              sx={{ width: { xs: '100%', lg: '50%' } }}
            >
              {visibleTabItems.map(
                (item) =>
                  !item.hide && (
                    <Tab
                      key={item.value}
                      icon={item.icon}
                      label={<Text variant="sub">{item.label}</Text>}
                      sx={{ width: '25%' }}
                    />
                  )
              )}
            </Tabs>
          </Toolbar>
        </Styles.FixedTabs>
      )}
      <Grid item xs={12} lg={6} sx={{ order: { xs: 3, lg: 0 } }}>
        <Styles.TabItemContainer>
          <Styles.TabsContainer ref={tabsRef}>
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              centered
              scrollButtons="auto"
            >
              {visibleTabItems.map(
                (item) =>
                  !item.hide && (
                    <Tab
                      key={item.value}
                      icon={item.icon}
                      iconPosition="start"
                      label={<Text variant="body">{item.label}</Text>}
                      sx={{ textTransform: 'none' }}
                    />
                  )
              )}
            </Tabs>
          </Styles.TabsContainer>
          <Box sx={{ mt: 2 }}>{visibleTabItems[value]?.childComponent}</Box>
        </Styles.TabItemContainer>
      </Grid>
      <Grid item xs={12} lg={3} sx={{ order: { xs: 2, lg: 0 } }}>
        {visibleTabItems[value]?.detailComponent}
      </Grid>
    </React.Fragment>
  );
};

export default Navigation;
