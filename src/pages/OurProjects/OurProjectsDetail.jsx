import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Preloader from "../../components/preloader/Preloader";
import {
    TextField,
} from "@mui/material";
import FormPageContainer from "../../components/containers/FormPageContainer";
import FormContainer from "../../components/containers/FormContainer";
import useProjects from "../../hooks/useProjects";

function OurProjectsDetail() {
    const { id } = useParams();
    const { getProjectDetail, projectDetail, isLoading, error } = useProjects();

    useEffect(() => {
        if (id) {
            getProjectDetail(id);
        }
    }, [id]);

    if (isLoading) return <Preloader full />;
    if (error) return <h1>{error}</h1>;
    return (
        <FormPageContainer>
            <FormContainer>
                <div className="inputs">
                    <TextField
                        value={projectDetail?.companyName}
                        label="Company name"
                        variant="outlined"
                        sx={{
                            width: '100%'
                        }}
                    />
                    <TextField
                        value={projectDetail?.companyDesc}
                        label="Company description"
                        variant="outlined"
                        sx={{
                            width: '100%'
                        }}
                    />
                    {
                        projectDetail?.tasks.map((el, index) => (
                            <TextField
                                value={el}
                                label={`Task ${index + 1}`}
                                variant="outlined"
                                sx={{
                                    width: '100%'
                                }}
                            />
                        ))
                    }
                    {projectDetail?.image && <img src={projectDetail?.image} alt="Main image" width={150} />}
                </div>
            </FormContainer>
        </FormPageContainer>
    );
}

export default OurProjectsDetail;
