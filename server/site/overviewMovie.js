class OverviewMovie extends React.Component {
  constructor(props) {
    super(props);
    this.openMovieReview = this.openMovieReview.bind(this);
  }

  openMovieReview() {
    window.location.href = `http://localhost:5050/movie?id=${this.props.id}`;
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "movie",
      onClick: this.openMovieReview
    }, /*#__PURE__*/React.createElement("span", null, this.props.movieName), /*#__PURE__*/React.createElement("img", {
      src: this.props.img
    }));
  }

}