import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useLoading } from "./LoadingContexts";
const apiUrl = import.meta.env.VITE_API_URL;
const Reviews = () => {
  const { setIsLoading } = useLoading();
  const [allreviews, setAllReviews] = useState([]);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const getReview = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/main-review`, {
        method: "GET",
      });
      const data = await res.json();
      if (!data.error) {
        setAllReviews(data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getReview();
  }, []);

  return (
    <section className="container mx-auto p-3 w-full min-h-[80vh]">
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold  border-b-4 border-dashed border-[#ED0404] border-spacing-2 pb-2">
          মতামত
        </h1>
      </div>
      {allreviews && allreviews.length > 0 ? (
        <div className="caro-box mt-10 w-full">
          <Carousel
            responsive={responsive}
            swipeable={true}
            containerClass="carousel-container"
          >
            {allreviews.map((review, index) => {
              const {
                image,
                bloodGroup,
                address,
                message,
                mobile,
                womenNumber,
                name,
              } = review;
              return (
                <div
                  key={index}
                  className="item ml-2 text-center shadow-md p-3  border-2 border-black h-[500px] rounded-md mx-auto overflow-scroll"
                >
                  <div className="caro-image w-[150px] h-[150px] rounded-full overflow-hidden mx-auto mb-3">
                    <img src={image} alt="" className="object-cover" />
                  </div>
                  <div className="caro-title text-center mb-3">
                    <span className="text-lg font-bold">
                      {name}, {bloodGroup}
                    </span>
                    <br />
                    <span>{address}</span>
                  </div>
                  <div className="caro-desc text-md p-1">
                    <p>{message}</p>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default Reviews;
