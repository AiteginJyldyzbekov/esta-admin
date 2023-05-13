import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Preloader from "../../components/preloader/Preloader";
import {
    TextField,
} from "@mui/material";
import FormPageContainer from "../../components/containers/FormPageContainer";
import FormContainer from "../../components/containers/FormContainer";
import useTeam from "../../hooks/useTeam";

function OurTeamDetail() {
    const { id } = useParams();
    const { getTeamDetail, ourTeamDetail, isLoading, error } = useTeam();

    useEffect(() => {
        if (id) {
            getTeamDetail(id);
        }
    }, [id]);

    if (isLoading) return <Preloader full />;
    if (error) return <h1>{error}</h1>;
    return (
        <FormPageContainer>
            <FormContainer>
                <div className="inputs">
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={ourTeamDetail?.name}
                        required
                    />
                    <TextField
                        value={ourTeamDetail?.speciality}
                        label="Speciality"
                        variant="outlined"
                        sx={{
                            width: '100%'
                        }}
                    />
                    {ourTeamDetail?.image && <img src={ourTeamDetail?.image} alt="Main image" width={150} />}
                </div>
            </FormContainer>
        </FormPageContainer>
    );
}

export default OurTeamDetail;
