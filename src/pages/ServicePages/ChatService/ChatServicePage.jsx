import { useEffect, useMemo } from "react";
import PageContainer from "../../../components/containers/PageContainer";
import TableContainer from "../../../components/TableContainer/TableContainer";
import { TableRow, TableCell } from "@mui/material";
import ServiceTable from "../../../components/tables/ServiceTable";
import Preloader from "../../../components/preloader/Preloader";
import UseChatService from "../../../hooks/useChatService";

function ChatServicePage() {
  const { services, getServices, isLoading } = UseChatService()

  useEffect(() => {
    getServices();
  }, [getServices]);

  const renderList = useMemo(
    () => services.map((el) => <ServiceTable key={el.tid} {...el} route="chatService" collection='chatServices' />),
    [services]
  );

  if (isLoading) return <Preloader full />;
  return (
    <PageContainer
      title="Chat development services"
      pathToAdd="/chatService/create"
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

export default ChatServicePage;
