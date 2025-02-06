import React from 'react';

// Styles
import * as Styles from './plans-card.styles';
import { Text } from '@/components/UI';

const PlansCard = ({ item, planSelectionHandler, selectedPlan }) => {
  return (
    <Styles.PlanContainer
      selected={+selectedPlan?.id?.includes(item.id) || 0}
      onClick={() => planSelectionHandler(item)}
    >
      <Text
        variant="header"
        sx={{ display: 'block', mb: 2, fontWeight: 500, color: 'text.secondary' }}
      >
        {item.title}
      </Text>
      <Text variant="body" sx={{ display: 'block', mb: 4, color: 'text.secondary' }}>
        {item.description}
      </Text>
      <Text variant="bigHeader" color="primary" fontWeight={900}>
        ${item.charges}
      </Text>
      <Text variant="main" color="primary" fontWeight={600}>
        / Feature for {item.durationInMonths} months
      </Text>
    </Styles.PlanContainer>
  );
};

export default PlansCard;
