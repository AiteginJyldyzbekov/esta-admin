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

const useFeedback = () => {
    const [error, setError] = useState("");
    const [feedbacks, setFeedbacks] = useState([]);
    const [feedbackDetail, setFeedbackDetail] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const getFeedbacks = useCallback(async () => {
        const arr = [];
        const data = await getDocs(collection(db, "feedback"));
        data.forEach((doc) => {
            arr.push({ tid: doc.id, ...doc.data() });
        });
        setFeedbacks(arr);
        setLoading(false);
    }, []);

    const addFeedback = async (data) => {
        const res = await addDoc(collection(db, "feedback"), {
            ...data,
            createdAt: Timestamp.fromDate(new Date()),
        });
        return res;
    };

    const getFeedbackDetail = async (id) => {
        const docRef = doc(db, "feedback", id);
        const res = await getDoc(docRef);
        setLoading(false);
        if (res.exists()) {
            setFeedbackDetail(res.data());
        } else {
            setError("Данный отзыв не найден!");
        }
    };

    const updateFeedback = async (id, data) => {
        const ref = doc(db, "feedback", id);
        const res = await updateDoc(ref, data);
        return res;
    };

    return {
        isLoading,
        feedbacks,
        getFeedbacks,
        addFeedback,
        feedbackDetail,
        getFeedbackDetail,
        error,
        updateFeedback,
    };
};

export default useFeedback;
