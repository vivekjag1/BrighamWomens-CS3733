import { createBrowserRouter, RouterProvider } from "react-router-dom";
import paths from "./common/paths.tsx";
import routes from "./common/routes.tsx";
import Layout from "./components/Layout.tsx";
import Hero from "./routes/hero/Hero.tsx";
import MobileDirections from "./routes/MobileDirections.tsx";
import AboutUs from "./routes/AboutUs.tsx";
import Credit from "./routes/Credit.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: paths.HERO,
      element: <Hero />,
    },
    {
      path: paths.HOME,
      element: <Layout />,
      children: routes,
    },
    {
      path: paths.MOBILE_DIRECTIONS,
      element: <MobileDirections />,
    },
    {
      path: paths.ABOUT,
      element: <AboutUs />,
    },
    {
      path: paths.CREDITS,
      element: <Credit />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
