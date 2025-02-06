import React from 'react';

//Styles
import * as Styles from './customer-satisfaction.styles';
import { DashboardContent, Text } from '@/components/UI';

//Icons
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const CustomerSatisfaction = ({ reviews }) => {
  const satisfactionMappings = {
    superb: {
      icon: (
        <SentimentVerySatisfiedIcon
          sx={{ color: 'darkgreen', fontSize: '8rem', mr: 1 }}
        />
      ),
    },
    good: {
      icon: <SentimentSatisfiedIcon sx={{ color: 'green', fontSize: '8rem', mr: 1 }} />,
    },
    average: {
      icon: <SentimentNeutralIcon sx={{ color: 'yellow', fontSize: '8rem', mr: 1 }} />,
    },
    bad: {
      icon: <SentimentDissatisfiedIcon sx={{ color: 'red', fontSize: '8rem', mr: 1 }} />,
    },
    extremelyBad: {
      icon: (
        <SentimentVeryDissatisfiedIcon
          sx={{ color: 'darkred', fontSize: '8rem', mr: 1 }}
        />
      ),
    },
  };

  const getSatisfactionDetails = (satisfactionPercentage) => {
    let satisfactionType;

    if (satisfactionPercentage >= 80) satisfactionType = 'superb';
    else if (satisfactionPercentage >= 60) satisfactionType = 'good';
    else if (satisfactionPercentage >= 40) satisfactionType = 'average';
    else if (satisfactionPercentage >= 20) satisfactionType = 'bad';
    else satisfactionType = 'extremelyBad';

    return satisfactionMappings[satisfactionType];
  };

  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRatings / reviews.length;

  const satisfactionPercentage = (averageRating / 5) * 100 || 100;
  const { icon } = getSatisfactionDetails(satisfactionPercentage);

  return (
    <DashboardContent minHeight="170px">
      <Styles.SatisfactionContainer>
        {icon}
        <Text variant="header" fontWeight={800}>
          {`${satisfactionPercentage.toFixed(0)}%`}
        </Text>
        <Text variant="body">
          of customers are satisfied with their dining experience
        </Text>
      </Styles.SatisfactionContainer>
    </DashboardContent>
  );
};

export default CustomerSatisfaction;
