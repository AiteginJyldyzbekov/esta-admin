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
            title="Готовая продукция"
            pathToAdd="/product/create"
            btnText={"+ Добавить продукт в готовую продукцию"}
        >
            <TableContainer
                isLoading={isLoading}
                Header={
                    <TableRow>
                        <TableCell>Название</TableCell>
                        <TableCell>Описание</TableCell>
                        <TableCell>Цена</TableCell>
                        <TableCell>Картинка</TableCell>
                        <TableCell />
                    </TableRow>
                }
                Body={renderList}
            />
        </PageContainer>
    );
}

export default ProductPage;
