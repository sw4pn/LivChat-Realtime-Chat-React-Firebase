import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, FormEvent, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db, storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import Clouds from "../components/Clouds";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";

type Inputs = {
  name: string;
  photoURL: string;
  email: string;
  password: string;
  file: object;
};

const Register = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const { name, email, password } = data;
    const file = (data.file as FileList)[0];

    //check for displayName,
    const q = query(collection(db, "users"), where("displayName", "==", name));
    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size > 0) {
        setError(true);
        setErrorMessage(
          "Display name is already exists. Choose different name."
        );

        setLoading(false);
        return;
      }
    } catch (err: any) {
      setError(true);
      setErrorMessage(err?.message);
      // console.log(`${err?.code} : ${message} \n obj: ${err}`);
      setLoading(false);
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      file && setLoadingImage(true);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${name + date}`);

      file &&
        (await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              // update profile
              await updateProfile(res.user, {
                displayName: name,
                photoURL: downloadURL,
              });

              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName: name,
                email,
                photoURL: downloadURL,
              }).then(() => {
                setLoadingImage(false);
              });

              // create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});

              navigate("/");
            } catch (err) {
              // console.log(err);
              setError(true);
              // setLoading(false);
              setLoadingImage(false);
            }
          });
        }));

      if (!file) {
        // update profile
        await updateProfile(res.user, {
          displayName: name,
          photoURL: "/images/profile.png",
        });
        //create user on firestore
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName: name,
          email,
          photoURL: "/images/profile.png",
        }).then(() => {
          setLoadingImage(false);
        });

        // create empty user chats on firestore
        await setDoc(doc(db, "userChats", res.user.uid), {});

        navigate("/");
      }
    } catch (err: any) {
      setError(true);
      let message = "";
      const errorCode = err?.code;
      switch (errorCode) {
        case "auth/email-already-exists":
          message = "User with email already exists.";
          break;
        case "auth/email-already-in-use":
          message = "User with email already exists.";
          break;
        case "auth/internal-error":
          message = "Something went wrong.";
          break;
        case "auth/invalid-password":
          message = "The provided password user is invalid.";
          break;
        case "auth/invalid-photo-url":
          message = "Photo URL is invalid.";
          break;
        default:
          message = err?.message;
          break;
      }
      setErrorMessage(message);
      // console.log(`${err?.code} : ${message} \n obj: ${err}`);
      setLoading(false);
    }
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  // console.log(selectedFile, preview);

  return (
    <div className="flex justify-between h-screen bg-sky-300">
      <div className="relative hidden w-full md:flex bg-sky-400">
        <div className="w-full h-full">
          <img
            src="/images/network.png"
            className="absolute top-0 bottom-0 left-0 right-0 w-full h-full opacity-60"
            alt=""
          />
          <img
            src="/images/talk-svg.png"
            className="absolute top-0 bottom-0 left-0 right-0 w-full h-full opacity-60"
            alt=""
          />
          <img
            src="/images/cartography.png"
            className="absolute top-0 bottom-0 left-0 right-0 object-contain w-full h-full"
            alt=""
          />
          <Clouds />
        </div>
      </div>
      <div className="z-60 flex w-full rounded-lg md:rounded-none shadow-xl md:shadow-none md:h-full max-w-sm lg:max-w-md 2xl:max-w-2xl m-auto flex-col items-center justify-center px-16 py-8 bg-white gap-2.5 md:pb-20">
        <div className="py-2 mt-3 ">
          <div className="text-2xl font-bold text-slate-500">
            <img
              src="/images/livchat-logo.png"
              alt="LivChat"
              className="h-8 mx-auto"
            />
          </div>

          <div className="mt-5 text-center text-slate-500">
            Welcome to LivChat, Register your account to get started.
          </div>
        </div>

        <div className="py-4">
          <div className="mb-2.5 mx-auto text-center">
            {error && (
              <span className="block text-sm text-red-400">{errorMessage}</span>
            )}
            {errors.name && (
              <span className="block text-sm text-red-400 text-start">
                {errors.name.type === "required"
                  ? "* Name is required"
                  : "* Minimum length of Name is 3 characters."}
              </span>
            )}
            {errors.email && (
              <span className="block text-sm text-red-400 text-start">
                {errors.email.type === "required"
                  ? "* Email Id is required"
                  : "* Minimum length of Email is 5 characters."}
              </span>
            )}
            {errors.password && (
              <span className="block text-sm text-red-400 text-start">
                {errors.password.type === "required"
                  ? "* Password is required"
                  : "* Minimum length of Password is 5 characters."}
              </span>
            )}
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="register-name" className="my-2 ">
              <span className="block mb-2 select-none text-slate-600">
                Display Name
              </span>
              <input
                required
                id="register-name"
                type="text"
                className={`w-64 p-4 transition-all duration-200 ease-in border border-indigo-300 placeholder:text-zinc-400 outline-none ${
                  errors.name && "border-2 border-red-400 ring-red-400"
                }`}
                placeholder="Display Name"
                {...register("name", { required: true, minLength: 3 })}
                aria-invalid={errors.name ? "true" : "false"}
              />
            </label>
            <label htmlFor="register-email">
              <input
                id="register-email"
                type="email"
                className={`w-64 p-4 transition-all duration-200 ease-in border border-indigo-300 placeholder:text-zinc-400 outline-none ${
                  errors.email && "border-2 border-red-400 ring-red-400"
                }`}
                placeholder="Email"
                {...register("email", { required: true, minLength: 5 })}
                aria-invalid={errors.email ? "true" : "false"}
              />
            </label>
            <label htmlFor="register-password">
              <span className="block mb-2 select-none text-slate-600">
                Password
              </span>
              <input
                id="register-password"
                type="password"
                className={`w-64 p-4 border border-indigo-300 placeholder:text-zinc-400  outline-none ${
                  errors.password && "border-2 border-red-400 ring-red-400"
                }`}
                placeholder="Password"
                {...register("password", { required: true, minLength: 6 })}
              />
            </label>
            <label
              htmlFor="file"
              className="flex items-center gap-2.5 cursor-pointer my-1 text-indigo-400 relative">
              {!selectedFile && (
                <>
                  <img
                    src="/images/addAvatar.png"
                    alt="avatar"
                    className="w-8"
                  />
                  <span>Add an avatar</span>
                </>
              )}
              {selectedFile && (
                <>
                  <img src={preview} alt="avatar" className="w-20" />
                </>
              )}
            </label>
            {/* 
                {...register("password", { required: true, minLength: 6 })} */}
            <input
              type="file"
              id="file"
              className="w-0 h-0 overflow-hidden opacity-0 "
              {...register("file", { onChange: (e) => onSelectFile(e) })}
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.96 }}
              whileHover={{ opacity: 0.9 }}
              disabled={loading}
              className="text-white bg-indigo-400 p-2.5 my-2 font-bold cursor-pointer ">
              {loading ? "Loading..." : "Sign Up"}
            </motion.button>
            {loadingImage && (
              <span className="block text-sm text-violet-200 text-start">
                Uploading and compressing the image, please wait...
              </span>
            )}
          </form>
        </div>
        <p className="text-sm text-slate-500">
          Already have an account?
          <Link
            to="/login"
            className="px-1 font-semibold transition-all duration-200 ease-in-out hover:border-b border-slate-500 ">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
