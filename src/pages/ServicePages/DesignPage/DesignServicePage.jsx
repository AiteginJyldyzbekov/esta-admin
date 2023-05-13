import { useEffect, useMemo } from "react";
import PageContainer from "../../../components/containers/PageContainer";
import TableContainer from "../../../components/TableContainer/TableContainer";
import { TableRow, TableCell } from "@mui/material";
import ServiceTable from "../../../components/tables/ServiceTable";
import Preloader from "../../../components/preloader/Preloader";
import UseDesignService from "../../../hooks/useDesignServices";

function DesignServicePage() {
  const { services, getServices, isLoading } = UseDesignService()

  useEffect(() => {
    getServices();
  }, [getServices]);

  const renderList = useMemo(
    () => services.map((el) => <ServiceTable key={el.tid} {...el} route="designService" collection='designServices' />),
    [services]
  );

  if (isLoading) return <Preloader full />;
  return (
    <PageContainer
      title="Design services"
      pathToAdd="/designService/create"
      btnText={"+ Добавить услугу"}
    >
      <TableContainer
        isLoading={isLoading}
        Header={
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Транспорты</TableCell>
            <TableCell>Длительность</TableCell>
            <TableCell />
          </TableRow>
        }
        Body={renderList}
      />
    </PageContainer>
  );
}

export default DesignServicePage;
