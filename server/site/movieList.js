class MovieList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "movielist"
    }, this.props.g_movies.map((movie, index) => {
      return /*#__PURE__*/React.createElement(OverviewMovie, {
        key: index,
        id: movie.id,
        movieName: movie.movieName,
        img: movie.img
      });
    }));
  }

}