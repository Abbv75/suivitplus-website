import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ModulesPage from "./pages/Modules.tsx";
import FeaturesPage from "./pages/Features.tsx";
import ContactPage from "./pages/Contact.tsx";
import PoliticsPage from "./pages/Politics.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/modules",
    element: <ModulesPage />,
  },
  {
    path: "/features",
    element: <FeaturesPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/politiques",
    element: <PoliticsPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
