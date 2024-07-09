import { Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import SideBar from "../components/sidebar/SideBar";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFound from "../pages/NotFound/NotFound";
import FeedbackPage from "../pages/FeedbackPage/FeedbackPage";
import AddOrEditFeedback from "../pages/FeedbackPage/AddOrEditFeedback";
import FeedbackDetailPage from "../pages/FeedbackPage/FeedbackDetailPage";
import CatalogPage from "../pages/CatalogPage/CatalogPage";
import AddOrEditCatalog from "../pages/CatalogPage/AddOrEditCatalog";
import CatalogDetail from "../pages/CatalogPage/CatalogDetail";
import ProductPage from "../pages/ProductPage/ProductPage";
import AddOrEditProduct from "../pages/ProductPage/AddOrEditProduct";
import ProductDetail from "../pages/ProductPage/ProductDetail";
import NewsPage from "../pages/NewsPage/NewsPage";
import AddOrEditNews from "../pages/NewsPage/AddOrEditNews";
import NewsDetail from "../pages/NewsPage/NewsDetail";

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
          <Route path="/" element={<CatalogPage />} />
          <Route path="/catalog/create" element={<AddOrEditCatalog />} />
          <Route path="/catalog/:id" element={<CatalogDetail />} />

          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/create" element={<AddOrEditProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/create" element={<AddOrEditNews />} />
          <Route path="/news/:id" element={<NewsDetail />} />

          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/feedback/create" element={<AddOrEditFeedback />} />
          <Route path="/feedback/:id" element={<FeedbackDetailPage />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default useRoutes;
