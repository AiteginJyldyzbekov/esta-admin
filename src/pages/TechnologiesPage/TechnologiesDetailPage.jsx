import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Preloader from "../../components/preloader/Preloader";
import { TextField, Button } from "@mui/material";
import FormPageContainer from "../../components/containers/FormPageContainer";
import FormContainer from "../../components/containers/FormContainer";
import useTechnologies from "../../hooks/useTechnologies";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase/firebase";

function TechnologiesDetailPage() {
  const { id } = useParams();
  const { getTechnologiesDetail, technologiesDetail, isLoading, error, updateTechnologies } = useTechnologies();
  const [isSending, setSending] = useState(false);
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [category, setCategory] = useState();

  const [mainUrl, setMainUrl] = useState()
  const [mainImg, setMainImg] = useState();

  const handleMainImg = (target) => {
    if (target.files[0]) {
      setMainUrl(target.files[0]);
    }
  };

  useEffect(() => {
    if (technologiesDetail) {
      setTitle(technologiesDetail.title)
      setCategory(technologiesDetail.category)
    }
  }, [technologiesDetail])

  useEffect(() => {
    if (id) {
      getTechnologiesDetail(id);
    }
  }, [id]);

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
    updateTechnologies(id, {
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


  if (isLoading) return <Preloader full />;
  if (error) return <h1>{error}</h1>;
  return (
    <FormPageContainer>
      <FormContainer>
        <form onSubmit={submit}>
          <div className="inputs">
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Category"
              variant="outlined"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <Button variant="contained" component="label">
              Изменить картинку
              <input hidden accept="image/*" multiple type="file" name="file" onChange={(e) => handleMainImg(e.target)} />
            </Button>
          </div>
          <div className="inputs">
            {technologiesDetail?.image && !mainImg ? <img src={technologiesDetail?.image} alt="Main image" width={150} /> : <img src={mainImg} alt="Main image" width={150} />}
          </div>
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
        </form>
      </FormContainer>
    </FormPageContainer>
  );
}

export default TechnologiesDetailPage;
