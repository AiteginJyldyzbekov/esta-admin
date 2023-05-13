import { Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import SideBar from "../components/sidebar/SideBar";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFound from "../pages/NotFound/NotFound";
import AddOrEditWebPage from "../pages/ServicePages/WebPage/AddOrEditWebPage";
import TechnologiesPage from "../pages/TechnologiesPage/TechnologiesPage";
import AddOrEditTechnologies from "../pages/TechnologiesPage/AddOrEditTechnologies";
import TechnologiesDetailPage from "../pages/TechnologiesPage/TechnologiesDetailPage";
import FeedbackPage from "../pages/FeedbackPage/FeedbackPage";
import AddOrEditFeedback from "../pages/FeedbackPage/AddOrEditFeedback";
import FeedbackDetailPage from "../pages/FeedbackPage/FeedbackDetailPage";
import OurTeamPage from "../pages/OurTeamPage/OurTeamPage";
import AddOrEditTeamPage from "../pages/OurTeamPage/AddOrEditTeamPage";
import OurTeamDetail from "../pages/OurTeamPage/OurTeamDetail";
import OurProjectsPage from "../pages/OurProjects/OurProjectsPage";
import AddOrEditProjectPage from "../pages/OurProjects/AddOrEditProjects";
import OurProjectsDetail from "../pages/OurProjects/OurProjectsDetail";
import WebServicePage from "../pages/ServicePages/WebPage/WebServicePage";
import WebDetailPage from "../pages/ServicePages/WebPage/WebDetailPage";
import DesignServicePage from "../pages/ServicePages/DesignPage/DesignServicePage";
import AddOrEditDesignPage from "../pages/ServicePages/DesignPage/AddOrEditDesignPage";
import DesignDetailPage from "../pages/ServicePages/DesignPage/DesignDetailPage";
import MobileServicePage from "../pages/ServicePages/MobileService/MobileServicePage";
import AddOrEditMobilePage from "../pages/ServicePages/MobileService/AddOrEditMobilePage";
import MobileDetailPage from "../pages/ServicePages/MobileService/MobileDetailPage";
import MvpServicePage from "../pages/ServicePages/MvpPage/MvpServicePage";
import AddOrEditMvpPage from "../pages/ServicePages/MvpPage/AddOrEditMvpPage";
import MvpDetailPage from "../pages/ServicePages/MvpPage/MvpDetailPage";
import ChatServicePage from "../pages/ServicePages/ChatService/ChatServicePage";
import AddOrEditChatPage from "../pages/ServicePages/ChatService/AddOrEditChatPage";
import ChatDetailPage from "../pages/ServicePages/ChatService/ChatDetailPage";

const useRoutes = (isAuth) => {
  if (!isAuth) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <Grid container spacing={5}>
      <Grid item lg={2.5} md={2}>
        <SideBar />
      </Grid>
      <Grid item lg={9.5} md={10}>
        <Routes>
          <Route path="/" element={<WebServicePage />} />
          <Route path="/webService/create" element={<AddOrEditWebPage />} />
          <Route path="/webService/:id" element={<WebDetailPage />} />
          <Route path="/designService" element={<DesignServicePage />} />
          <Route path="/designService/create" element={<AddOrEditDesignPage />} />
          <Route path="/designService/:id" element={<DesignDetailPage />} />
          <Route path="/mobileService" element={<MobileServicePage />} />
          <Route path="/mobileService/create" element={<AddOrEditMobilePage />} />
          <Route path="/mobileService/:id" element={<MobileDetailPage />} />
          <Route path="/mvpService" element={<MvpServicePage />} />
          <Route path="/mvpService/create" element={<AddOrEditMvpPage />} />
          <Route path="/mvpService/:id" element={<MvpDetailPage />} />
          <Route path="/chatService" element={<ChatServicePage />} />
          <Route path="/chatService/create" element={<AddOrEditChatPage />} />
          <Route path="/chatService/:id" element={<ChatDetailPage />} />
          <Route path="/technologies" element={<TechnologiesPage />} />
          <Route path="/technologies/create" element={<AddOrEditTechnologies />} />
          <Route path="/technologies/:id" element={<TechnologiesDetailPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/feedback/create" element={<AddOrEditFeedback />} />
          <Route path="/feedback/:id" element={<FeedbackDetailPage />} />
          <Route path="/our-team" element={<OurTeamPage />} />
          <Route path="/our-team/create" element={<AddOrEditTeamPage />} />
          <Route path="/our-team/:id" element={<OurTeamDetail />} />
          <Route path="/projects" element={<OurProjectsPage />} />
          <Route path="/projects/create" element={<AddOrEditProjectPage />} />
          <Route path="/projects/:id" element={<OurProjectsDetail />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default useRoutes;
