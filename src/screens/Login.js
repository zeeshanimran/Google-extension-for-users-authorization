import React, {useState, useContext} from "react";
import {AppContext} from "../api/context";
import {generateSecret, encryptValue, decryptValue} from "../helper";
import {useNavigate} from "react-router-dom";

export function Login() {
  const [password, setPassword] = useState("");
  const {setIsLoggedIn, setInitialized, setSecret} = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    // eslint-disable-next-line no-undef
    chrome.storage.sync.get(["password"], (data) => {
      if (decryptValue(data.password) === password) {
        setIsLoggedIn(true);
        // eslint-disable-next-line no-undef
        chrome.storage.sync.set(
          {
            isLoggedIn: true,
          },
          () => {
            navigate("/home");
          }
        );
      } else {
        alert("Incorrect password");
      }
    });
  };

  const handleResetExtension = () => {
    const newSecret = generateSecret();
    // eslint-disable-next-line no-undef
    chrome.storage.sync.set(
      {
        initialized: false,
        isLoggedIn: false,
        secret: encryptValue(newSecret),
        password: null,
      },
      () => {
        setInitialized(false);
        setSecret(newSecret);
        alert("Extension is Reset");
        navigate("/");
      }
    );
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Please Login
        </h2>
      </div>
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        method="POST"
        className="mx-auto mt-10 max-w-sm sm:mt-10"
      >
        <div className="flex flex-col items-center">
          <div className="sm:col-span-2">
            <label
              htmlFor="passowrd"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="given-name"
                className="block w-64 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-around mt-10">
          <button
            type="submit"
            className="block w-64 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
        <div className="flex justify-around mt-3">
          <button
            type="button"
            onClick={handleResetExtension}
            className="block w-64 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Reset Extension
          </button>
        </div>
      </form>
    </div>
  );
}
