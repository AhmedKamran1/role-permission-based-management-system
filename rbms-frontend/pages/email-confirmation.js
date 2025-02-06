import React from 'react';
import EmailConfirmation from '@/components/email-confirmation/email-confirmation';
import withAuth from '@/components/auth/with-auth';

const EmailConfirmationPage = () => {
  return <EmailConfirmation />;
};

export default withAuth(EmailConfirmationPage);
