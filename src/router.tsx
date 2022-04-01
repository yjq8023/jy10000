import { lazy } from 'react'
import { Routes, Route } from "react-router-dom"

const Home = lazy(() => import('./pages/Home'))
const Page1 = lazy(() => import('./pages/page1'))
const Page2 = lazy(() => import('./pages/page2'))
const Login = lazy(() => import('./pages/Login'))

type routerConfig = {
  path: string
  element: any
  children?: routerConfig[]
}
export const routerConfig = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/page1",
        element: <Page1 />
      },
      {
        path: "/page2",
        element: <Page2 />
      }
    ]
  },
  {
    path: 'Login',
    element: <Login/>
  }
]

export const renderRoutes = (routerConfig: routerConfig[]) => {
  return routerConfig.map(({ children, ...routeProps }) =>
    <Route {...routeProps}>
      {children && renderRoutes(children)}
    </Route>
  )
}

export default (
  <Routes>
    { renderRoutes(routerConfig) }
  </Routes>
)
