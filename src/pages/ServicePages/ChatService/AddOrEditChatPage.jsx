import {
  Button,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../../../components/containers/FormContainer";
import FormPageContainer from "../../../components/containers/FormPageContainer";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { storage } from "../../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import UseChatService from "../../../hooks/useChatService";
import Preloader from "../../../components/preloader/Preloader";

function AddOrEditChatPage() {
  const { addService, isLoading, error } = UseChatService()
  const navigate = useNavigate();

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [serviceData, setServiceData] = useState([]);
  const [serviceTitle, setServiceTitle] = useState()
  const [serviceDesc, setServiceDesc] = useState()

  const [processData, setProcessData] = useState([])
  const [processTitle, setprocessTitle] = useState()

  const [advantage, setAdvantage] = useState()
  const [advantageArr, setAdvantageArr] = useState([])

  const [statistik, setStatistick] = useState()

  const [isSending, setSending] = useState(false);

  const saveServices = () => {
    setServiceData([...serviceData, {
      title: serviceTitle,
      description: serviceDesc,
    }])
    setServiceTitle("")
    setServiceDesc("")
  }

  const saveProcceses = () => {
    setProcessData([...processData, {
      title: processTitle,
      statistik
    }])
    setStatistick("")
    setprocessTitle("")
  }

  const submit = (e) => {
    e.preventDefault();
    if (isSending) return null;
    setSending(true);
    addService({
      title: title,
      description: description,
      services: serviceData,
      process: processData,
      advantage: advantageArr
    })
      .finally(() => {
        setSending(false);
      })
      .then(() => {
        toast.success("Сервис был успешно создан!");
        navigate("/");
      });
  }

  return (
    <FormPageContainer>
      <FormContainer>
        <form onSubmit={submit}>
          <div className="inputs">
            <TextField
              label="Title"
              variant="outlined"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              onChange={(e) => setDescription(e.target.value)}
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
            }}>{`Услуги которые мы предоставляем. ${serviceData.length != 0 ? serviceData.length : ''}`}</Typography>
            <div className="inputs">
              <TextField
                onChange={(e) => setServiceTitle(e.target.value)}
                label="Title"
                variant="outlined"
                value={serviceTitle}
                sx={{
                  width: '100%'
                }}
              />
              <TextField
                onChange={(e) => setServiceDesc(e.target.value)}
                label="Description"
                variant="outlined"
                value={serviceDesc}
                sx={{
                  width: '100%'
                }}
              />
              <Button variant="contained" component="label" sx={{
                width: '100%',
              }} onClick={saveServices} >
                Save
              </Button>
            </div>
            <Grid>
              <Typography variant="h4" sx={{
                marginTop: '50px',
                marginBottom: '20px',
              }}>{`Преимущества. ${advantageArr.length != 0 ? advantageArr.length : ''}`}</Typography>
              <Grid sx={{
                display: 'flex'
              }}>
                <TextField
                  onChange={(e) => setAdvantage(e.target.value)}
                  label="Title"
                  variant="outlined"
                  value={advantage}
                  sx={{
                    width: '60%'
                  }}
                />
                <Button variant="contained" component="label" sx={{
                  width: '30%',
                }} onClick={() => {
                  setAdvantageArr([...advantageArr, advantage])
                  setAdvantage("")
                }} >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{
            width: '60%'
          }}>
            <Typography variant="h4" sx={{
              marginTop: '50px',
              marginBottom: '20px',
            }}>{`Статистика. ${processData.length != 0 ? processData.length : ""}`}</Typography>
            <div className="inputs">
              <TextField
                onChange={(e) => setprocessTitle(e.target.value)}
                label="Title"
                variant="outlined"
                value={processTitle}
                sx={{
                  width: '100%'
                }}
              />
              <TextField
                onChange={(e) => setStatistick(e.target.value)}
                label="Статистика"
                variant="outlined"
                value={statistik}
                sx={{
                  width: '100%'
                }}
              />
              <Button variant="contained" component="label" sx={{
                width: '100%',
              }} onClick={saveProcceses} >
                Save
              </Button>
            </div>
          </Grid>
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
        </form>
      </FormContainer>
    </FormPageContainer>
  );
}

export default AddOrEditChatPage;
