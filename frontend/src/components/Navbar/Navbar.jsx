import React, { useEffect, useRef, useState } from "react";
import ContentCenter from "../../utilityComponent/ContentCenter.jsx";
import { FiSearch } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Authentication from "./LoginSignup/Authentication.jsx";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { motion } from "framer-motion";
import dashboard from "../../assets/navbar/dashboardProfile.png";
import watchlater from "../../assets/navbar/watchlater.png";
import menuBar from "../../assets/navbar/menuBar.png";
import heart from "../../assets/heart.png";
import DetailedMenu from "./DetailedMenu.jsx";
import Close from "../../assets/close.png";
import MobileMenu from "./MobileMenu.jsx";
import ProfilePopup from "./ProfilePopup.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchIcon, setSearchIcon] = useState(true);
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(false);
  const [detailedMenu, setDetailedMenu] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const auth = getAuth();
  const location = useLocation();

  const searchRef = useRef(null);

  useEffect(() => {
    location.pathname === "/" ? setSearchIcon(false) : setSearchIcon(true);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      try {
        if (currentUser) {
          setUser(currentUser);
          const firstName = currentUser?.displayName ? currentUser?.displayName?.split(' ')[0] : 'User'
          setFirstName(firstName);
        } else {
          setUser(null);
        }
      } catch (error) {
        alert("Error", error);
      }
    });

    return () => unsubscribe();
  }, [auth, location.pathname]);

  const handleClickOutsideSearch = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearch(false);
    }
  };

  useEffect(() => {
    if (search) {
      document.addEventListener("mousedown", handleClickOutsideSearch);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideSearch);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearch);
    };
  }, [search]);

  const handleLogin = () => {
    setLogin(!login);
  };

  const handleMenu = () => {
    setMenu(!menu);
    console.log(menu);
  };

  const handleSearch = () => {
    setSearch(!search);
  };

  const handleSearchOnclick = () => {
    text !== "" && navigate(`/search/multi/${text}`);
    text !== "" && setSearch(!search);
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      handleSearchOnclick();
    }
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const handleDashboard = () => {
    !user && setLogin(!login);
    user && navigate("/profile");
  };

  const handleWatchlist = () => {
    !user && setLogin(!login);
    user && navigate("/watchlist");
  };

  return (
    <div className="h-[9vh] 2xl:h-[7vh] flex flex-col justify-center items-center w-full z-10 bg-black bg-opacity-70">
      <ContentCenter className={"h-full relative"}>
        <div className="text-white flex justify-between items-center h-full">
          <div
            onClick={() => navigate("/")}
            className="font-monoton text-3xl md:text-4xl uppercase cursor-pointer  "
          >
            Moviefy
          </div>

          <div className="h-full centering">
            <ul className="flex gap-4 md:gap-6 items-center text-lg font-mukta h-full">
              <li
                className="hidden md:flex centering gap-2 hover:text-[#c3e200] duration-100 h-full cursor-pointer pl-4"
                onClick={() => setDetailedMenu(!detailedMenu)}
                onMouseEnter={() => setDetailedMenu(true)}
                onMouseLeave={() => setDetailedMenu(false)}
              >
                <img src={menuBar} className="w-5 invert" />
                <span>Menu</span>
              </li>

              <li
                className="hidden md:flex hover:text-[#c3e200] cursor-pointer duration-100 centering gap-1"
                onClick={() => handleDashboard()}
              >
                <img src={dashboard} className="w-7 invert" />
                Dashboard
              </li>

              <li
                className="hidden md:flex centering gap-1 hover:text-[#c3e200] duration-100 cursor-pointer"
                onClick={() => handleWatchlist()}
              >
                <img src={watchlater} className="w-5" />
                WatchList
              </li>

              <li
                className="hidden lg:flex centering gap-1 hover:text-[#c3e200] duration-100 cursor-pointer"
                onClick={() => handleWatchlist()}
              >
                <img src={heart} className="w-5" />
                Favourites
              </li>

              {searchIcon && (
                <li>
                  <FiSearch
                    onClick={handleSearch}
                    className="text-2xl hover:text-[#c3e200] cursor-pointer"
                  />
                </li>
              )}

              {user ? (
                <div
                  className="flex items-center gap-2 h-full"
                  onMouseLeave={() => setProfile(false)}
                >
                  <button
                    className="bg-[#c3e200] px-4 py-1 rounded-lg font-mukta font-medium text-black hover:scale-105 duration-300"
                    onMouseEnter={() => setProfile(true)}
                    onClick={() => setProfile(!profile)}
                  >
                    {firstName}
                  </button>
                </div>
              ) : (
                <button
                  className="bg-[#c3e200] px-4 py-1 rounded-lg font-mukta font-medium text-black hover:scale-105 duration-300"
                  onClick={handleLogin}
                >
                  Log In
                </button>
              )}

              {menu ? (
                <img src={Close} className="w-5 invert" onClick={handleMenu} />
              ) : (
                <LuMenu
                  className="block md:hidden text-3xl text-white hover:cursor-pointer"
                  onClick={handleMenu}
                />
              )}
            </ul>
          </div>
        </div>

        {profile && <ProfilePopup setProfile={setProfile} user={user} firstName={firstName} handleSignOut={handleSignOut}/>}

        {search && (
          <div
            ref={searchRef}
            className="absolute z-40 w-full flex justify-center items-center h-[15vh] bg-slate-900 rounded-b-xl"
          >
            <input
              type="text"
              className="w-2/3 md:w-2/3 h-1/2 outline-none pl-4 rounded-l-lg font-roboto text-xl md:text-2xl "
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => handleSearchEnter(e)}
            />
            <button
              className="w-1/4 md:w-1/5 h-1/2 bg-[#c3e200] font-oswald rounded-r-lg text-lg md:text-2xl font-bold"
              onClick={handleSearchOnclick}
            >
              Search
            </button>
          </div>
        )}
      </ContentCenter>

      {detailedMenu && <DetailedMenu setDetailedMenu={setDetailedMenu} />}

      {login && <Authentication handleLogin={handleLogin} />}

      {menu && <MobileMenu setMenu={setMenu}/>}

    </div>
  );
};

export default Navbar;
