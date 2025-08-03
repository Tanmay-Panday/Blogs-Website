import { useContext, useEffect, useState } from "react";
import {
  Typography,
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import axios from "axios";
import { BlogContext } from "../context/BlogContext";

const checkEmailApi = "${import.meta.env.VITE_BACKEND_SERVER_URL}/user/get-user-by-email"; // API to check email existence
const signUpApi = "${import.meta.env.VITE_BACKEND_SERVER_URL}/user/add-user"; // API to register user
const signInApi = `${import.meta.env.VITE_BACKEND_SERVER_URL}/user/sign-in`; // to do sign in

const SignUpPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => setPasswordShown((prev) => !prev);

  const [open, setOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { setIsSignedIn, setUser, navigate } = useContext(BlogContext);

  const handleOpen = () => setOpen(!open);

  const handleTermsAccept = () => {
    setTermsAccepted(true);
    setOpen(false);
  };

  const handleTermsDecline = () => {
    setTermsAccepted(false);
    setOpen(false);
  };

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To show email error message

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Check if the email already exists
      const response1 = await axios.post(checkEmailApi, { email });

      if (!response1) {
        console.log(`error in calling check email api`);
      }
      setErrorMessage(`email already in use`);
      return;
    } catch (error) {
      // coming here means email is not used again
    }

    // if email does not exists then register the user
    try {
      const response2 = await axios.post(signUpApi, {
        name: name,
        password: password,
        email: email,
      });
      if (!response2) {
        console.log(`error in sending data through signup api`);
      }

      // user has been registered till here
      // now sign-in 
      try {
        const response3 = await axios.post(signInApi, {
          email,
          password,
        });
  
        if (response3.data) {
          localStorage.setItem("token", response3.data.token); // Save token
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: response3.data.email,
              admin: response3.data.admin,
            }) // Save user details
          );
          setIsSignedIn(true);
          setUser({ email: response3.data.email, admin: response3.data.admin });
  
          navigate("/blogs"); // as this is user sign up page only
        }
      } catch (error) {
        setIsSignedIn(false);
        console.error("Sign-in failed:", error);
      }

      console.log(`Sign up successful`);
    } catch (error) {
      console.log(`some error occured while registering the user ${error}`);
    }
  };

  useEffect(() => {
    setErrorMessage("");
  }, [email, setEmail]);

  return (
    <section className="grid text-center h-screen items-center p-8 dark:bg-blue-gray-800">
      <div>
        <Typography variant="h3" className="mb-2 dark:text-blue-gray-100">
          Sign Up
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px] dark:text-blue-gray-100">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
            <label htmlFor="name">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900 dark:text-blue-gray-100"
              >
                Your Name
              </Typography>
            </label>
            <Input
              id="name"
              size="lg"
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 dark:text-blue-gray-100"
              labelProps={{ className: "hidden" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900 dark:text-blue-gray-100"
              >
                Your Email
              </Typography>
            </label>
            <Input
              id="email"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 dark:text-blue-gray-100"
              labelProps={{ className: "hidden" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={!!errorMessage} // Show error styling
            />
            {errorMessage && (
              <Typography className="text-red-500 mt-1">
                {errorMessage}
              </Typography>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900 dark:text-blue-gray-100"
              >
                Password
              </Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              labelProps={{ className: "hidden" }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 dark:text-blue-gray-100"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisibility}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5 dark:text-blue-gray-100" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 dark:text-blue-gray-100" />
                  )}
                </i>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="terms-and-conditions"
              className="h-5 w-5 cursor-pointer rounded border-gray-300 dark:border-blue-gray-600 dark:bg-blue-gray-700 dark:checked:bg-blue-gray-900 dark:accent-black"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <label
              htmlFor="terms-and-conditions"
              className="ml-2 text-gray-600 text-sm dark:text-blue-gray-100"
              onClick={handleOpen}
            >
              Accept our Terms and Conditions
            </label>
          </div>

          <Button
            type="submit"
            size="lg"
            className="mt-6 bg-blue-800"
            fullWidth
            disabled={!termsAccepted}
          >
            Sign Up
          </Button>

          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal dark:text-blue-gray-100"
          >
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-blue-900 dark:text-blue-300"
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </div>

      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader>Terms and Conditions</DialogHeader>
        <DialogBody divider>
          <Typography>
            Please read and accept our terms and conditions before proceeding.
          </Typography>
          <Typography className="mt-4 text-sm text-gray-600 dark:text-blue-gray-100">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            euismod nulla vel nulla viverra, vel consequat sapien tincidunt.
            Cras mattis orci vitae mi placerat, sed tempor odio egestas.
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleTermsDecline}
            className="mr-1"
          >
            <span>Decline</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleTermsAccept}>
            <span>Accept</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  );
};

export default SignUpPage;
