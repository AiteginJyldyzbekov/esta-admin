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

const useProjects = () => {
    const [error, setError] = useState("");
    const [projects, setProjects] = useState([]);
    const [projectDetail, setProjectDetail] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const getProjects = useCallback(async () => {
        const arr = [];
        const data = await getDocs(collection(db, "projects"));
        data.forEach((doc) => {
            arr.push({ tid: doc.id, ...doc.data() });
        });
        setProjects(arr);
        setLoading(false);
    }, []);

    const addProject = async (data) => {
        const res = await addDoc(collection(db, "projects"), {
            ...data,
            createdAt: Timestamp.fromDate(new Date()),
        });
        return res;
    };

    const getProjectDetail = async (id) => {
        const docRef = doc(db, "projects", id);
        const res = await getDoc(docRef);
        setLoading(false);
        if (res.exists()) {
            setProjectDetail(res.data());
        } else {
            setError("Данный отзыв не найден!");
        }
    };

    const updateProject = async (id, data) => {
        const ref = doc(db, "projects", id);
        const res = await updateDoc(ref, data);
        return res;
    };

    return {
        isLoading,
        projects,
        getProjects,
        addProject,
        projectDetail,
        getProjectDetail,
        error,
        updateProject,
    };
};

export default useProjects;
