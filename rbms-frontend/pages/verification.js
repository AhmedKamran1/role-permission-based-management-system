import React from 'react';
import Verification from '@/components/verification/verification';
import withAuth from '@/components/auth/with-auth';

const VerificationPage = () => {
  return <Verification />;
};

export default withAuth(VerificationPage);
