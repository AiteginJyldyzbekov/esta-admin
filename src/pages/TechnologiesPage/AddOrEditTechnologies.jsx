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
import useTechnologies from "../../hooks/useTechnologies";
import Preloader from "../../components/preloader/Preloader";

function AddOrEditTechnologies() {
  const { addTechnologies, isLoading, error } = useTechnologies();
  const navigate = useNavigate();
  const [isSending, setSending] = useState(false);

  const [title, setTitle] = useState()
  const [category, setCategory] = useState();

  const [mainUrl, setMainUrl] = useState()
  const [mainImg, setMainImg] = useState();
  const [isMainImg, setIsMainImg] = useState(false)

  const handleMainImg = (target) => {
    if (target.files[0]) {
      setMainUrl(target.files[0]);
    }
  };

  useMemo(() => {
    if (mainUrl) {
      setIsMainImg(true)
      const imageRef = ref(storage, mainUrl.name)
      uploadBytes(imageRef, mainUrl).then(() => {
        getDownloadURL(imageRef).then((url) => {
          setMainImg(url)
          setIsMainImg(false)
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
    addTechnologies({
      title: title,
      category: category,
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
              label="Title"
              variant="outlined"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Category"
              variant="outlined"
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <Button variant="contained" component="label">
              Upload main image
              <input hidden accept="image/*" multiple type="file" name="file" onChange={(e) => handleMainImg(e.target)} />
            </Button>
          </div>
          <div className="inputs">{isMainImg ? <Preloader /> : mainImg && <img src={mainImg} alt="Main image" width={150} />}</div>
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

export default AddOrEditTechnologies;
