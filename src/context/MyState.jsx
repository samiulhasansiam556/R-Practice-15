import { useEffect, useState } from 'react';
import MyContext from './MyContext';
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import {fireDB} from "../firebase/Firebase"

function myState(props) {
  const [products, setProducts] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
  });

  const [allProducts, setAllProducts] = useState([]);

  const addProduct = async () => {
    if (!products.title || !products.price || !products.imageUrl || !products.category) {
      return alert('All fields are required');
    }

    const productRef = collection(fireDB, "products");
    try {
      await addDoc(productRef, products);
      getProducts();
      alert("Product added successfully");
      setTimeout(() => {
        window.location.href = '/';
      }, 800);
      setProducts({
        title: "",
        price: "",
        imageUrl: "",
        category: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setAllProducts(productsArray);
      });
      return () => data();
    } catch (error) {
      console.log(error);
    }
  };

  const editProductHandle = (item) => {
    setProducts(item);
  };

  const editProduct = async () => {
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      getProducts();
      alert("Product updated successfully");
      setTimeout(() => {
        window.location.href = '/';
      }, 800);
      setProducts({
        title: "",
        price: "",
        imageUrl: "",
        category: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (item) => {
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      getProducts();
      alert('Product deleted successfully');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const [search, setSearch] = useState("");

  return (
    <MyContext.Provider value={{ products, setProducts, addProduct, allProducts, editProductHandle, editProduct, deleteProduct, search, setSearch }}>
      {props.children}
    </MyContext.Provider>
  );
}

export default myState;
