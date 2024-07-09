import { useEffect, useMemo } from "react";
import PageContainer from "../../components/containers/PageContainer";
import TableContainer from "../../components/TableContainer/TableContainer";
import { TableRow, TableCell } from "@mui/material";
import Preloader from "../../components/preloader/Preloader";
import useCatalog from "../../hooks/useCatalog";
import CatalogTable from "../../components/tables/CatalogTable";

function CatalogPage() {
    const { catalog, getCatalog, isLoading } = useCatalog();

    useEffect(() => {
        getCatalog();
    }, [getCatalog]);

    const renderList = useMemo(
        () => catalog.map((el) => <CatalogTable key={el.tid} {...el} />),
        [catalog]
    );

    if (isLoading) return <Preloader full />;
    return (
        <PageContainer
            title="Каталог"
            pathToAdd="/catalog/create"
            btnText={"+ Добавить продукт в каталог"}
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

export default CatalogPage;
