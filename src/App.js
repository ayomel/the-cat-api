import React from "react";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      isLoaded: false,
      index: 0
    };
    this.fetchImages = this.fetchImages.bind(this);
  }

  fetchImages() {
    const url = "https://api.thecatapi.com/v1/images/search";
    Promise.all([fetch(url), fetch(url), fetch(url), fetch(url), fetch(url)])

      .then(([res1, res2, res3, res4, res5]) => {
        return Promise.all([
          res1.json(),
          res2.json(),
          res3.json(),
          res4.json(),
          res5.json()
        ]);
      })
      .then(cats => {
        cats.map(cat => {
          let newArray = this.state.images.concat(cat[0].url);
          this.setState({ images: newArray, isLoaded: true });
        });
      });
  }

  componentDidMount() {
    this.fetchImages();
  }

  render() {
    const { isLoaded, images, index } = this.state;
    const length = images.length - 1;
    const handleNext = () => {
      index === length
        ? this.setState({ index: 0 })
        : this.setState({ index: this.state.index + 5 });
      this.fetchImages();
    };
    const handlePrevious = () =>
      index === length
        ? this.setState({ index: length })
        : this.setState({ index: this.state.index - 5 });
    return (
      <>
        <h4 className="cat_header">Cats are fun!</h4>
        <div className="container">
          {!index <= 0 && <button onClick={handlePrevious}>Back</button>}
          <div className="cat_container">
            {!isLoaded && (
              <div className="not_loaded">Loading... one moment please</div>
            )}
            {isLoaded &&
              images.map((cat, i) => {
                if (i < this.state.index + 5 && i >= this.state.index) {
                  return (
                    <div key={i}>
                      <img className="cat_image" src={cat} />
                    </div>
                  );
                }
              })}
          </div>
          <button onClick={handleNext}>Next</button>
        </div>
      </>
    );
  }
}
