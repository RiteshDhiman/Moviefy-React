import React from "react";
import {motion} from 'framer-motion'

const ProfilePopup = ({setProfile, firstName, user, handleSignOut}) => {
  return (
    <div
      className="absolute flex flex-col gap-2 right-0 top-[9vh] 2xl:top-[7vh] w-3/4 md:w-1/4 z-50 bg-black text-white p-4 rounded-b-lg shadow-lg"
      onMouseLeave={() => setProfile(false)}
      onMouseEnter={() => setProfile(true)}
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="h-[50px] w-[50px] border-2 border-[#c3e200] bg-[#c3e200] bg-opacity-30 rounded-full flex items-center justify-center font-poetsen text-2xl text-[#ffffff]">
            {firstName?.split("")[0]}
          </div>
          <div className="font-mukta text-xl">{user?.displayName}</div>
        </div>
      </div>
      <motion.button
        className="cursor-pointer bg-red-600 rounded-xl py-2 font-mukta text-lg font-semibold"
        onClick={handleSignOut}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        Sign Out
      </motion.button>
    </div>
  );
};

export default ProfilePopup;
