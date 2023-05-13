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

const useTeam = () => {
    const [error, setError] = useState("");
    const [ourTeam, setOurTeam] = useState([]);
    const [ourTeamDetail, setOurTeamDetail] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const getTeam = useCallback(async () => {
        const arr = [];
        const data = await getDocs(collection(db, "ourTeam"));
        data.forEach((doc) => {
            arr.push({ tid: doc.id, ...doc.data() });
        });
        setOurTeam(arr);
        setLoading(false);
    }, []);

    const addTeam = async (data) => {
        const res = await addDoc(collection(db, "ourTeam"), {
            ...data,
            createdAt: Timestamp.fromDate(new Date()),
        });
        return res;
    };

    const getTeamDetail = async (id) => {
        const docRef = doc(db, "ourTeam", id);
        const res = await getDoc(docRef);
        setLoading(false);
        if (res.exists()) {
            setOurTeamDetail(res.data());
        } else {
            setError("Данная услуга не найдена!");
        }
    };

    const updateTeam = async (id, data) => {
        const ref = doc(db, "ourTeam", id);
        const res = await updateDoc(ref, data);
        return res;
    };

    return {
        isLoading,
        ourTeam,
        getTeam,
        addTeam,
        ourTeamDetail,
        getTeamDetail,
        error,
        updateTeam,
    };
};

export default useTeam;
