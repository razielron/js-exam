class Review extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div id='review'>
            <div>rank: {this.props.rank}</div>
            <div>text: {this.props.text}</div>
        </div>
    }
}