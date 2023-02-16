import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import PageContainer from "../../components/containers/PageContainer";
import Preloader from "../../components/preloader/Preloader";
import TableContainer from "../../components/TableContainer/TableContainer";
import TransportTable from "../../components/tables/TransportTable";
import useTours from "../../hooks/useTours";
import useTransports from "../../hooks/useTransports";

function TourDetailPage() {
  const { id } = useParams();
  const { error, isLoading, getTourDetail, tourDetail } = useTours();
  const { getTransports, transports } = useTransports();

  useEffect(() => {
    getTourDetail(id);
  }, [id]);

  useEffect(() => {
    getTransports(id);
  }, []);

  const renderTransports = useMemo(() =>
    transports.map((el) => <TransportTable key={el.tid} {...el} />)
  );

  if (isLoading) return <Preloader full />;
  if (error) return <h1>{error}</h1>;
  return (
    <PageContainer title={"Тур: " + tourDetail.name}>
      <div>
        <Typography variant="h6">Откуда: {tourDetail.from?.label}</Typography>
        <Typography variant="h6">Куда: {tourDetail.to?.label}</Typography>
        <Typography variant="h6">
          Длительность: {tourDetail.duration}мин
        </Typography>
        <Typography variant="h6">Информация: {tourDetail.info}</Typography>
        <br />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Транспорты</Typography>
          <Link to={`/transport/create/${id}`}> <Button variant="contained">+ Добавить транспорт</Button></Link>
        </Box>
        <br />
        <TableContainer
          isLoading={false}
          Header={
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Водитель</TableCell>
              <TableCell>Номер Маш.</TableCell>
              <TableCell>Телефон</TableCell>
            </TableRow>
          }
          Body={renderTransports}
        />
      </div>
    </PageContainer>
  );
}

export default TourDetailPage;
