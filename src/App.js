import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './Contents/Rootlayout/rootlayout';
import Home from './Contents/Home/home';
import Register from './Contents/Register/register';
import Login from './Contents/Login/login';
import AboutUs from './Contents/AboutUs/AboutUs';
import UserProfile from './Contents/UserProfile/userprofile';
import Product from './Contents/Product/product';
import Cart from './Contents/Cart/cart';

function App() {
  
  // create browser router function  
  const router= createBrowserRouter([
    {
    path:'/',
    element:<RootLayout />,
    children:[
    {
      path:'/',
      element:<Home />
    },
    {
      path:'/register',
      element:<Register />
    },
    {
      path:'/login',
      element:<Login />,
    },
    {
      path:'/aboutus',
      element:<AboutUs />
    },
    {
      path:'/user-profile',
      element:<UserProfile />,
      children:[
        {
          path:'products',
          element:<Product />
        },
        {
          path:'cart',
          element:<Cart />
        }
      ]
    }
  ]
}
]);
  
  return(
  <div className='app'>
    <RouterProvider router={router} />
    </div>
  )
}

export default App;