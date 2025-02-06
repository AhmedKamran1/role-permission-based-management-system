import React, { useContext, useState, createContext } from 'react';

const ProfileContext = createContext();

const ProfileProvider = ({ children, initialValue }) => {
  const [details, setDetails] = useState(initialValue);

  const detailsHandler = (updatedDetails) => {
    setDetails((prevState) => ({
      ...prevState,
      ...updatedDetails,
    }));
  };

  const profileContext = {
    details,
    detailsHandler,
  };

  return (
    <ProfileContext.Provider value={profileContext}>{children}</ProfileContext.Provider>
  );
};

const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfileContext requires ProfileProvider');
  return context;
};

export { ProfileProvider, useProfileContext };
