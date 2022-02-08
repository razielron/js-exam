class OverviewMovie extends React.Component {
    constructor(props) {
        super(props);
        this.openMovieReview = this.openMovieReview.bind(this);
    }

    openMovieReview() {
        window.location.href = `http://localhost:5050/movie?id=${this.props.id}`;
    }

    render() {
        return <div id='movie' onClick={this.openMovieReview}>
            <span>{this.props.movieName}</span>
            <img src={this.props.img}></img>
        </div>
    }
}