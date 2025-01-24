import { useContext, useEffect, useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { BlogContext } from "../context/BlogContext";
import { Link } from "react-router-dom";
import axios from "axios";

const SignInPage = () => {
  const [email, setEmail] = useState("abc2@gmail.com");
  const [password, setPassword] = useState("6789");
  const [passwordShown, setPasswordShown] = useState(false);
  const [currentToken, setCurrentToken] = useState(""); // to store current token
  const [loginResponse, setLoginResponse] = useState(""); // to display response of login under signin

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/sign-in",
        {
          email: email,
          password: password,
        }
      );
      if (!response) {
        throw new Error(` error at calling sign-in api `);
      }
      console.log(response);
    } catch (error) {
      console.log(`${error} some error happened`);
    }
  };

  return (
    <div>
      <p>{currentToken}</p>
      <section className="grid text-center h-screen items-center p-8 dark:bg-blue-gray-800">
        <div>
          <Typography variant="h3" className="mb-2 dark:text-blue-gray-100">
            Sign In
          </Typography>
          <Typography className="mb-16 text-gray-600 font-normal text-[18px] dark:text-blue-gray-100">
            Enter your email and password to sign in
          </Typography>
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-[24rem] text-left"
          >
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
                labelProps={{
                  className: "hidden",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
                labelProps={{
                  className: "hidden",
                }}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 dark:text-blue-gray-100"
                type={passwordShown ? "text" : "password"}
                icon={
                  <i onClick={togglePasswordVisiblity}>
                    {passwordShown ? (
                      <EyeIcon className="h-5 w-5 dark:text-blue-gray-100" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5 dark:text-blue-gray-100" />
                    )}
                  </i>
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="mt-6 bg-blue-800"
              fullWidth
            >
              sign in
            </Button>
            {/* <div className="!mt-4 flex justify-end">
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                variant="small"
                className="font-medium"
              >
                Forgot password
              </Typography>
            </div> */}
            {/* <Button
              variant="outlined"
              size="lg"
              className="mt-6 flex h-12 items-center justify-center gap-2 dark:text-blue-gray-100 dark:bg-blue-gray-72 dark:border-blue-gray-100"
              fullWidth
            >
              <img
                src={`https://www.material-tailwind.com/logos/logo-google.png`}
                alt="google"
                className="h-6 w-6"
              />{" "}
              sign in with google
            </Button> */}
            <Typography
              variant="small"
              color="gray"
              className="!mt-4 text-center font-normal dark:text-blue-gray-100"
            >
              Not registered?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-900 dark:text-blue-300"
              >
                Create account
              </Link>
            </Typography>
          </form>
        </div>
      </section>
      <p className=" bg-blue-gray-300">the{loginResponse}</p>
    </div>
  );
};

export default SignInPage;
