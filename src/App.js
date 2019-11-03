import React from "react";
// import images from "./images.json";
import ImageContainer from "./components/image-container";
import "./App.css";

const checkForError = response => {
  if (!response.ok) throw Error(response.statusText);
  return response;
};

function App() {
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const onIsVisible = index => {
    if (index === images.length - 1) {
      setPage(page => page + 1);
    }
  };

  React.useEffect(() => {
    const fetchPhotos = async page => {
      setLoading(true);
      try {
        const result = await fetch(`/.netlify/functions/photos?page=${page}`);
        const photoResult = await checkForError(result).json();
        setImages(photos => {
          return photos.concat(photoResult);
        });
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    };
    fetchPhotos(page);
  }, [page]);

  return (
    <div className="app">
      <div className="container">
        {error && (
          <div>
            Error occured. Please refresh page and try again. Maybe I made too
            many Unsplash API requests
          </div>
        )}
        {images.map((res, index) => {
          return (
            <div key={`${res.id}-${index}`} className="wrapper">
              <ImageContainer
                src={res.urls.regular}
                thumb={res.urls.thumb}
                height={res.height}
                width={res.width}
                alt={res.alt_description}
                url={res.links.html}
                onIsVisible={() => onIsVisible(index)}
              />
              <figcaption>
                Photo by{" "}
                <a
                  href={res.user.links.html}
                  rel="noopener noreferrer"
                  target="_BLANK"
                >
                  {res.user.name}
                </a>{" "}
                on{" "}
                <a
                  rel="noopener noreferrer"
                  target="_BLANK"
                  href="https://unsplash.com"
                >
                  Unsplash
                </a>
              </figcaption>
            </div>
          );
        })}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
}

export default App;
