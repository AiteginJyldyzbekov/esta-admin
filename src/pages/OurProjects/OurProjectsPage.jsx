import { useEffect, useMemo } from "react";
import PageContainer from "../../components/containers/PageContainer";
import TableContainer from "../../components/TableContainer/TableContainer";
import { TableRow, TableCell } from "@mui/material";
import Preloader from "../../components/preloader/Preloader";
import OurProjectsTable from "../../components/tables/OurProjectsTable";
import useProjects from "../../hooks/useProjects";

function OurProjectsPage() {
    const { projects, getProjects, isLoading } = useProjects();

    useEffect(() => {
        getProjects();
    }, [getProjects]);

    const renderList = useMemo(
        () => projects.map((el) => <OurProjectsTable key={el.tid} {...el} />),
        [projects]
    );

    if (isLoading) return <Preloader full />;
    return (
        <PageContainer
            title="Projects"
            pathToAdd="/projects/create"
            btnText={"+ Добавить проект"}
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

export default OurProjectsPage;
