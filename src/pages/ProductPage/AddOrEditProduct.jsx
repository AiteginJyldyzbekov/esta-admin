import {
    Button,
    Grid,
    TextField,
    TextareaAutosize,
    Typography,
  } from "@mui/material";
  import { useMemo, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { toast } from "react-toastify";
  import FormContainer from "../../components/containers/FormContainer";
  import FormPageContainer from "../../components/containers/FormPageContainer";
  import { storage } from "../../firebase/firebase";
  import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
  import { deleteObject } from "firebase/storage";
  import styles from "./Product.module.scss"
  import DeleteIcon from '@mui/icons-material/Delete';
  import CircularProgress from '@mui/material/CircularProgress';
  import { SketchPicker } from 'react-color';
  import styled from 'styled-components';
  import { Select, MenuItem } from '@mui/material';
  import OutlinedInput from '@mui/material/OutlinedInput';
  import InputLabel from '@mui/material/InputLabel';
import useProducts from "../../hooks/useProducts";
  
  const Wrapper = styled.div`
    margin-top: 20px;
  `;
  
  const ColorPickerWrapper = styled.div`
    margin-bottom: 20px;
  `;
  
  const ButtonPick = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    margin-bottom: 20px;
  
    &:hover {
      background-color: #0056b3;
    }
  `;
  
  const ColorsContainer = styled.div`
    display: flex;
  `;
  
  const ColorBox = styled.div`
    position: relative;
    background-color: ${(props) => props.color};
    width: 50px;
    height: 50px;
    margin: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  
    &:hover div {
      display: block;
    }
  `;
  
  const DeleteButton = styled.div`
    display: none;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    width: 50%;
    height: 50%;
    border-radius: 5px;
    cursor: pointer;
  
    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  `;
  
  
  function AddOrEditProduct() {
    const { addProduct, isLoading, error } = useProducts();
    const navigate = useNavigate();
  
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState();
  
    const [isSending, setSending] = useState(false);
  
    const [colors, setColors] = useState([]);
    const [currentColor, setCurrentColor] = useState('#fff');
  
    const [category, setCategory] = useState('');
    const [size, setSize] = useState([]);
  
    const sizes = [
      "36",
      "38",
      "40",
      "42",
      "44",
    ]
  
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
  
    const handleSizeChange = (event) => {
      const {
        target: { value },
      } = event;
      setSize(
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  
    const handleCategoryChange = (event) => {
      setCategory(event.target.value);
    };
  
  
    const handleChangeComplete = (color) => {
      setCurrentColor(color.hex);
    };
  
    const addColor = (e) => {
      e.preventDefault()
      if (!colors.includes(currentColor)) {
        setColors([...colors, currentColor]);
      }
    };
  
    const removeColor = (colorToRemove) => {
      setColors(colors.filter(color => color !== colorToRemove));
    };
  
  
    const submit = (e) => {
      const updatedImageData = imageData
        .filter(item => item.url !== null)
        .map(item => {
          const { file, ...rest } = item;
          return rest;
        });
      e.preventDefault();
      if (isSending) return null;
      setSending(true);
      addProduct({
        title,
        desc,
        price,
        images: updatedImageData,
        colors,
        category: category,
        size: size
      })
        .finally(() => {
          setSending(false);
        })
        .then(() => {
          toast.success("Продукт был успешно создан!");
          navigate("/product");
        });
    }
  
    const [imageData, setImageData] = useState([
      { file: null, url: null, isLoading: false },
      { file: null, url: null, isLoading: false },
      { file: null, url: null, isLoading: false },
      { file: null, url: null, isLoading: false },
      { file: null, url: null, isLoading: false },
      { file: null, url: null, isLoading: false },
      { file: null, url: null, isLoading: false },
    ])
  
    const handleImageChange = (index, target) => {
      const newImageData = [...imageData]
      const file = target.files?.[0]
      if (file) {
        newImageData[index].file = file
        setImageData(newImageData)
        uploadImages(index)
      }
    }
  
    const handleDeleteImage = async (index) => {
      const imageToDelete = imageData[index]
      const sureConfirm = window.confirm("Вы уверены что хотите удалить картинку?")
      if (sureConfirm) {
        if (imageToDelete.url) {
          const imageRef = ref(storage, imageToDelete.url)
          try {
            await deleteObject(imageRef)
            const newImageData = [...imageData]
            newImageData[index] = { ...newImageData[index], file: null, url: null, isLoading: false }
            setImageData(newImageData)
            console.log(imageData)
          } catch (error) {
            console.log(error.message, 'error')
          }
        }
      }
    }
  
    const uploadImages = async (index) => {
      const item = imageData[index]
      if (item.file && !item.isLoading) {
        const timestamp = new Date().getTime()
        const randomNumber = Math.floor(Math.random() * 10000)
        const fileName = `${timestamp}_${randomNumber}_${item.file.name}`
        const imageRef = ref(storage, fileName)
  
        try {
          const newImageData = [...imageData]
          newImageData[index].isLoading = true
          setImageData(newImageData)
  
          await uploadBytes(imageRef, item.file)
          const url = await getDownloadURL(imageRef)
  
          setImageData((prevImageData) => {
            const updatedImageData = [...prevImageData]
            updatedImageData[index].url = url
            updatedImageData[index].isLoading = false
            return updatedImageData
          })
        } catch (error) {
          console.log(error.message, 'error')
          const newImageData = [...imageData]
          newImageData[index].isLoading = false
          setImageData(newImageData)
        }
      }
    }
  
    const renderImages = useMemo(() => {
      return imageData.map((item, index) => (
        <div className={styles.image__container} key={`${item.url}_${index}`}>
          {
            item.isLoading
              ? <CircularProgress />
              : (
                <>
                  {
                    item.url
                      ? (
                        <DeleteIcon
                          className={styles.delete__icon}
                          onClick={async () => {
                            await handleDeleteImage(index)
                          }} />
                      )
                      : <Button sx={{ color: "white" }}>Загрузить</Button>
                  }
                  <input
                    className={styles.inputFile}
                    type="file"
                    onChange={(e) => { handleImageChange(index, e.target) }}
                  />
                  {
                    item?.url && <img src={item.url} />
                  }
                </>
              )
          }
        </div>
      ))
    }, [imageData])
  
    return (
      <FormPageContainer>
        <FormContainer>
          <form onSubmit={submit}>
            <div className="inputs">
              <TextField
                onChange={(e) => setTitle(e.target.value)}
                label="Название продукта"
                variant="outlined"
                sx={{
                  width: '100%'
                }}
              />
              <TextField
                onChange={(e) => setDesc(e.target.value)}
                label="Описание"
                variant="outlined"
                sx={{
                  width: '100%'
                }}
              />
              <TextField
                onChange={(e) => setPrice(e.target.value)}
                label="Цена"
                variant="outlined"
                type="number"
                sx={{
                  width: '100%'
                }}
              />
              <Grid sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-name-label">Категория</InputLabel>
                <Select
                  labelId="category-label"
                  value={category}
                  onChange={handleCategoryChange}
                  label="Категория"
                  placeholder="Категория"
                  sx={{ width: "100%" }}
                >
                  <MenuItem value="blazer">Жакет</MenuItem>
                  <MenuItem value="costume">Костюм</MenuItem>
                  <MenuItem value="jacket">Куртка</MenuItem>
                  <MenuItem value="coat">Пальто</MenuItem>
                  <MenuItem value="trenhc">Тренч</MenuItem>
                </Select>
              </Grid>
              <Grid sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-name-label">Размер</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={size}
                  onChange={handleSizeChange}
                  input={<OutlinedInput label="Размер" />}
                  MenuProps={MenuProps}
                  sx={{width: '100%'}}
                >
                  {sizes.map((size) => (
                    <MenuItem
                      key={size}
                      value={size}
                    >
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </div>
            <Typography variant="h4">Загрузка картинок</Typography>
            <div className={styles.images__wrapper}>
              {renderImages}
            </div>
            <Typography variant="h4">Добавление цветов</Typography>
            <Wrapper>
              <ColorPickerWrapper>
                <SketchPicker
                  color={currentColor}
                  onChangeComplete={handleChangeComplete}
                />
              </ColorPickerWrapper>
              <ButtonPick onClick={addColor}>Add Color</ButtonPick>
              <ColorsContainer>
                {colors.map((color, index) => (
                  <ColorBox key={index} color={color}>
                    <DeleteButton onClick={() => removeColor(color)}>
                      <DeleteIcon />
                    </DeleteButton>
                  </ColorBox>
                ))}
              </ColorsContainer>
            </Wrapper>
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
  