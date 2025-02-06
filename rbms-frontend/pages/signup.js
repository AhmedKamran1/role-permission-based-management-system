import React from 'react';
import Signup from '@/components/signup/signup';
import withAuth from '@/components/auth/with-auth';

const SignupPage = () => {
  return <Signup />;
};

export default withAuth(SignupPage);
