import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLDClient } from 'launchdarkly-react-client-sdk';
import Toasts from "./toaster";


export default function Login() {
const LDClient = useLDClient();

  const [userState, setUserState] = useState({
    username: "",
  });

  const user = {
    key: userState.username,
  };

  const submitUser = (e) => {
    e.preventDefault()
    LDClient.identify(user).then(console.log(LDClient.getUser()));
    toast.success("Your LaunchDarkly user is " + userState.username);
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  return (
    <div className="flex justify-center items-center">
        <Toasts />
          <div
            className={`bg-ldgray w-full p-4 px-28 shadow-2xl`}
          >
              <div className="pb-4">Submit a User Below</div>
            <form>
              <div className="flex items-center bg-white overflow-hidden px-2 py-1 justify-between">
                <input
                  className="text-base text-gray-400 flex-grow outline-none px-2 "
                  type="input"
                  id="username"
                  placeholder="Enter Username"
                  value={userState.username}
                  onChange={handleChange}
                />
                <div className="flex items-center px-2 space-x-4 mx-auto ">
                  <button
                    type="submit"
                    className="bg-ldblue text-white text-base px-4 py-2 "
                    onClick={submitUser.bind(userState)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
  )
}