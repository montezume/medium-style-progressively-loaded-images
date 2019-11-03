import React from "react";
import images from "./images.json";
import ImageContainer from "./components/image-container";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="container">
        {images.slice(2).map(res => {
          return (
            <div key={res.id} className="wrapper">
              <ImageContainer
                src={res.urls.regular}
                thumb={res.urls.thumb}
                height={res.height}
                width={res.width}
                alt={res.alt_description}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
