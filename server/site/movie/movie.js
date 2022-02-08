class Movie extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        movie: '',
        g_reviews: [],
        new_review: {
          text: '',
          rank: '',
          email: '',
          userName: ''
        }
      };
      this.emailChange = this.emailChange.bind(this);
      this.userNameChange = this.userNameChange.bind(this);
      this.textChange = this.textChange.bind(this);
      this.rankChange = this.rankChange.bind(this);
      this.postReview = this.postReview.bind(this);
    }
  
    userNameChange(event) {
      let new_state = {};
      new_state.movie = this.state.movie;
      new_state.g_reviews = this.state.g_reviews;
      new_state.new_review = this.state.new_review;
      new_state.new_review.userName = event.target.value;
      this.setState(new_state);
    }
  
    emailChange(event) {
      let new_state = {};
      new_state.movie = this.state.movie;
      new_state.g_reviews = this.state.g_reviews;
      new_state.new_review = this.state.new_review;
      new_state.new_review.email = event.target.value;
      this.setState(new_state);
    }
  
    textChange(event) {
      let new_state = {};
      new_state.movie = this.state.movie;
      new_state.g_reviews = this.state.g_reviews;
      new_state.new_review = this.state.new_review;
      new_state.new_review.text = event.target.value;
      this.setState(new_state);
    }
  
    rankChange(event) {
      let new_state = {};
      new_state.movie = this.state.movie;
      new_state.g_reviews = this.state.g_reviews;
      new_state.new_review = this.state.new_review;
      new_state.new_review.rank = event.target.value;
      this.setState(new_state);
    }
  
    async postReview() {
      await this.createReview();
      await this.updateReviews();
    }
  
    async createReview() {
      let data = this.state.new_review;
      data.movieId = this.state.movie.id;
      console.log({
        data
      });
      let res = await fetch(`http://localhost:5050/api/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (res.status != 200) throw new Error('Error while fetching reviews');
      res = await res.json();
    }
  
    async fetch_reviews(movieId) {
      let res = await fetch(`http://localhost:5050/api/reviews`);
      if (res.status != 200) throw new Error('Error while fetching reviews');
      res = await res.json();
      return res.g_reviews.filter(review => review.movieId === movieId);
    }
  
    getMovieIdByUrl() {
      const url = new URL(window.location.href); // returns the URL query String
  
      const params = new URLSearchParams(url.search);
      let id = params.get('id');
      return parseInt(id);
    }
  
    async getMovieById(movieId) {
      let res = await fetch('http://localhost:5050/api/movies');
      if (res.status != 200) throw new Error('Error while fetching movies');
      res = await res.json();
      let movie = res.g_movies.filter(movie => movie.id === movieId);
      return movie[0];
    }
  
    async updateReviews() {
      const movieId = this.getMovieIdByUrl();
      const movie = await this.getMovieById(movieId);
      if (!movie) return;
      const g_reviews = await this.fetch_reviews(movieId);
      this.setState({
        movie,
        g_reviews,
        new_review: this.state.new_review
      });
    }
  
    async componentDidMount() {
      await this.updateReviews();
    }
  
    render() {
      if (!this.state.movie) return /*#__PURE__*/React.createElement("div", null);
      return /*#__PURE__*/React.createElement("div", {
        id: "movie"
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Movie: ", this.state.movie.movieName), /*#__PURE__*/React.createElement("img", {
        src: this.state.movie.img
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
        type: "text",
        placeholder: "email",
        value: this.state.new_review.email,
        onChange: this.emailChange
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        placeholder: "display name",
        value: this.state.new_review.userName,
        onChange: this.userNameChange
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
        type: "text",
        placeholder: "write new review...",
        value: this.state.new_review.text,
        onChange: this.textChange
      }), /*#__PURE__*/React.createElement("input", {
        type: "number",
        placeholder: "rank",
        value: this.state.new_review.rank,
        onChange: this.rankChange
      }), /*#__PURE__*/React.createElement("button", {
        onClick: this.postReview
      }, "post review")), /*#__PURE__*/React.createElement(ReviewList, {
        g_reviews: this.state.g_reviews
      }));
    }
  
  }