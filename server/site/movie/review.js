class Review extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "review"
      }, /*#__PURE__*/React.createElement("div", null, "rank: ", this.props.rank), /*#__PURE__*/React.createElement("div", null, "text: ", this.props.text));
    }
  
  }