import { Outlet, Link } from 'react-router-dom'
export default () => {
  return <div>
    <h1>Home11</h1>
    <div>
      <Link to='page1'>to page1</Link>
      <br/>
      <Link to='page2'>to page2</Link>
      <br/>
      <Link to='login'>to login</Link>
    </div>
    <div>
      <Outlet></Outlet>
    </div>
  </div>
}
