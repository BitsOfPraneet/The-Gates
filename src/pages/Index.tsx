import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/AuthForm';
import Profile from '@/components/Profile';
import SpookyLoader from '@/components/SpookyLoader';

const Index = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SpookyLoader />
      </div>
    );
  }

  return currentUser ? <Profile /> : <AuthForm />;
};

export default Index;
