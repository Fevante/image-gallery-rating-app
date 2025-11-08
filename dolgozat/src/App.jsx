// App.jsx
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ImageDisplay from "./components/ImageDisplay";

function App() {
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const urlRef = useRef(null);

  const isValidUrl = (urlString) => {
    try {
      const url = new URL(urlString);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (error) {
      console.error("Invalid URL:", error);
      return false;
    }
  };

  const isImageUrl = (url) => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    const lowerUrl = url.toLowerCase();
    return imageExtensions.some((ext) => lowerUrl.includes(ext));
  };

  const fetchImages = async () => {
    setLoading(true);
    await axios
      .get("/api/images")
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setErrorMessage("Error fetching images");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const uploadPhoto = async () => {
    const urlValue = urlRef.current.value;
    if (urlValue === "") {
      setErrorMessage("Please provide a URL!");
      return;
    }

    if (!isValidUrl(urlValue)) {
      setErrorMessage(
        "Please enter a valid URL (starting with http:// or https://)",
      );
      return;
    }

    if (!isImageUrl(urlValue)) {
      setErrorMessage("URL must end with a valid image extension!");
      return;
    }

    await axios
      .post("/api/image", { url: urlValue })
      .then((response) => {
        console.log(response.data);

        setImages(response.data);
        urlRef.current.value = "";
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage("Error uploading image");
        console.error("Error uploading image:", error);
      });
  };

  const ratePicture = async (id, rating) => {
    await axios
      .post("/api/rate", { id, rating })
      .then((res) => {
        setImages(res.data);
      })
      .catch((error) => {
        console.error("Error rating image:", error);
        setErrorMessage("Error rating image");
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="flex flex-col w-[75vw] h-full bg-gray-100 justify-self-center items-center mt-6 mb-10">
      <button
        className={
          `aspect-square rounded-full w-10 bg-gray-700 text-white scale-150 p-0.5 pb-1 fixed bottom-8 right-8 transition duration-300 ease-in-out` +
          (showScroll ? "" : " opacity-0 pointer-events-none")
        }
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        ↑
      </button>
      <h1 className="text-3xl self-center">Gallery</h1>
      <div className="upload max-md:flex-col max-md:flex max-md:content-center">
        <input
          type="text"
          placeholder="Please enter image URL here..."
          ref={urlRef}
          className="min-w-sm border border-gray-300 rounded-md p-2 mr-4 max-md:min-w-3xs"
          onChange={() => {
            setErrorMessage("");
          }}
        />
        <button
          className="uploadButton rounded-xl max-md:mt-5"
          onClick={uploadPhoto}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit Photo"}
        </button>
      </div>
      <div className="text-red-600">{errorMessage}</div>
      {loading ? (
        <div className="text-4xl">Loading...</div>
      ) : images.length === 0 ? (
        <div className="text-2xl mt-10">No images to display</div>
      ) : (
        <div className="flex flex-row flex-wrap gap-5 mt-10 max-md:flex-col justify-between">
          {images.map((image) => {
            return (
              <ImageDisplay
                src={image.url}
                key={image.id}
                id={image.id}
                rating={image.rating}
                ratePicture={ratePicture}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
