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
  serverTimestamp,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

import { toast } from "react-toastify";
import moment from "moment";
import uuid from "react-uuid";

let dbRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");
let likeRef = collection(firestore, "likes");
let commentsRef = collection(firestore, "comments");
let connectionRef = collection(firestore, "connections");
let notificationRef = collection(firestore, "notification");
let jobRef = collection(firestore, "jobs");
let userChatsRef = collection(firestore, "userChats");
let chatsRef = collection(firestore, "chats");

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
        .map((doc) => {
          return { ...doc.data(), userID: doc.id };
        })
        .filter((item) => {
          return item.email === localStorage.getItem("user-email");
        })[0]
    );
  });
};

export const editProfile = async (userID, data) => {
  let object = { ...data, userID: userID };
  let userToEdit = doc(userRef, userID);
  updateDoc(userToEdit, object)
    .then(() => {
      toast.success("Profile Updated Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
  await setDoc(doc(userChatsRef, userID), {});
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
};

export const searchUsers = async (searchItem, setUser) => {
  console.log(searchItem, setUser);

  try {
    let searchQuery = query(userRef, where("name", "==", searchItem));
    await onSnapshot(searchQuery, (res) => {
      const user = res.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(user);
    });
  } catch (err) {
    console.log(err);
  }
};

export const handleChats = async (currUser, user) => {
  let combinedID =
    currUser.userID > user.userID
      ? `${currUser.userID}_${user.userID}`
      : `${user.userID}_${currUser.userID}`;
  try {
    const chatDocRef = doc(chatsRef, combinedID);
    const currUserChatDocRef = doc(userChatsRef, currUser.userID);
    const otherUserChatDocRef = doc(userChatsRef, user.userID);

    const res = await getDoc(chatDocRef);

    if (!res.exists()) {
      //create a chat in chats collections
      await setDoc(doc(chatsRef, combinedID), { messages: [] });

      //create a userChat ref
      await updateDoc(currUserChatDocRef, {
        [combinedID]: {
          userInfo: {
            currUserID: user.userID,
            userName: user.name,
            imageLink: user.imageLink,
          },
          date: serverTimestamp(),
        },
      });

      await updateDoc(otherUserChatDocRef, {
        [combinedID]: {
          userInfo: {
            currUserID: currUser.userID,
            userName: currUser.name,
            imageLink: currUser.imageLink,
          },
          date: serverTimestamp(),
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getUserChats = async (setChats, currUserID) => {
  try {
    const currUserChatDocRef = doc(userChatsRef, currUserID);
    onSnapshot(currUserChatDocRef, (res) => {
      setChats(res.data());
    });
  } catch (err) {
    console.log(err);
  }
};

export const getMessages = async (chatID, setMessages) => {
  onSnapshot(chatsRef, async (res) => {
    setMessages(
      res.docs
        .map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
        .filter((doc) => doc.id === chatID)
    );
  });
};

export const updateMessages = async (chatId, senderId, receiverId, text) => {
  const timeStamp = () => {
    return moment().format("MMMM Do YYYY, h:mm");
  };

  try {
    let docToUpdate = doc(chatsRef, chatId);

    if (text !== "") {
      updateDoc(docToUpdate, {
        messages: arrayUnion({
          id: getUniqueID(),
          text,
          senderId: senderId,
          receiverId: receiverId,
          date: timeStamp(),
        }),
      });
    }
  } catch (err) {
    console.log(err);
  }

  try {
    let docToUpdate = doc(userChatsRef, receiverId);
    updateDoc(docToUpdate, {
      [chatId + ".lastMessage"]: { text },
      [chatId + ".date"]: timeStamp(),
    });
  } catch (err) {
    console.log(err);
  }

  try {
    let docToUpdate = doc(userChatsRef, senderId);
    updateDoc(docToUpdate, {
      [chatId + ".lastMessage"]: { text },
      [chatId + ".date"]: timeStamp(),
    });
  } catch (err) {
    console.log(err);
  }
};

const getUniqueID = () => {
  let id = uuid();
  return id;
};
