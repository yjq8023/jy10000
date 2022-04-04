import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home11234</h1>
      <div>
        <Link to="page1">to page11</Link>
        <br />
        <Link to="page2">to page2</Link>
        <br />
        <Link to="login">to login</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
