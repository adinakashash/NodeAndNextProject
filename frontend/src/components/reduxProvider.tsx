import React, { ReactNode } from 'react';
import store from '@/redux/store';
import { Provider } from 'react-redux';

const ReduxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxProvider;
