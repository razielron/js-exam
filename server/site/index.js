class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      g_movies: []
    };
    this.searchChange = this.searchChange.bind(this);
    this.searchMovie = this.searchMovie.bind(this);
  }

  async searchChange(event) {
    let new_state = {};
    new_state.g_movies = this.state.g_movies;
    new_state.search = event.target.value;
    this.setState(new_state);
  }

  async fetchMovies() {
    let res = await fetch(`http://localhost:5050/api/movies?movieName=${this.state.search}`);
    if (res.status != 200) throw new Error('Error while fetching movies');
    res = await res.json();
    return res.g_movies;
  }

  async searchMovie() {
    let g_movies = await this.fetchMovies();
    let new_state = {};
    new_state.search = this.state.search;
    new_state.g_movies = g_movies;
    this.setState(new_state);
  }

  async componentDidMount() {
    let g_movies = await this.fetchMovies();
    let maxLen = g_movies.length - 1;
    let random_movies = [];

    for (let i = 0; i < 3; i++) {
      let randomIndex = Math.floor(Math.random() * maxLen);
      let movie = g_movies[randomIndex];
      random_movies.push(movie);
    }

    this.setState({
      search: this.state.search,
      g_movies: random_movies
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "homepage"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      placeholder: "search for a movie name...",
      value: this.state.search,
      onChange: this.searchChange
    }), /*#__PURE__*/React.createElement("button", {
      onClick: this.searchMovie
    }, "search"), /*#__PURE__*/React.createElement(MovieList, {
      g_movies: this.state.g_movies
    }));
  }

}