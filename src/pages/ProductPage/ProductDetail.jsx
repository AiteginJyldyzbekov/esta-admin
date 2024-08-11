import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Preloader from "../../components/preloader/Preloader";
import {
    TextField,
} from "@mui/material";
import FormPageContainer from "../../components/containers/FormPageContainer";
import FormContainer from "../../components/containers/FormContainer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useProducts from "../../hooks/useProducts";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getProductDetail, updateProduct, productDetail, isLoading, error } = useProducts();

    const [question, setQuestion] = useState("");
    const [ans, setAns] = useState("");

    useEffect(() => {
        if (productDetail) {
            setQuestion(productDetail?.question)
            setAns(productDetail?.ans)
        }
    }, [productDetail])

    useEffect(() => {
        if (id) {
            getProductDetail(id);
        }
    }, [id]);

    const submit = (e) => {
        e.preventDefault();
        const updatedData = {
            question,
            ans
        }
        updateProduct(id, updatedData)
            .then(() => {
                toast.success("Успешно обновлен!");
                navigate("/");
            });
    }

    if (isLoading) return <Preloader full />;
    if (error) return <h1>{error}</h1>;
    return (
        <FormPageContainer>
            <FormContainer>
                <form onSubmit={submit}>
                    <div className="inputs">
                        <TextField
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            label="Вопрос"
                            variant="outlined"
                            sx={{
                                width: '100%'
                            }}
                        />
                        <TextField
                            value={ans}
                            onChange={(e) => setAns(e.target.value)}
                            label="Ответ"
                            variant="outlined"
                            sx={{
                                width: '100%'
                            }}
                        />
                    </div>
                    <div className="inputs">
                        <Button type="submit" variant="contained">
                            Сохранить
                        </Button>
                    </div>
                </form>
            </FormContainer>
        </FormPageContainer>
    );
}

export default ProductDetail;
