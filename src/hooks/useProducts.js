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

const useProducts = () => {
    const [error, setError] = useState("");
    const [products, setProducts] = useState([]);
    const [productDetail, setProductDetail] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const getProducts = useCallback(async () => {
        const arr = [];
        const data = await getDocs(collection(db, "products"));
        data.forEach((doc) => {
            arr.push({ tid: doc.id, ...doc.data() });
        });
        setProducts(arr);
        setLoading(false);
    }, []);

    const addProduct = async (data) => {
        const res = await addDoc(collection(db, "products"), {
            ...data,
            createdAt: Timestamp.fromDate(new Date()),
        });
        return res;
    };

    const getProductDetail = async (id) => {
        const docRef = doc(db, "products", id);
        const res = await getDoc(docRef);
        setLoading(false);
        if (res.exists()) {
            setProductDetail(res.data());
        } else {
            setError("Данный отзыв не найден!");
        }
    };

    const updateProduct = async (id, data) => {
        const ref = doc(db, "products", id);
        const res = await updateDoc(ref, data);
        return res;
    };

    return {
        isLoading,
        products,
        getProducts,
        addProduct,
        productDetail,
        getProductDetail,
        error,
        updateProduct,
    };
};

export default useProducts;
