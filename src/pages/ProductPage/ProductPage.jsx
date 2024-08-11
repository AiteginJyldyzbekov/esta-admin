import { useEffect, useMemo } from "react";
import PageContainer from "../../components/containers/PageContainer";
import TableContainer from "../../components/TableContainer/TableContainer";
import { TableRow, TableCell } from "@mui/material";
import Preloader from "../../components/preloader/Preloader";
import OurProjectsTable from "../../components/tables/ProductTable";
import useProducts from "../../hooks/useProducts";

function ProductPage() {
    const { products, getProducts, isLoading } = useProducts();

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const renderList = useMemo(
        () => products.map((el) => <OurProjectsTable key={el.tid} {...el} />),
        [products]
    );

    if (isLoading) return <Preloader full />;
    return (
        <PageContainer
            title="Вопросы"
            pathToAdd="/product/create"
            btnText={"+ Добавить вопрос"}
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

export default ProductPage;
