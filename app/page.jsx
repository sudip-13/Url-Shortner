"use client";
import { useCallback, useState, useEffect } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";
import cookie from "js-cookie";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  const [dropdown, setDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState(null);
  const [shortUrl, setShortUrl] = useState([]);
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [imgurl, setImgUrl] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [loginDropDown, setLoginDropDown] = useState(false);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => {
      setCopiedUrl(null);
    }, 2000);
  };

  const openDropdown = useCallback(() => {
    setDropdown((prevState) => !prevState);
  }, []);

  const logout = async () => {
    Cookies.remove("cookie-1");
    router.push("/");
  };

  const handleShortURL = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: url, email: email }),
        }
      );
      if (!response.ok) {
        toast.error("Shortning failed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        throw new Error("Url Shortning failed");
      } else {
        const data = await response.json();
        toast.success("Successfully generated", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        setShortUrl((prevShortUrlList) => [...prevShortUrlList, data.shorturl]);
      }
    } catch (error) {
      console.error("Server error", error);
    }
  }, [shortUrl, url, email]);

  const sendUserDetails = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/validateuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("User details sent successfully", data);
      } else {
        console.log("User details can't not sent", data);
      }
    } catch {
      console.log("Sending user details failed server error");
    }
  }, [email, name]);

  const getDetails = useCallback(async () => {
    try {
      const token = cookie.get("cookie-1");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/decode`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );
      if (!response.ok) {
        console.log("Cannot get avatar");
      } else {
        const data = await response.json();
        setImgUrl(data.username.avatar);
        setEmail(data.username.email);
        setName(data.username.username);
      }
    } catch (error) {
      console.log("User details fetching failed ", error);
    }
  }, []);

  useEffect(() => {
    if (session && session.user && session.user.image) {
      setEmail(session.user.email);
      setImgUrl(session.user.image);
      setName(session.user.name);
    } else {
      setLoginDropDown(true);
    }
  }, [session]);

  useEffect(() => {
    getDetails();
    sendUserDetails();
  }, [sendUserDetails, getDetails, shortUrl, imgurl]);

  return (
    <>
      <ToastContainer />
      <NextTopLoader />
      {/* Main modal */}
      {imgurl ? null : (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed z-20 bg-transparent justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          style={{ marginLeft: "1130px", marginTop: "70px", width: "400px" }}
        >
          <div className="p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sign in to our platform
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    setImgUrl(
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
                    )
                  }
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5">
                <form className="space-y-4" action="#">
                  <button
                    onClick={() => {
                      signIn("google");
                    }}
                    type="button"
                    className="text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                  >
                    <svg
                      className="w-4 h-4 me-2 mr-20"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 19"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Sign in with Google
                  </button>
                  <button
                    onClick={() => {
                      signIn("github");
                    }}
                    type="button"
                    className="text-white w-full bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
                  >
                    <svg
                      className="w-4 h-4 me-2 mr-20"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Sign in with Github
                  </button>
                  <div className="">
                    <p className="text-center">or</p>
                    <div className="flex">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Custom login ?
                      </p>
                      <a
                        href="/login"
                        className="text-sm font-medium ml-2 text-blue-700 hover:underline dark:text-blue-500"
                      >
                        Login
                      </a>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered ?{" "}
                    <a
                      href="/signup"
                      className="text-blue-700 hover:underline dark:text-blue-500"
                    >
                      Create account
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="bg-white border-gray-200 dark:bg-gray-900 relative">
        {" "}
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/05/Mastercard_2019_logo.svg-e1659036851269.png?auto=format&q=60&fit=max&w=930"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              URL Shortner
            </span>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
            {" "}
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              onClick={openDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={imgurl}
                alt="https://e7.pngegg.com/pngimages/136/22/png-clipart-user-profile-computer-icons-girl-customer-avatar-angle-heroes.png"
              />
            </button>
            {/* Dropdown menu */}
            {dropdown && (
              <div
                className="absolute top-full right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                {" "}
                {/* Adjust top value */}
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {name}
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  {name && imgurl ? (
                    <li>
                      <a
                        onClick={() => signOut() && logout()}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </li>
                  ) : (
                    <li>
                      <a
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Login
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
            {/* Mobile menu button */}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          {/* Main menu */}
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 mr-7 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/stats"
                  className="block py-2 px-3 mr-7 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Stats
                </a>
              </li>
              <li>
                <a
                  href="/stats"
                  className="block py-2 px-3 mr-7 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/stats"
                  className="block py-2 px-3 mr-7 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="mt-10 justify-center ml-96">
        <form className="max-w-3xl">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
                fill="#FFFFFF"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z" />
              </svg>
            </div>
            <div className="flex">
              <input
                type="url"
                className="block w-full p-4 ps-10 mr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Paste a link here..."
                required
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                onClick={handleShortURL}
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-28"
              >
                Generate
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="border rounded-md max-w-3xl mt-16 ml-96 min-h-40 max-h-80 bg-slate-700">
        {shortUrl.length > 0 ? (
          shortUrl.slice(-3).map((url, index) => (
            <div key={index} className="flex items-center">
              <p className="p-3 text-gray-400">{url}</p>
              {copiedUrl === url ? (
                <button
                  className="mt-2 text-gray-900 h-fit dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border"
                  onClick={() => handleCopy(url)}
                >
                  <span
                    className={
                      copied
                        ? "hidden items-center"
                        : "inline-flex items-center"
                    }
                  >
                    <svg
                      className="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>

                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-500">
                      Copied
                    </span>
                  </span>
                </button>
              ) : (
                <button
                  className="mt-2 text-gray-900 h-fit dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border"
                  onClick={() => handleCopy(url)}
                >
                  <span className="inline-flex items-center">
                    <svg
                      className="w-3 h-3 me-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                    </svg>
                    <span className="text-xs font-semibold">Copy</span>
                  </span>
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="p-3 text-gray-400">No records found</p>
        )}
      </div>
      <div className="ml-96 mt-3 flex">
        <svg
          className="m-1"
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 0 24 24"
          width="18px"
          fill="#FFFFFF"
        >
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
        </svg>

        <p className="text-red-500 font-semibold">Alert:</p>
        <span className="text-gray-400 ml-1">
          The most recent abbreviated URL will appear just below the most recent
          one.
        </span>
      </div>

      <div className="max-w-3xl ml-96 mt-20">
        <h1 className="font-bold text-2xl mb-3">
          Simple and fast URL shortener !
        </h1>
        <p className="font-semibold text-slate-500 mb-6">
          ShortURL allows to shorten long links from
          <span className="text-blue-500 hover:underline cursor-pointer">
            {" "}
            Instagram
          </span>
          ,{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            {" "}
            Facebook
          </span>
          ,{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            {" "}
            YouTube
          </span>
          ,{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            {" "}
            Twitter
          </span>
          ,{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            {" "}
            Linked In
          </span>
          ,{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            {" "}
            WhatsApp
          </span>
          , TikTok, blogs and sites. Just paste the long URL and click the
          Shorten URL button. On the next page, copy the shortened URL and share
          it on sites, chat and emails. After shortening the URL, check how many
          clicks it received.
        </p>
        <h1 className="font-bold text-2xl mb-3">Shorten, share and track</h1>
        <p className="font-semibold text-slate-500">
          Your shortened URLs can be used in publications, documents,
          advertisements, blogs, forums, instant messages, and other locations.
          Track statistics for your business and projects by monitoring the
          number of hits from your URL with our click counter. For visit or
          track you previous hits or shortened URLs
          <Link href="/stats">
            <span className="text-blue-500 hover:underline cursor-pointer">
              {" "}
              click here
            </span>
          </Link>
          .
        </p>
      </div>

      <div className="mt-20 items-center justify-center max-w-5xl ml-72">
        <div className="flex mb-16">
          <div className="mr-7">
            <img
              className="h-20 ml-24 rounded-full mb-3"
              src="https://media.istockphoto.com/id/1359498219/vector/like-sign-with-green-leaves-in-circle-green-thumb-eco-friendly.jpg?s=612x612&w=0&k=20&c=TDA7kmwuzS7z8JwIJPRPVURDcEvi8n3mVVZ2nUGsDbI="
              alt="Statistics Icon"
            />
            <h3 className="font-bold ml-28 mb-3">Easy</h3>
            <p className="text-slate-500">
              {" "}
              ShortURL is easy and fast, enter the long link to get your
              shortened link
            </p>
          </div>
          <div className="mr-7">
            <img
              className="h-20 ml-14 mb-3 rounded-full"
              src="https://support.rebrandly.com/hc/article_attachments/17527840087837"
              alt="Statistics Icon"
            />
            <h3 className="font-bold pl-20 mb-3">Shortened</h3>
            <p className="text-slate-500">
              Use any link, no matter what size, ShortURL always shortens
            </p>
          </div>
          <div>
            <img
              className="h-20 ml-28 mb-3 rounded-full"
              src="https://img.freepik.com/free-vector/golden-badge-shield-with-gold-leaves_1017-30512.jpg?w=740&t=st=1711037970~exp=1711038570~hmac=3a6985396ebbbf1b9091856f69522d616a892f0ed178070510a153d2a4745497"
              alt="Statistics Icon"
            />
            <h3 className="font-bold ml-32 mb-3">Secure</h3>
            <p className="text-slate-500">
              It is fast and secure, our service has HTTPS protocol and data
              encryption
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="mr-10">
            <img
              className="h-20 ml-24 mb-3 rounded-full"
              src="https://cdn-icons-png.freepik.com/512/432/432548.png"
              alt="Statistics Icon"
            />
            <h3 className="font-bold ml-24 mb-3">Statistics</h3>
            <p className="text-slate-500">
              Check the number of clicks that your shortened URL received
            </p>
          </div>
          <div className="mr-10">
            <img
              className="h-20 ml-24 mb-3 rounded-full"
              src="https://cdn-icons-png.flaticon.com/512/8365/8365466.png"
              alt="Statistics Icon"
            />
            <h3 className="font-bold pl-24 mb-3">Reliable</h3>
            <p className="text-slate-500">
              All links that try to disseminate spam, viruses and malware are
              deleted
            </p>
            <p className="pl-5"></p>
          </div>
          <div>
            <img
              className="h-20 ml-10 mb-3 rounded-full"
              src="https://www.iconbunny.com/icons/media/catalog/product/2/8/2858.12-connected-devices-icon-iconbunny.jpg"
              alt="Statistics Icon"
            />
            <h3 className="font-bold ml-12 mb-3">Devices</h3>
            <p className="text-slate-500">
              Compatible with smartphones, tablets and desktop
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-white rounded-lg mt-40 shadow dark:bg-gray-900 ">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/05/Mastercard_2019_logo.svg-e1659036851269.png?auto=format&q=60&fit=max&w=930  "
                className="h-8"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                URL Shortner
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Flowbite™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}
