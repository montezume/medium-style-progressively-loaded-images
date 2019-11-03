import React from "react";
// import images from "./images.json";
import ImageContainer from "./components/image-container";
import "./App.css";

function App() {
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [page, setPage] = React.useState(1);

  const onIsVisible = index => {
    if (index === images.length - 1) {
      setPage(page => page + 1);
    }
  };

  React.useEffect(() => {
    const fetchPhotos = async page => {
      setLoading(true);
      const result = await fetch(`/.netlify/functions/photos?page=${page}`);
      const photoResult = await result.json();

      setImages(photos => {
        const filtered = photoResult.filter(photo => {
          const isAlreadyHere = photos.some(
            originalPhoto => originalPhoto.id === photo.id
          );
          return !isAlreadyHere;
        });
        return photos.concat(filtered);
      });
      setLoading(false);
    };
    fetchPhotos(page);
  }, [page]);

  return (
    <div className="app">
      <div className="container">
        {images.map((res, index) => {
          return (
            <div key={res.id} className="wrapper">
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
