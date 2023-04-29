import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import Clouds from "../components/Clouds";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password).then(
        (res) => {
          // console.log(res.user)
          setLoading(false);
          navigate("/");
        }
      );
    } catch (err: any) {
      setError(true);
      const message =
        err?.code === "auth/user-not-found"
          ? "User not found."
          : err?.code === "auth/wrong-password"
          ? "Wrong Password!"
          : err?.message;
      // const errorCode = error.code;
      setErrorMessage(message);
      // console.log(`${err?.code} : ${message} \n obj: ${err}`);
      setLoading(false);
    }
  };

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
            className="absolute top-0 bottom-0 left-0 right-0 w-full h-full opacity-90"
            alt=""
          />
          <img
            src="/images/cartography.png"
            className="absolute top-0 bottom-0 left-0 right-0 object-contain w-full h-full"
            alt=""
          />
          <Clouds />
        </div>
        {/* 
	content: ' ';
	position: absolute;
	width: 0;
	height: 0;
  left: auto;
	right: -40px;
  top: 30px;
	bottom: auto;
	border: 20px solid;
	border-color: #666 transparent transparent #666; */}
        <div className="absolute right-0 h-auto m-10 w-60 top-1/3">
          <div className="relative z-50 bg-yellow-100 border-4 before:z-50 rounded-3xl border-zinc-600 bubble">
            <div className="p-4 text-sm leading-6 whitespace-normal">
              <p>
                DEMO USER 1: <br />
                <div className="pb-1">
                  <span className="mr-2 text-base text-orange-900">
                    user1@liv.chat
                  </span>
                  <span className="text-base text-orange-700">112233</span>
                </div>
                DEMO USER 2: <br />
                <div className="pb-1">
                  <span className="mr-2 text-base text-orange-900">
                    user2@liv.chat
                  </span>
                  <span className="text-base text-orange-700">112233</span>
                </div>
                Other Users: <br />
                <div className="w-40 px-2">
                  <div className="mr-2 text-base text-orange-900">Swapnil</div>
                  <div className="mr-2 text-base text-orange-700">Jane</div>
                  <div className="mr-2 text-base text-orange-900">John</div>
                  <div className="mr-2 text-base text-orange-700">Peter</div>
                  <div className="mr-2 text-base text-orange-700">Bob</div>
                </div>
              </p>
            </div>
          </div>
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
            Hi there, Welcome to LivChat, Login here to get started.
          </div>
        </div>
        <div className="py-4">
          <div className="mb-2.5 mx-auto text-center">
            {error && (
              <span className="block text-sm text-red-400">{errorMessage}</span>
            )}
            {errors.email && (
              <span className="block text-sm text-red-400 text-start">
                {errors.email.type === "required"
                  ? "* Email Id is required"
                  : "* Minimum length is 5 characters."}
              </span>
            )}
            {errors.password && (
              <span className="block text-sm text-red-400 text-start">
                {errors.password.type === "required"
                  ? "* Password is required"
                  : "* Minimum length is 5 characters."}
              </span>
            )}
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="login-email" className="my-2 ">
              <span className="block mb-2 select-none text-slate-600">
                Email
              </span>
              <input
                id="login-email"
                type="email"
                className={`w-64 p-4 transition-all duration-200 ease-in border border-indigo-300 placeholder:text-zinc-400 outline-none ${
                  errors.email && "border-2 border-red-400 ring-red-400"
                }`}
                placeholder="Email"
                {...register("email", { required: true, minLength: 5 })}
                aria-invalid={errors.email ? "true" : "false"}
              />
            </label>
            <label htmlFor="login-password">
              <span className="block mb-2 select-none text-slate-600">
                Password
              </span>
              <input
                id="login-password"
                type="password"
                className={`w-64 p-4 border border-indigo-300 placeholder:text-zinc-400  outline-none ${
                  errors.password && "border-2 border-red-400 ring-red-400"
                }`}
                placeholder="Password"
                {...register("password", { required: true, minLength: 6 })}
              />
            </label>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.96 }}
              whileHover={{ opacity: 0.9 }}
              disabled={loading}
              className="text-white bg-indigo-400 p-2.5 my-2 font-bold cursor-pointer ">
              {loading ? "Loading..." : "Sign in"}
            </motion.button>
          </form>
        </div>

        <p className="text-sm text-slate-500">
          You don't have an account?
          <Link
            to="/register"
            className="px-1 font-semibold transition-all duration-200 ease-in-out hover:border-b border-slate-500 ">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
