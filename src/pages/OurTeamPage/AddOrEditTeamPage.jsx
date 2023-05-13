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
import useTeam from "../../hooks/useTeam";


function AddOrEditTeamPage() {
  const { addTeam, isLoading, error } = useTeam();
  const navigate = useNavigate();

  const [isSending, setSending] = useState(false);

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
    addTeam({
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
              label="Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
              required
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

export default AddOrEditTeamPage;
