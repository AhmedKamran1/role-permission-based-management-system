import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const withAuth = (WrappedComponent, options = {}) => {
  const AuthGuard = (props) => {
    const { roles = [null], requiredPermission = null, redirect = '/login' } = options;

    const router = useRouter();
    const user = useSelector((state) => state.user);
    const permissions = user?.permissions || [null];

    const hasAccess = useMemo(() => {
      return permissions.includes(requiredPermission) && roles.includes(user?.role);
    }, [permissions.length, user?.role, requiredPermission, roles.length]);

    useEffect(() => {
      if (!hasAccess) router.push(redirect);
      // eslint-disable-next-line
    }, [hasAccess, redirect]);

    if (!hasAccess) return null;

    const getLayout = WrappedComponent.getLayout || ((page) => page);
    return getLayout(<WrappedComponent {...props} />);
  };

  return AuthGuard;
};

export default withAuth;
