import React, { Component } from "react";
import { Table, Button } from "antd";
import AddDialog from "./AddDialog";

import "antd/dist/antd.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderBoard: [],
      editData: "",
      isVisible: false
    };
  }

  onDelete = data => {
    const { leaderBoard } = this.state;
    const i = leaderBoard.findIndex(d => d.key === data.key);
    if (i !== -1) {
      leaderBoard.splice(i, 1);
      this.setState(state => ({ leaderBoard: leaderBoard }));
    }
  };

  onEdit = data => {
    this.setState({ editData: data, isVisible: true });
  };

  handleClose = () => {
    this.setState({ isVisible: false, editData: "" });
  };

  onSubmit = data => {
    data.name = data.firstName + ", " + data.lastName;
    debugger;
    if (this.state.editData) {
      let { leaderBoard } = this.state;
      const i = leaderBoard.findIndex(d => d.key === data.key);
      if (i !== -1) {
        leaderBoard[i] = data;
        this.setState({ leaderBoard, isVisible: false, editData: "" });
      }
    } else {
      data.key = this.state.leaderBoard.length;
      this.setState(state => ({
        leaderBoard: [...state.leaderBoard, data],
        isVisible: false,
        editData: ""
      }));
    }
  };

  render() {
    const { leaderBoard, isVisible, editData } = this.state;

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Score",
        dataIndex: "score",
        key: "score",
        sorter: (a, b) => a.score - b.score
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: data => (
          <div>
            <a href="javascript:;" onClick={() => this.onDelete(data)}>
              Delete
            </a>
            <a href="javascript:;" onClick={() => this.onEdit(data)}>
              Edit
            </a>
          </div>
        )
      }
    ];
    return (
      <div>
        <div style={{ padding: 25, textAlign: "right" }}>
          <Button
            onClick={() => {
              this.setState({ isVisible: true });
            }}
          >
            Add Leder
          </Button>
        </div>
        <AddDialog
          isVisible={isVisible}
          editData={editData}
          handleClose={this.handleClose}
          onSubmit={this.onSubmit}
        />
        <Table columns={columns} dataSource={leaderBoard} />
      </div>
    );
  }
}

export default App;
