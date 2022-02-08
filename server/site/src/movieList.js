class MovieList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div id='movielist'>
            {this.props.g_movies.map((movie, index) => {
                return <OverviewMovie key={index} id={movie.id} movieName={movie.movieName} img={movie.img}></OverviewMovie>
            })}
        </div>
    }
}
