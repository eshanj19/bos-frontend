import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import api from "../api";
import instance from "../axios";

class DeactivateAction extends Component {
  componentDidMount = () => {
    const { selectedIds, onExit, basePath, customPath, onSuccess } = this.props;
    console.log(this.props);
    onSuccess();
    // var apiPromises = [];
    // selectedIds.forEach(selectedId => {
    //   var url = basePath + "/" + selectedId + "/" + customPath + "/";
    //   apiPromises.push(api.post(url));
    // });
    // instance
    //   .all(apiPromises)
    //   .then(
    //     instance.spread(allResponses => {
    //       onExit();
    //       onSuccess();
    //     })
    //   )
    //   .catch(response => {
    //     console.log(response);
    //     api.handleError(response);
    //   });
  };

  render() {
    return null;
  }
}

DeactivateAction.propTypes = {
  customPath: PropTypes.string.isRequired
};

export default connect(
  undefined,
  {}
)(DeactivateAction);
