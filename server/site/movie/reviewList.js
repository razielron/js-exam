class ReviewList extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "reviewlist"
      }, this.props.g_reviews.map((review, index) => {
        return /*#__PURE__*/React.createElement(Review, {
          key: index,
          text: review.text,
          rank: review.rank
        });
      }));
    }
  
  }