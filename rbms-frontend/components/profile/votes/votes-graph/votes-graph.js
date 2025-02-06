import React, { useEffect, useState } from 'react';
import { useProfileContext } from '@/context/profile';

// Styles
import { Box } from '@mui/material';
import { DetailsContainer } from '@/components/UI';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';

// Snackbar
import { enqueueSnackbar } from 'notistack';

// Services
import { getUserVotes } from '@/services/review';

// Utils
import { VoteTypes } from '@/utils/constants';

// Chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
import { Pie } from 'react-chartjs-2';

const VotesGraph = () => {
  const [votes, setVotes] = useState([]);
  const { details } = useProfileContext();

  const fetchUserVotes = async () => {
    try {
      const response = await getUserVotes(details.id);
      setVotes(response.data);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  useEffect(() => {
    if (details?.id) fetchUserVotes();
  }, [details?.id]);

  const countByType = votes.reduce((accumulator, vote) => {
    if (accumulator[vote.type]) {
      accumulator[vote.type]++;
    } else {
      accumulator[vote.type] = 1;
    }
    return accumulator;
  }, {});

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
        text: 'Listing',
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10,
        },
        display: false,
      },
      y: {
        ticks: {
          stepSize: 1,
        },
        display: false,
      },
    },
  };

  const data = {
    labels: [
      VoteTypes.COOL,
      VoteTypes.USEFUL,
      VoteTypes.FUNNY,
      VoteTypes.LIKE,
      VoteTypes.DISLIKE,
    ],
    datasets: [
      {
        label: 'Number of Records',
        data: [
          countByType[VoteTypes.COOL],
          countByType[VoteTypes.USEFUL],
          countByType[VoteTypes.FUNNY],
          countByType[VoteTypes.LIKE],
          countByType[VoteTypes.DISLIKE],
        ],
        backgroundColor: ['orange', 'red', 'blue', 'purple', 'yellow'],
      },
    ],
  };
  return (
    <DetailsContainer>
      <Box sx={{ height: '400px' }}>
        <Pie data={data} options={options} />
      </Box>
    </DetailsContainer>
  );
};

export default VotesGraph;
