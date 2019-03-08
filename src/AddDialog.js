import React, { Component } from "react";
import { Modal, Input } from "antd";

class AddDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.isVisible,
      firstName: "",
      lastName: "",
      score: ""
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.editData) {
      this.setState({
        firstName: nextProps.editData.firstName,
        lastName: nextProps.editData.lastName,
        score: nextProps.editData.score
      });
    }
    this.setState({ visible: nextProps.isVisible });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOk = () => {
    this.props.onSubmit({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      score: this.state.score,
      key: this.props.editData ? this.props.editData.key : -1
    });
    this.setState({ firstName: "", lastName: "", score: "" });
  };

  render() {
    const { visible, firstName, lastName, score } = this.state;
    return (
      <div>
        <Modal
          title="Add Leader"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.props.handleClose}
          closable={false}
        >
          <Input
            value={firstName}
            placeholder="Enter First Name"
            name="firstName"
            onChange={this.handleChange}
          />
          <br />
          <br />
          <Input
            value={lastName}
            placeholder="Enter Last Name"
            name="lastName"
            onChange={this.handleChange}
          />
          <br />
          <br />
          <Input
            value={score}
            type="number"
            placeholder="Enter Score"
            name="score"
            onChange={this.handleChange}
          />
        </Modal>
      </div>
    );
  }
}

export default AddDialog;
