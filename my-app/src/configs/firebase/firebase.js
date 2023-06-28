import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyDN10Odqw2e9RASw8fOcYpFdjEFTkGpwmE",
  authDomain: "datn-bc0eb.firebaseapp.com",
  projectId: "datn-bc0eb",
  storageBucket: "datn-bc0eb.appspot.com",
  messagingSenderId: "770482638556",
  appId: "1:770482638556:web:4021bc69bf981bbfae6e19",
  measurementId: "G-8RBHDMX0QM",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export const upload = async (file) => {
  const fileRef = ref(storage, "avatars/" + uuidv4() + ".png");
  await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  return photoURL;
};

export const uploadImageCourse = async (file) => {
  const fileRef = ref(storage, "courses/" + uuidv4() + ".png");
  await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  return photoURL;
};

export const uploadVideoLesson = async (file) => {
  const fileRef = ref(storage, "videos/" + uuidv4() + ".mp4");
  await uploadBytes(fileRef, file);
  const videoUrl = await getDownloadURL(fileRef);
  return videoUrl;
};
