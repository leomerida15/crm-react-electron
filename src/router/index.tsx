import { useLocation } from "react-router-dom";
import { Auth, NoAuth } from "./guards";
import PrivatesRoutes from "./routes/privates";
import PublicRoutes from "./routes/publics";

const Router = () => (
  <>
    <NoAuth>
      <PublicRoutes />
    </NoAuth>
    {/*  */}
    <Auth>
      <PrivatesRoutes />
    </Auth>
  </>
);

export default Router;
