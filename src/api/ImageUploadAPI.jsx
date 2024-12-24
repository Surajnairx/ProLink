import { storage } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { editProfile } from "./FirestoreAPI";

// Function to handle image upload for the profile
export const imageUpload = (
  file,
  id,
  setModalOpen,
  setProgress,
  setCurrentImage
) => {
  // Reference to the location in Firebase storage for profile images
  const profilePicsRef = ref(storage, `profileImages/${file.name}`);

  // Create an upload task
  const uploadTask = uploadBytesResumable(profilePicsRef, file);

  // Monitor the upload state
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Calculate and set the upload progress percentage
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      // Update the progress state
      setProgress(progress);
    },
    (err) => {
      // Handle any errors during upload
      console.error(err);
    },
    () => {
      // Once upload is complete, retrieve the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((res) => {
        // Update the user profile with the new image URL
        editProfile(id, { imageLink: res });

        // Close the modal and reset the image state after upload
        setModalOpen(false);
        setCurrentImage({});

        // Reset the progress state
        setProgress(0);
      });
    }
  );
};

// Function to upload a post image
export const uploadPostImage = (file, setPostImage, setProgress) => {
  // Reference to the location in Firebase storage for post images
  const postPicsRef = ref(storage, `postImages/${file.name}`);

  // Create an upload task
  const uploadTask = uploadBytesResumable(postPicsRef, file);

  // Monitor the upload state
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Calculate and set the upload progress percentage
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (err) => {
      // Handle any errors during upload
      console.error(err);
    },
    async () => {
      // Once upload is complete, retrieve the download URL
      await getDownloadURL(uploadTask.snapshot.ref).then((res) => {
        // Update the state with the post image URL
        setPostImage(res);
      });
    }
  );
};
