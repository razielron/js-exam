class ReviewList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div id='reviewlist'>
            {this.props.g_reviews.map((review, index) => {
                return <Review key={index} text={review.text} rank={review.rank}></Review>;
            })}
        </div>
    }
}