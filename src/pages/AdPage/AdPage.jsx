import { useEffect, useMemo } from "react";
import PageContainer from "../../components/containers/PageContainer";
import TableContainer from "../../components/TableContainer/TableContainer";
import { TableRow, TableCell } from "@mui/material";
import Preloader from "../../components/preloader/Preloader";
import useAd from "../../hooks/useAd";
import AdTable from "../../components/tables/AdTable";

function AdPage() {
  const { ads, getAds, isLoading } = useAd();

  useEffect(() => {
    getAds();
  }, [getAds]);

  const renderList = useMemo(
    () => ads.map((el) => <AdTable key={el.tid} {...el} />),
    [ads]
    
  );

  if (isLoading) return <Preloader full />;
  return (
    <PageContainer
      title="Отзывы"
      pathToAdd="/ad/create"
      btnText={"+ Добавить рекламу"}
    >
      <TableContainer
        isLoading={isLoading}
        Header={
          <TableRow>
            <TableCell>Имя</TableCell>
            <TableCell>Описание</TableCell>
            <TableCell>Картинка</TableCell>
            <TableCell />
          </TableRow>
        }
        Body={renderList}
      />
    </PageContainer>
  );
}

export default AdPage;
