import { useEffect, useMemo } from "react";
import PageContainer from "../../components/containers/PageContainer";
import TableContainer from "../../components/TableContainer/TableContainer";
import { TableRow, TableCell } from "@mui/material";
import Preloader from "../../components/preloader/Preloader";
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
      title="Отзывы"
      pathToAdd="/feedback/create"
      btnText={"+ Добавить отзыв"}
    >
      <TableContainer
        isLoading={isLoading}
        Header={
          <TableRow>
            <TableCell>Имя</TableCell>
            <TableCell>Описание</TableCell>
            <TableCell>Оценка</TableCell>
            <TableCell>Картинка</TableCell>
            <TableCell />
          </TableRow>
        }
        Body={renderList}
      />
    </PageContainer>
  );
}

export default FeedbackPage;
