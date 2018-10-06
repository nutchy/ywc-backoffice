import React, {Component, Fragment} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {observable} from "mobx";
import {observer} from "mobx-react";
import {Table, Icon, Button, Tag} from "antd";
import {Link} from "react-router-dom";

import {authen} from "../utils/authen";
import {fetch, fetchWithToken} from "../utils/fetch";

const Stat = styled.div`
  color: #777;
  margin-bottom: 20px;
`;

const Padding = styled.div`
  padding: 20px;
  padding-bottom: 5px;
`;

const columns = [
  {
    title: "No.",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "User ID.",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: status => (
      <span>
        <Tag color={!status ? "red" : "green"}>
          {!status ? "ยังไม่ได้ตรวจ" : "ตรวจแล้ว"}
        </Tag>
      </span>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: data => (
      <Button>
        <Link params={{id: data.id}} to={`/committee/${data.id}`}>
          <Icon type="edit" theme="outlined" /> ตรวจคำถาม
        </Link>
      </Button>
    ),
  },
];

const mapStateToProps = state => ({
  auth: state.auth,
});

@authen("committee")
@connect(mapStateToProps)
@observer
export default class Candidates extends Component {
  @observable
  totalCandidates = 0;
  @observable
  candidates = [];

  // fetch and render data
  componentDidMount = async () => {
    this.getCandidates();
    this.getStat();
  };

  getCandidates = async () => {
    const {major} = this.props.auth.profile;
    const response = await fetchWithToken("users/committee", {major}, "GET");

    if (response.status === "success") {
      this.candidates = response.payload;
    }
  };

  getStat = async () => {
    const response = await fetch("users/stat");
    const {payload} = response;

    this.totalCandidates = payload[this.props.auth.profile.major];
  };

  render() {
    const {profile} = this.props.auth;

    return (
      <Fragment>
        <Padding>
          <Stat>
            คนสมัครทั้งหมด {this.totalCandidates} คน, ตรวจแล้ว{" "}
            {this.totalCandidates - this.candidates.length} คน (สาขา{" "}
            {profile.major})
          </Stat>
        </Padding>

        <Table
          columns={columns}
          dataSource={this.candidates.map((candidate, i) => ({
            key: i + 1,
            id: candidate._id,
            status: candidate.committeeVote.indexOf(profile.username) !== -1,
          }))}
        />
      </Fragment>
    );
  }
}
