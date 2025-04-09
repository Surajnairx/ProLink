/* eslint-disable react-refresh/only-export-components */

// Import necessary functions from Firebase
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

// Import toast notifications and other libraries
import { toast } from "react-toastify";
import moment from "moment";
import uuid from "react-uuid";

// References to Firestore collections
let dbRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");
let likeRef = collection(firestore, "likes");
let commentsRef = collection(firestore, "comments");
let connectionRef = collection(firestore, "connections");
let notificationRef = collection(firestore, "notification");
let jobRef = collection(firestore, "jobs");
let userChatsRef = collection(firestore, "userChats");
let chatsRef = collection(firestore, "chats");

// Function to add a new post to Firestore
export const Post = (object) => {
  addDoc(dbRef, object)
    .then(() => {
      toast.success("Document has been added successfully");
    })
    .catch(() => toast.error("Document could not be added"));
};

// Function to get all posts from Firestore and set it in state
export const getPost = (setAllPosts) => {
  onSnapshot(dbRef, (response) => {
    setAllPosts(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id }; // Mapping data to include Firestore document id
      })
    );
  });
};

// Function to post user data to the Firestore 'users' collection
export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

// Function to get current user details based on email
export const getCurrentuser = (setCurrUser) => {
  onSnapshot(userRef, (res) => {
    setCurrUser(
      res.docs
        .map((doc) => {
          return { ...doc.data(), userID: doc.id }; // Include userID with data
        })
        .filter((item) => {
          return item.email === localStorage.getItem("user-email"); // Filtering based on email stored in localStorage
        })[0]
    );
  });
};

// Function to edit user profile
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

  // Reset user chats and add connection after profile update
  await setDoc(doc(userChatsRef, userID), {});
  let connectionID = userID;
  let addConnection = doc(connectionRef, `${userID}_${connectionID}`);
  await setDoc(addConnection, { userID, connectionID });
};

// Function to get posts by a single user based on userID
export const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(dbRef, where("userID", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id }; // Mapping to include post ID
      })
    );
  });
};

// Function to get details of a single user by email
export const getSingleUser = (setCurrentUser, email) => {
  const singleUserQuery = query(userRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id }; // Mapping to include user ID
      })[0]
    );
  });
};

// Function to handle post like functionality
export const likePost = (currUser, postUser, postID, liked) => {
  let type = "like";
  let userID = currUser.userID;
  try {
    let docLike = doc(likeRef, `${userID}_${postID}`);
    let docToNotify = doc(notificationRef, `${currUser.userID}_like_${postID}`);
    if (liked) {
      // If already liked, remove the like and notification
      deleteDoc(docLike);
      deleteDoc(docToNotify);
    } else {
      // Add like and notification if not liked
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

// Function to get likes count and check if the user liked a post
export const getLikesByUser = (userID, postID, setLiked, setLikesCount) => {
  try {
    let likeQuery = query(likeRef, where("postID", "==", postID));

    onSnapshot(likeQuery, (res) => {
      let likes = res.docs.map((doc) => doc.data());
      let likesCount = likes.length;
      const isLiked = likes.some((like) => like.userID == userID); // Check if the current user liked the post
      setLikesCount(likesCount); // Set likes count
      setLiked(isLiked); // Set liked status
    });
  } catch (err) {
    console.log(err);
  }
};

// Function to post a comment to a post
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
      setDoc(docToNotify, notificationData); // Send notification if the post owner is different
    }
  } catch (err) {
    console.log(err);
  }
};

// Function to get all comments for a post
export const getCommentsByUser = (postID, setPostComments) => {
  try {
    let singlePostQuery = query(commentsRef, where("postID", "==", postID));
    onSnapshot(singlePostQuery, (res) => {
      const comments = res.docs.map((doc) => {
        return {
          id: doc.id, // Include Firestore document ID
          ...doc.data(),
        };
      });
      setPostComments(comments); // Set the comments in state
    });
  } catch (err) {
    console.log(err);
  }
};

// Function to get all users from Firestore
export const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (res) => {
    setAllUsers(
      res.docs.map((docs) => {
        return { ...docs.data(), id: docs.id }; // Include user ID with data
      })
    );
  });
};

// Function to update a post's content and image
export const updatePost = (id, post, postImage) => {
  let docToUpdate = doc(dbRef, id);
  try {
    updateDoc(docToUpdate, { post, postImage });
    toast.success("Post has been updated");
  } catch (err) {
    console.log(err);
  }
};

// Function to delete a post from Firestore
export const deletePost = (id) => {
  let docToDelete = doc(dbRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success("Post succesfully deleted");
  } catch (err) {
    console.log(err);
  }
};

