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

const useAd = () => {
    const [error, setError] = useState("");
    const [ads, setAds] = useState([]);
    const [adDetail, setAdDetail] = useState();
    const [isLoading, setLoading] = useState(true);

    const getAds = useCallback(async () => {
        const arr = [];
        const data = await getDocs(collection(db, "ad"));
        data.forEach((doc) => {
            arr.push({ tid: doc.id, ...doc.data() });
        });
        setAds(arr);
        setLoading(false);
    }, []);

    const addAd = async (data) => {
        const res = await addDoc(collection(db, "ad"), {
            ...data,
            createdAt: Timestamp.fromDate(new Date()),
        });
        return res;
    };

    const getAdDetail = async (id) => {
        const docRef = doc(db, "ad", id);
        const res = await getDoc(docRef);
        setLoading(false);
        if (res.exists()) {
            setAdDetail(res.data());
        } else {
            setError("Данный отзыв не найден!");
        }
    };

    const updateAd = async (id, data) => {
        const ref = doc(db, "ad", id);
        const res = await updateDoc(ref, data);
        return res;
    };

    return {
        isLoading,
        ads,
        getAds,
        addAd,
        getAdDetail,
        adDetail,
        error,
        updateAd,
    };
};

export default useAd;
