import { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

let socket;

const NotificationContextProvider = ({ children }) => {
  socket = io('http://localhost:3009', {
    autoConnect: false,
    extraHeaders: {
      authorization: localStorage.getItem('token'),
    },
  });

  return (
    <NotificationContext.Provider value={{ socket }}>
      {children}
    </NotificationContext.Provider>
  );
};

const NotificationContext = createContext(socket);

const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotificationContext requires NotificationProvider');
  return context;
};

export { NotificationContextProvider, useNotificationContext };