// Function to add a connection (follow a user)
export const addConnection = (userID, connectionID) => {
  try {
    let addConnection = doc(connectionRef, `${userID}_${connectionID}`);
    setDoc(addConnection, { userID, connectionID });
    toast.success("Following User");
  } catch (err) {
    console.log(err);
  }
};

// Function to check if two users are connected (following each other)
export const getConnections = (userID, connectionID, setIsConnected) => {
  try {
    let connectionsQuery = query(
      connectionRef,
      where("connectionID", "==", connectionID)
    );

    onSnapshot(connectionsQuery, (res) => {
      let connection = res.docs.map((doc) => doc.data());

      const isConnected = connection.some(
        (connection) => connection.userID == userID // Check if user is connected
      );
      setIsConnected(isConnected); // Set connection status
    });
  } catch (err) {
    console.log(err);
  }
};

// Function to get notifications for a user
export const getNotification = async (userID, setNotification) => {
  onSnapshot(notificationRef, (res) => {
    setNotification(
      res.docs
        .map((doc) => {
          return { ...doc.data(), id: doc.id }; // Mapping notifications to include ID
        })
        .filter((doc) => doc.recipientUserID === userID) // Filter notifications for the specific user
    );
  });
};

// Function to get a user profile by userID
export const getUserByID = async (id, setCurrentProfile) => {
  try {
    onSnapshot(userRef, (res) => {
      setCurrentProfile(
        res.docs
          .map((doc) => {
            return { ...doc.data(), id: doc.id }; // Mapping to include user ID
          })
          .filter((doc) => doc.userID === id) // Filter profile by userID
      );
    });
  } catch (err) {
    console.log(err);
  }
};

// Function to mark a notification as read
export const readNotification = async (id) => {
  let docToUpdate = doc(notificationRef, id);
  updateDoc(docToUpdate, { isRead: true }); // Update notification status
};

// Function to post a job
export const postJob = async (object) => {
  let time = moment().format("MMMM Do YYYY");
  let data = { ...object, time: time };
  addDoc(jobRef, data)
    .then(() => {
      toast.success(" Job Post has been added successfully");
    })
    .catch(() => toast.error("Document could not be added"));
};

// Function to get all job posts
export const getJob = async (setJob) => {
  onSnapshot(jobRef, (response) => {
    setJob(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id }; // Include job post ID
      })
    );
  });
};

// Function to search jobs based on job type and location
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
          id: doc.id, // Include job post ID
          ...doc.data(),
        };
      });
      setJobs(jobs); // Set filtered jobs
    });
  } catch (err) {
    console.log(err);
  }
};

// Function to search users by name
export const searchUsers = async (searchItem, setUser) => {
  console.log(searchItem, setUser);

  try {
    let searchQuery = query(userRef, where("name", "==", searchItem));
    await onSnapshot(searchQuery, (res) => {
      const user = res.docs.map((doc) => {
        return {
          id: doc.id, // Include user ID
          ...doc.data(),
        };
      });
      console.log(user);
    });
  } catch (err) {
    console.log(err);
  }
};

// Function to handle chat creation and updating between users
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
      // If chat does not exist, create a new chat
      await setDoc(doc(chatsRef, combinedID), { messages: [] });

      // Create chat reference for both users
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

// Function to get user chats by userID
export const getUserChats = async (setChats, currUserID) => {
  try {
    const currUserChatDocRef = doc(userChatsRef, currUserID);
    onSnapshot(currUserChatDocRef, (res) => {
      setChats(res.data()); // Set chats for current user
    });
  } catch (err) {
    console.log(err);
  }
};

// Function to get messages for a specific chat
export const getMessages = async (chatID, setMessages) => {
  onSnapshot(chatsRef, async (res) => {
    setMessages(
      res.docs
        .map((doc) => {
          return { ...doc.data(), id: doc.id }; // Include chat document ID
        })
        .filter((doc) => doc.id === chatID) // Filter messages by chat ID
    );
  });
};

// Function to update messages in a chat
export const updateMessages = async (
  chatId,
  senderId,
  receiverId,
  text,
  read
) => {
  const timeStamp = () => {
    return moment().format("MMMM Do YYYY, h:mm");
  };

  try {
    let docToUpdate = doc(chatsRef, chatId);

    if (text !== "") {
      // Add new message to chat
      updateDoc(docToUpdate, {
        messages: arrayUnion({
          id: getUniqueID(),
          text,
          senderId: senderId,
          receiverId: receiverId,
          date: timeStamp(),
          read,
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

// Helper function to generate a unique ID for messages
const getUniqueID = () => {
  let id = uuid();
  return id;
};
