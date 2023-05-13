import { useEffect, useMemo } from "react";
import PageContainer from "../../components/containers/PageContainer";
import TableContainer from "../../components/TableContainer/TableContainer";
import { TableRow, TableCell } from "@mui/material";
import TechnologiesTable from "../../components/tables/TechnologiesTable";
import Preloader from "../../components/preloader/Preloader";
import UseServices from "../../hooks/useWebServices";
import useTechnologies from "../../hooks/useTechnologies";

function TechnologiesPage() {
  const { technologies, getTechnologies, isLoading } = useTechnologies()

  useEffect(() => {
    getTechnologies();
  }, [getTechnologies]);

  const renderList = useMemo(
    () => technologies.map((el) => <TechnologiesTable key={el.tid} {...el} />),
    [technologies]
  );

  if (isLoading) return <Preloader full />;
  return (
    <PageContainer
      title="Technologies"
      pathToAdd="/technologies/create"
      btnText={"+ Добавить технологию"}
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

export default TechnologiesPage;
