import React from "react";
import useFetch from "../../hooks/useFetch";
import Carousel from "../Carousel/Carousel";
import ContentCenter from "../../utilityComponent/ContentCenter";

const Similar = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);

  return (
    <div className="mt-24">
      <ContentCenter>
        <div className="flex justify-between items-center my-6">
          <div className="text-xl md:text-3xl font-fina font-medium text-white">
            {mediaType === "movie" ? "Similar Movies" : "Similar TV Shows"}
          </div>
        </div>
        <Carousel data={data?.results} loading={loading} endpoint={mediaType} />
      </ContentCenter>
    </div>
  );
};

export default Similar;
