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
            title="Новости"
            pathToAdd="/news/create"
            btnText={"+ Добавить новости"}
        >
            <TableContainer
                isLoading={isLoading}
                Header={
                    <TableRow>
                        <TableCell>Заголовок</TableCell>
                        <TableCell>Опсание #1</TableCell>
                        <TableCell>Опиисание #2</TableCell>
                        <TableCell>Картинка</TableCell>
                        <TableCell />
                    </TableRow>
                }
                Body={renderList}
            />
        </PageContainer>
    );
}

export default NewsPage;
