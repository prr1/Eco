import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigationbar from '../Navigationbar/navigationbar';
import Footer from '../Footer/footer';

function RootLayout(){
  
  return (
    <div className='root'>
      {/*Navigation Bar*/}
      <Navigationbar />

      {/*Content*/}
      <div style={{minHeight:'72vh'}}>
        <Outlet />
      </div>

      {/*Footer*/}
      <Footer />
    </div>
  )
}

export default RootLayout;