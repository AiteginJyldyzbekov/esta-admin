import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../firebase/firebase";

const useNews = () => {
    const [error, setError] = useState("");
    const [news, setNews] = useState([]);
    const [newsDetail, setNewsDetail] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const getNews = useCallback(async () => {
        const arr = [];
        const data = await getDocs(collection(db, "news"));
        data.forEach((doc) => {
            arr.push({ tid: doc.id, ...doc.data() });
        });
        setNews(arr);
        setLoading(false);
    }, []);

    const addNews = async (data) => {
        const res = await addDoc(collection(db, "news"), {
            ...data,
            createdAt: Timestamp.fromDate(new Date()),
        });
        return res;
    };

    const getNewsDetail = async (id) => {
        const docRef = doc(db, "news", id);
        const res = await getDoc(docRef);
        setLoading(false);
        if (res.exists()) {
            setNewsDetail(res.data());
        } else {
            setError("Данный отзыв не найден!");
        }
    };

    const updateNews = async (id, data) => {
        const ref = doc(db, "news", id);
        const res = await updateDoc(ref, data);
        return res;
    };

    return {
        isLoading,
        news,
        getNews,
        addNews,
        newsDetail,
        getNewsDetail,
        error,
        updateNews,
    };
};

export default useNews;
