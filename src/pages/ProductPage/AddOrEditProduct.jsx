import {
  Button,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../../components/containers/FormContainer";
import FormPageContainer from "../../components/containers/FormPageContainer";
import useProducts from "../../hooks/useProducts";


function AddOrEditProduct() {
  const { addProduct, isLoading, error } = useProducts();
  const navigate = useNavigate();

  const [ans, setAns] = useState("");
  const [question, setQuestion] = useState("");

  const [isSending, setSending] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (isSending) return null;
    setSending(true);
    addProduct({
      question,
      ans
    })
      .finally(() => {
        setSending(false);
      })
      .then(() => {
        toast.success("Вопрос был успешно создан!");
        navigate("/product");
      });
  }

  return (
    <FormPageContainer>
      <FormContainer>
        <form onSubmit={submit}>
          <div className="inputs">
            <TextField
              onChange={(e) => setQuestion(e.target.value)}
              label="Вопрос"
              variant="outlined"
              sx={{
                width: '100%'
              }}
            />
            <TextField
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

export default AddOrEditProduct;
