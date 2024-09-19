import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';  
import { store } from './redux/store';   
import DisplayStatus from './pages/DisplayStatus';
import DisplayUser from './pages/DisplayUser';
import DisplayPriority from './pages/DisplayPriority';
import Layout from './pages/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/status" replace /> },
      { path: "status", element: <DisplayStatus /> },
      { path: "user", element: <DisplayUser /> },
      { path: "priority", element: <DisplayPriority /> },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}> 
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
