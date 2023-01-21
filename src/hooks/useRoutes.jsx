import { Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import SideBar from "../components/sidebar/SideBar";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFound from "../pages/NotFound/NotFound";

const useRoutes = (isAuth) => {
  if (!isAuth) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    );
  }

  return (
    <Grid container spacing={5}>
      <Grid item lg={2.5} md={2}>
        <SideBar />
      </Grid>
      <Grid item>
        <Routes>
          <Route path="/" element={<h1>Main</h1>} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default useRoutes;
