import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Preloader from "../../components/preloader/Preloader";
import UseServices from "../../hooks/useWebServices";
import {
  TextField,
  TextareaAutosize,
} from "@mui/material";
import FormPageContainer from "../../components/containers/FormPageContainer";
import FormContainer from "../../components/containers/FormContainer";
import { Grid } from "@mui/material";
import useFeedback from "../../hooks/useFeedback";

function FeedbackDetailPage() {
  const { id } = useParams();
  const { getFeedbackDetail, feedbackDetail, isLoading, error } = useFeedback();

  useEffect(() => {
    if (id) {
      getFeedbackDetail(id);
    }
  }, [id]);

  if (isLoading) return <Preloader full />;
  if (error) return <h1>{error}</h1>;
  return (
    <FormPageContainer>
      <FormContainer>
        <div className="inputs">
          <TextField
            label="Company name"
            variant="outlined"
            value={feedbackDetail?.companyName}
            sx={{
              width: '100%'
            }}
          />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            value={feedbackDetail?.description}
            placeholder="Description"
            sx={{
              width: '100%'
            }}
            required
          />
          <TextField
            label="Name"
            variant="outlined"
            value={feedbackDetail?.name}
            sx={{
              width: '100%'
            }}
          />
          <TextField
            label="Speciality"
            variant="outlined"
            value={feedbackDetail?.speciality}
            sx={{
              width: '100%'
            }}
          />
          {feedbackDetail?.image && <img src={feedbackDetail?.image} alt="Main image" width={150} />}
        </div>
      </FormContainer>
    </FormPageContainer>
  );
}

export default FeedbackDetailPage;
