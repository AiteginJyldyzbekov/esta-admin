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
import { Grid } from "@mui/material";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import useProjects from "../../hooks/useProjects";
import Preloader from "../../components/preloader/Preloader";

function AddOrEditProjectPage() {
  const { addProject, isLoading, error } = useProjects();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [companyDesc, setCompanyDesc] = useState("");

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  const [isSending, setSending] = useState(false);

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

  const handleAdd = () => {
    setTasks([...tasks, task])
    setTask("")
  }

  const submit = (e) => {
    e.preventDefault();
    if (isSending) return null;
    setSending(true);
    addProject({
      companyName,
      companyDesc,
      tasks,
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
              onChange={(e) => setCompanyName(e.target.value)}
              label="Company name"
              variant="outlined"
              sx={{
                width: '100%'
              }}
            />
            <TextField
              onChange={(e) => setCompanyDesc(e.target.value)}
              label="Company description"
              variant="outlined"
              sx={{
                width: '100%'
              }}
            />
            <Grid sx={{
              display: 'flex'
            }}>
              <TextField
                onChange={(e) => setTask(e.target.value)}
                label={`Tasks ${tasks.length != 0 ? tasks.length : ""}`}
                value={task}
                variant="outlined"
                sx={{
                  width: '100%'
                }}
              />
              <Button variant="contained" onClick={() => handleAdd()}>Save</Button>
            </Grid>
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

export default AddOrEditProjectPage;
