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


function AddOrEditChatPage() {
  const { addService, isLoading, error } = UseChatService()
  const navigate = useNavigate();

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [serviceData, setServiceData] = useState([]);
  const [serviceTitle, setServiceTitle] = useState()
  const [serviceDesc, setServiceDesc] = useState()
  const [serviceUrl, setServiceUrl] = useState()
  const [serviceImg, setServiceImg] = useState();

  const [processData, setProcessData] = useState([])
  const [processTitle, setprocessTitle] = useState()
  const [processDesc, setProcessDesc] = useState()

  const [mainUrl, setMainUrl] = useState()
  const [mainImg, setMainImg] = useState();

  const [isSending, setSending] = useState(false);

  const handleServiceImg = (target) => {
    if (target.files[0]) {
      setServiceUrl(target.files[0]);
    }
  };

  const handleMainImg = (target) => {
    if (target.files[0]) {
      setMainUrl(target.files[0]);
    }
  };

  useMemo(() => {
    if (mainUrl) {
      const imageRef = ref(storage, mainUrl.name)
      uploadBytes(imageRef, mainUrl).then(() => {
        getDownloadURL(imageRef).then((url) => {
          setMainImg(url)
        }).catch((error) => {
          console.log(error.message, "error")
        })
        setMainImg(null)
      }).catch((error) => {
        console.log(error.message, "error")
      })
    }
  }, [mainUrl])

  useMemo(() => {
    if (serviceUrl) {
      const imageRef = ref(storage, serviceUrl.name)
      uploadBytes(imageRef, serviceUrl).then(() => {
        getDownloadURL(imageRef).then((url) => {
          setServiceImg(url)
        }).catch((error) => {
          console.log(error.message, "error")
        })
        setServiceImg(null)
      }).catch((error) => {
        console.log(error.message, "error")
      })
    }
  }, [serviceUrl])

  const saveServices = () => {
    setServiceData([...serviceData, {
      title: serviceTitle,
      description: serviceDesc,
      image: serviceImg,
    }])
    setServiceImg("")
    setServiceTitle("")
    setServiceDesc("")
  }

  const saveProcceses = () => {
    setProcessData([...processData, {
      title: processTitle,
      description: processDesc,
    }])
    setprocessTitle("")
    setProcessDesc("")
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
      image: mainImg
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
            <Button variant="contained" component="label">
              Upload main image
              <input hidden accept="image/*" multiple type="file" name="file" onChange={(e) => handleMainImg(e.target)} />
            </Button>
            {mainImg && <img src={mainImg} alt="Main image" width={150} />}
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
              <Button variant="contained" component="label">
                Upload services image
                <input hidden accept="image/*" multiple type="file" name="file" onChange={(e) => handleServiceImg(e.target)} />
              </Button>
              <Button variant="contained" component="label" sx={{
                width: '100%',
              }} onClick={saveServices} >
                Save
              </Button>
            </div>
            {serviceImg && <img src={serviceImg} alt="service image" width={150} />}
          </Grid>
          <Grid sx={{
            width: '60%'
          }}>
            <Typography variant="h4" sx={{
              marginTop: '50px',
              marginBottom: '20px',
            }}>{`Процесс. ${processData.length != 0 ? processData.length : ""}`}</Typography>
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
                onChange={(e) => setProcessDesc(e.target.value)}
                label="Description"
                variant="outlined"
                value={processDesc}
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
