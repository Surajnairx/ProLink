/* eslint-disable react-refresh/only-export-components */
import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

import { toast } from "react-toastify";
import moment from "moment";

let dbRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");
let likeRef = collection(firestore, "likes");
let commentsRef = collection(firestore, "comments");
let connectionRef = collection(firestore, "connections");
let notificationRef = collection(firestore, "notification");
let jobRef = collection(firestore, "jobs");
let messageRef = collection(firestore, "messages");

export const Post = (object) => {
  addDoc(dbRef, object)
    .then(() => {
      toast.success("Document has been added successfully");
    })
    .catch(() => toast.error("Document could not be added"));
};

export const getPost = (setAllPosts) => {
  onSnapshot(dbRef, (response) => {
    setAllPosts(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const getCurrentuser = (setCurrUser) => {
  onSnapshot(userRef, (res) => {
    setCurrUser(
      res.docs
        .map((docs) => {
          return { ...docs.data(), userID: docs.id };
        })
        .filter((item) => {
          return item.email === localStorage.getItem("user-email");
        })[0]
    );
  });
};

export const editProfile = (userID, data) => {
  let userToEdit = doc(userRef, userID);
  updateDoc(userToEdit, data)
    .then(() => {
      toast.success("Profile Updated Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(dbRef, where("userID", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getSingleUser = (setCurrentUser, email) => {
  const singleUserQuery = query(userRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};

export const likePost = (currUser, postUser, postID, liked) => {
  let type = "like";
  let userID = currUser.userID;
  try {
    let docLike = doc(likeRef, `${userID}_${postID}`);
    let docToNotify = doc(notificationRef, `${currUser.userID}_like_${postID}`);
    if (liked) {
      deleteDoc(docLike);
      deleteDoc(docToNotify);
    } else {
      setDoc(docLike, { userID, postUser, postID, type });
      if (userID !== postUser) {
        const notificationData = {
          userID: currUser.userID,
          username: currUser.name,
          recipientUserID: postUser,
          type: type,
          isRead: false,
          timeStamp: moment().format("MMMM Do YYYY, h:mm"),
        };
        setDoc(docToNotify, notificationData);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const getLikesByUser = (userID, postID, setLiked, setLikesCount) => {
  try {
    let likeQuery = query(likeRef, where("postID", "==", postID));

    onSnapshot(likeQuery, (res) => {
      let likes = res.docs.map((doc) => doc.data());
      let likesCount = likes.length;
      const isLiked = likes.some((like) => like.userID == userID);
      setLikesCount(likesCount);
      setLiked(isLiked);
    });
  } catch (err) {
    console.log(err);
  }
};

export const postComment = (
  userName,
  headline,
  currUser,
  postID,
  post,
  comment,
  timeStamp
) => {
  let type = "comment";
  let userID = currUser.userID;
  let recipientUserID = post.userID;
  let docToNotify = doc(notificationRef, `${userID}_comment_${postID}`);
  try {
    addDoc(commentsRef, {
      userName,
      headline,
      type,
      postID,
      comment,
      timeStamp,
    });
    if (userID !== postID) {
      const notificationData = {
        userID: currUser.userID,
        username: currUser.name,
        recipientUserID: recipientUserID,
        type: type,
        isRead: false,
        timeStamp: moment().format("MMMM Do YYYY, h:mm"),
      };
      setDoc(docToNotify, notificationData);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getCommentsByUser = (postID, setPostComments) => {
  try {
    let singlePostQuery = query(commentsRef, where("postID", "==", postID));
    onSnapshot(singlePostQuery, (res) => {
      const comments = res.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setPostComments(comments);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (res) => {
    setAllUsers(
      res.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const updatePost = (id, post) => {
  let docToUpdate = doc(dbRef, id);
  try {
    updateDoc(docToUpdate, { post });
    toast.success("Post has been updated");
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => {
  let docToDelete = doc(dbRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success("Post succesfully deleted");
  } catch (err) {
    console.log(err);
  }
};

export const addConnection = (userID, connectionID) => {
  try {
    let addConnection = doc(connectionRef, `${userID}_${connectionID}`);
    setDoc(addConnection, { userID, connectionID });
    toast.success("Connection Requent Sent");
  } catch (err) {
    console.log(err);
  }
};

export const getConnections = (userID, connectionID, setIsConnected) => {
  try {
    let connectionsQuery = query(
      connectionRef,
      where("connectionID", "==", connectionID)
    );

    onSnapshot(connectionsQuery, (res) => {
      let connection = res.docs.map((doc) => doc.data());

      const isConnected = connection.some(
        (connection) => connection.userID == userID
      );
      setIsConnected(isConnected);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getNotification = async (userID, setNotification) => {
  onSnapshot(notificationRef, (res) => {
    setNotification(
      res.docs
        .map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
        .filter((doc) => doc.recipientUserID === userID)
    );
  });
};

export const getUserByID = async (id, setCurrentProfile) => {
  try {
    onSnapshot(userRef, (res) => {
      setCurrentProfile(
        res.docs
          .map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
          .filter((doc) => doc.userID === id)
      );
    });
  } catch (err) {
    console.log(err);
  }
};

export const readNotification = async (id) => {
  let docToUpdate = doc(notificationRef, id);
  updateDoc(docToUpdate, { isRead: true });
};

export const postJob = async (object) => {
  let time = moment().format("MMMM Do YYYY");
  let data = { ...object, time: time };
  addDoc(jobRef, data)
    .then(() => {
      toast.success(" Job Post has been added successfully");
    })
    .catch(() => toast.error("Document could not be added"));
};

export const getJob = async (setJob) => {
  onSnapshot(jobRef, (response) => {
    setJob(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const searchJobs = (search, setJobs) => {
  console.log(search.jobType, search.locationType);

  try {
    let jobQuery = query(
      jobRef,
      where("jobType", "==", search.jobType),
      where("locationType", "==", search.locationType)
    );
    onSnapshot(jobQuery, (res) => {
      const jobs = res.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setJobs(jobs);
    });
  } catch (err) {
    console.log(err);
  }
  // try {
  //   onSnapshot(userRef, (res) => {
  //     console.log(
  //       res.docs
  //         .map((doc) => {
  //           return { ...doc.data(), id: doc.id };
  //         })
  //         .filter(
  //           (doc) =>
  //             doc.jobType === search.jobType &&
  //             doc.locationType === search.locationType
  //         )
  //     );
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
};
