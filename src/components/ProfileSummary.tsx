import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { RootState } from '../store/store';

export default function ProfileSummary() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  if (!user) {
    return null;
  }

  return (
    <div className="profile-summary">
      <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
      <div>
        <strong>{user.name}</strong>
        <div className="muted">{user.email}</div>
      </div>
      <button type="button" className="logout-btn" onClick={() => dispatch(logout())}>
        Logout
      </button>
    </div>
  );
}
