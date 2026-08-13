import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <div className="auth-required">Please login to continue.</div>;
  }

  return <>{children}</>;
}
