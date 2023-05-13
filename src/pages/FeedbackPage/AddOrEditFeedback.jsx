import {
  Button,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../../components/containers/FormContainer";
import FormPageContainer from "../../components/containers/FormPageContainer";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import UseServices from "../../hooks/useWebServices";
import useFeedback from "../../hooks/useFeedback";


function AddOrEditFeedback() {
  const { addFeedback, isLoading, error } = useFeedback()
  const navigate = useNavigate();
  const [isSending, setSending] = useState(false);

  const [company, setCompany] = useState("")
  const [description, setDescription] = useState("")
  const [name, setName] = useState("")
  const [speciality, setSpeciality] = useState("")

  const [mainUrl, setMainUrl] = useState()
  const [mainImg, setMainImg] = useState();

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


  const submit = (e) => {
    e.preventDefault();
    if (isSending) return null;
    setSending(true);
    addFeedback({
      companyName: company,
      description,
      name,
      speciality,
      image: mainImg
    })
      .finally(() => {
        setSending(false);
      })
      .then(() => {
        toast.success("Тур был успешно создан!");
        navigate("/");
      });
  }

  return (
    <FormPageContainer>
      <FormContainer>
        <form onSubmit={submit}>
          <div className="inputs">
            <TextField
              onChange={(e) => setCompany(e.target.value)}
              label="Company name"
              variant="outlined"
              value={company}
              sx={{
                width: '100%'
              }}
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
            <TextField
              onChange={(e) => setName(e.target.value)}
              label="Name"
              variant="outlined"
              value={name}
              sx={{
                width: '100%'
              }}
            />
            <TextField
              onChange={(e) => setSpeciality(e.target.value)}
              label="Speciality"
              variant="outlined"
              value={speciality}
              sx={{
                width: '100%'
              }}
            />
            <Button variant="contained" component="label">
              Upload main image
              <input hidden accept="image/*" multiple type="file" name="file" onChange={(e) => handleMainImg(e.target)} />
            </Button>
          </div>
          {mainImg && <img src={mainImg} alt="Main image" width={150} />}
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

export default AddOrEditFeedback;
