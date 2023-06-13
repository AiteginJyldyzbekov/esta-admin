import { useEffect, useMemo } from "react";
import PageContainer from "../../components/containers/PageContainer";
import TableContainer from "../../components/TableContainer/TableContainer";
import { TableRow, TableCell } from "@mui/material";
import Preloader from "../../components/preloader/Preloader";
import UseServices from "../../hooks/useWebServices";
import FeedbackTable from "../../components/tables/FeedbackTable";
import useFeedback from "../../hooks/useFeedback";

function FeedbackPage() {
  const { feedbacks, getFeedbacks, isLoading } = useFeedback();

  useEffect(() => {
    getFeedbacks();
  }, [getFeedbacks]);

  const renderList = useMemo(
    () => feedbacks.map((el) => <FeedbackTable key={el.tid} {...el} />),
    [feedbacks]
    
  );

  if (isLoading) return <Preloader full />;
  return (
    <PageContainer
      title="Services"
      pathToAdd="/feedback/create"
      btnText={"+ Добавить отзыв"}
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

export default FeedbackPage;
