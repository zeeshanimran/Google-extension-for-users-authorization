import {useContext} from "react";
import {AppContext} from "../api/context";
import {generateSecret, encryptValue} from "../helper";
import {useNavigate} from "react-router-dom";

export function Home() {
  const {secret, setSecret, setIsLoggedIn} = useContext(AppContext);
  const navigate = useNavigate();

  const handleRegenerateSecret = () => {
    const newSecret = generateSecret();
    // eslint-disable-next-line no-undef
    chrome.storage.sync.set(
      {
        secret: encryptValue(newSecret),
      },
      () => {
        setSecret(newSecret);
        alert("New Secret Updated !");
      }
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // eslint-disable-next-line no-undef
    chrome.storage.sync.set(
      {
        isLoggedIn: false,
      },
      () => {
        alert("User is logged out !");
        navigate("/login");
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
          Welcome Back !
        </h2>

        <table className="table mt-10 w-32 max-w-screen-lg mx-auto flex justify-center">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border px-4 py-2">Your Secret</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 text-center">{secret}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mx-auto mt-10 max-w-xl sm:mt-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"></div>
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            onClick={handleRegenerateSecret}
            className="block w-32 mr-5 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Regenerate Secret
          </button>

          <button
            type="submit"
            onClick={handleLogout}
            className="block w-32 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
