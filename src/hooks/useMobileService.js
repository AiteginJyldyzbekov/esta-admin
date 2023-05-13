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

const UseMobileService = () => {
  const [error, setError] = useState("");
  const [services, setServices] = useState([]);
  const [serviceDetail, setServiceDetail] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getServices = useCallback(async () => {
    const arr = [];
    const data = await getDocs(collection(db, "mobileServices"));
    data.forEach((doc) => {
      arr.push({ tid: doc.id, ...doc.data() });
    });
    setServices(arr);
    setLoading(false);
  }, []);

  const addService = async (data) => {
    const res = await addDoc(collection(db, "mobileServices"), {
      ...data,
      createdAt: Timestamp.fromDate(new Date()),
    });
    return res;
  };

  const getServiceDetail = async (id) => {
    const docRef = doc(db, "mobileServices", id);
    const res = await getDoc(docRef);
    setLoading(false);
    if (res.exists()) {
      setServiceDetail(res.data());
    } else {
      setError("Данная услуга не найдена!");
    }
  };

  const updateService = async (id, data) => {
    const ref = doc(db, "mobileServices", id);
    const res = await updateDoc(ref, data);
    return res;
  };

  return {
    isLoading,
    services,
    getServices,
    addService,
    serviceDetail,
    getServiceDetail,
    error,
    updateService,
  };
};

export default UseMobileService;
