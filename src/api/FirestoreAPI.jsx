import { firestore } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

let dbRef = collection(firestore, "posts");

export const Post = (data) => {
  let object = {
    data: data,
  };
  addDoc(dbRef, object)
    .then((res) => console.log("Document Added"))
    .catch((err) => console.log("He "));
};
