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

const useTechnologies = () => {
    const [error, setError] = useState("");
    const [technologies, setTechnologies] = useState([]);
    const [technologiesDetail, setTechnologiesDetail] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const getTechnologies = useCallback(async () => {
        const arr = [];
        const data = await getDocs(collection(db, "technologies"));
        data.forEach((doc) => {
            arr.push({ tid: doc.id, ...doc.data() });
        });
        setTechnologies(arr);
        setLoading(false);
    }, []);

    const addTechnologies = async (data) => {
        const res = await addDoc(collection(db, "technologies"), {
            ...data,
            createdAt: Timestamp.fromDate(new Date()),
        });
        return res;
    };

    const getTechnologiesDetail = async (id) => {
        const docRef = doc(db, "technologies", id);
        const res = await getDoc(docRef);
        setLoading(false);
        if (res.exists()) {
            setTechnologiesDetail(res.data());
        } else {
            setError("Данная технология не найдена!");
        }
    };

    const updateTechnologies = async (id, data) => {
        const ref = doc(db, "technologies", id);
        const res = await updateDoc(ref, data);
        return res;
    };

    return {
        isLoading,
        technologies,
        getTechnologies,
        addTechnologies,
        technologiesDetail,
        getTechnologiesDetail,
        error,
        updateTechnologies,
    };
};

export default useTechnologies;
