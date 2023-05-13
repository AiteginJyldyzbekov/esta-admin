import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Preloader from "../../../components/preloader/Preloader";
import UseServices from "../../../hooks/useWebServices";
import {
  TextField,
  TextareaAutosize,
} from "@mui/material";
import FormPageContainer from "../../../components/containers/FormPageContainer";
import FormContainer from "../../../components/containers/FormContainer";
import { Grid } from "@mui/material";

function WebDetailPage() {
  const { id } = useParams();
  const { getServiceDetail, serviceDetail, isLoading, error, updateService } = UseServices();

  useEffect(() => {
    if (id) {
      getServiceDetail(id);
    }
  }, [id]);

  if (isLoading) return <Preloader full />;
  if (error) return <h1>{error}</h1>;
  return (
    <FormPageContainer>
      <FormContainer>
        <div className="inputs">
          <TextField
            label="Title"
            variant="outlined"
            value={serviceDetail.title}
            required
          />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            value={serviceDetail.description}
            placeholder="Description"
            sx={{
              width: '100%'
            }}
            required
          />
        </div>
        <Grid sx={{
          width: '60%'
        }}>
          <Typography variant="h4" sx={{
            marginTop: '50px',
            marginBottom: '20px',
          }}>Услуги которые мы предоставляем.</Typography>
          <div className="inputs">
            {serviceDetail?.services.map((el) => (
              <>
                <TextField
                  value={el.title}
                  label="Title"
                  variant="outlined"
                  sx={{
                    width: '100%'
                  }}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  value={el.description}
                  sx={{
                    width: '100%'
                  }}
                />
                {el.image && <img src={el.image} alt="service image" width={150} />}
              </>
            ))}
          </div>
          <Typography variant="h4" sx={{
            marginTop: '50px',
            marginBottom: '20px',
          }}>Процессы</Typography>
          <div className="inputs">
            {
              serviceDetail?.process.map((el) => (
                <>
                  <TextField
                    value={el.title}
                    label="Title"
                    variant="outlined"
                    sx={{
                      width: '100%'
                    }}
                  />
                  <TextField
                    label="Description"
                    variant="outlined"
                    value={el.description}
                    sx={{
                      width: '100%'
                    }}
                  />
                </>
              ))
            }
          </div>
        </Grid>
      </FormContainer>
    </FormPageContainer>
  );
}

export default WebDetailPage;
