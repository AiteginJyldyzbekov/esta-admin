import { useEffect, useMemo } from "react";
import PageContainer from "../../components/containers/PageContainer";
import TableContainer from "../../components/TableContainer/TableContainer";
import { TableRow, TableCell } from "@mui/material";
import Preloader from "../../components/preloader/Preloader";
import NewsTable from "../../components/tables/NewsTable";
import useNews from "../../hooks/useNews";

function NewsPage() {
    const { news, getNews, isLoading } = useNews();

    useEffect(() => {
        getNews();
    }, [getNews]);

    const renderList = useMemo(
        () => news.map((el) => <NewsTable key={el.tid} {...el} />),
        [news]
    );

    if (isLoading) return <Preloader full />;
    return (
        <PageContainer
            title="Этапы"
            pathToAdd="/news/create"
            btnText={"+ Добавить этапы"}
        >
            <TableContainer
                isLoading={isLoading}
                Header={
                    <TableRow>
                        <TableCell>Вопрос</TableCell>
                        <TableCell>Ответ</TableCell>
                        <TableCell></TableCell>
                        <TableCell>Удалить</TableCell>
                    </TableRow>
                }
                Body={renderList}
            />
        </PageContainer>
    );
}

export default NewsPage;
