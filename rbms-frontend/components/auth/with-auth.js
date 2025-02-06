import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectUserState } from '@/store/user/userSlice';

const withAuth = (WrappedComponent, options = {}) => {
  const AuthGuard = (props) => {
    const { roles = [null], redirect = '/' } = options;
    const router = useRouter();
    const user = useSelector(selectUserState);

    const checkAuth = useCallback(() => {
      if (!roles.includes(user.role)) {
        router.push(redirect);
      }
    }, [router, user.role, roles, redirect]);

    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    return roles.includes(user.role) ? <WrappedComponent {...props} /> : null;
  };

  AuthGuard.getLayout = WrappedComponent.getLayout;
  return AuthGuard;
};

export default withAuth;
