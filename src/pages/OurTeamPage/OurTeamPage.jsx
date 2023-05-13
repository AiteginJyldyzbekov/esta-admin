import { useEffect, useMemo } from "react";
import PageContainer from "../../components/containers/PageContainer";
import TableContainer from "../../components/TableContainer/TableContainer";
import { TableRow, TableCell } from "@mui/material";
import Preloader from "../../components/preloader/Preloader";
import UseServices from "../../hooks/useWebServices";
import OurTeamTable from "../../components/tables/OurTeamTable";
import useTeam from "../../hooks/useTeam";

function OurTeamPage() {
  const { ourTeam, getTeam, isLoading } = useTeam();

  useEffect(() => {
    getTeam();
  }, [getTeam]);

  const renderList = useMemo(
    () => ourTeam.map((el) => <OurTeamTable key={el.tid} {...el} />),
    [ourTeam]
  );

  if (isLoading) return <Preloader full />;
  return (
    <PageContainer
      title="Services"
      pathToAdd="/our-team/create"
      btnText={"+ Добавить коллегу"}
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

export default OurTeamPage;
