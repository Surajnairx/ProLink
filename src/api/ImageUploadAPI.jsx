import { storage } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { editProfile } from "./FirestoreAPI";

export const imageUpload = (file, id) => {
  const profilePicsRef = ref(storage, `profileImages/${file.name}`);
  const uploadTask = uploadBytesResumable(profilePicsRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      console.log(progress);
    },
    (err) => {
      console.error(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((res) => {
        editProfile(id, { imageLink: res });
        // setModalOpen(false);
        // setCurrentImage({});
        // setProgress(0);
      });
    }
  );
};
