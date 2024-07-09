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

const useCatalog = () => {
    const [error, setError] = useState("");
    const [catalog, setCatalog] = useState([]);
    const [catalogDetail, setCatalogDetail] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const getCatalog = useCallback(async () => {
        const arr = [];
        const data = await getDocs(collection(db, "catalog"));
        data.forEach((doc) => {
            arr.push({ tid: doc.id, ...doc.data() });
        });
        setCatalog(arr);
        setLoading(false);
    }, []);

    const addCatalog = async (data) => {
        const res = await addDoc(collection(db, "catalog"), {
            ...data,
            createdAt: Timestamp.fromDate(new Date()),
        });
        return res;
    };

    const getCatalogDetail = async (id) => {
        const docRef = doc(db, "catalog", id);
        const res = await getDoc(docRef);
        setLoading(false);
        if (res.exists()) {
            setCatalogDetail(res.data());
        } else {
            setError("Данный отзыв не найден!");
        }
    };

    const updateCatalog = async (id, data) => {
        const ref = doc(db, "catalog", id);
        const res = await updateDoc(ref, data);
        return res;
    };

    return {
        isLoading,
        catalog,
        getCatalog,
        addCatalog,
        catalogDetail,
        getCatalogDetail,
        error,
        updateCatalog,
    };
};

export default useCatalog;
