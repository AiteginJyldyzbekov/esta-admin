import {
    Button,
    TextField,
    TextareaAutosize,
    Typography,
} from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../../components/containers/FormContainer";
import FormPageContainer from "../../components/containers/FormPageContainer";
import styles from "./AddOrEditAd.module.scss"
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { deleteObject } from "firebase/storage";
import { useParams } from "react-router-dom";
import useAd from "../../hooks/useAd";

function AdDetailPage() {
    const { getAdDetail, adDetail, updateAd, isLoading, error } = useAd();
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const [isSending, setSending] = useState(false);


    useEffect(() => {
        if (adDetail) {
            setName(adDetail?.name)
            setDesc(adDetail?.desc)
            setImageData(adDetail?.images)
        }
    }, [adDetail])

    useEffect(() => {
        if (id) {
            getAdDetail(id);
        }
    }, [id]);

    const submit = (e) => {
        e.preventDefault();
        const updatedImageData = imageData
            .filter(item => item.url !== null)
            .map(item => {
                const { file, ...rest } = item;
                return rest;
            });
        if (isSending) return null;
        setSending(true);
        updateAd(id, {
            name,
            desc,
            images: updatedImageData
        })
            .finally(() => {
                setSending(false);
            })
            .then(() => {
                toast.success("Продукт был успешно создан!");
                navigate("/");
            });
    }

    const [imageData, setImageData] = useState([
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
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            label="Имя"
                            variant="outlined"
                            sx={{
                                width: '100%'
                            }}
                        />
                        <TextField
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                            label="Описание"
                            variant="outlined"
                            sx={{
                                width: '100%'
                            }}
                        />
                    </div>
                    <Typography variant="h5">Фотография</Typography>
                    <div className={styles.images__wrapper}>
                        {renderImages}
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

export default AdDetailPage;
