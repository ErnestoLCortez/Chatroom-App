import * as React from 'react';
import {
  Socket
}
from './Socket';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';


const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export class UserList extends React.Component {

  constructor() {
    super();
    this.state = {
      userList: {},
      userCount: 0,
    };

    this.updateUserList = this.updateUserList.bind(this);
  }
  componentDidMount() {
    Socket.on('userlist', this.updateUserList);
  }

  updateUserList(list) {
    this.setState({
      userList: list,
      userCount: Object.keys(list).length,
    });

  }

  renderUserList() {

    return Object.keys(this.state.userList).map((user, i) =>
      <Chip key={i}
        style={styles.chip}
        >
          <Avatar src={this.state.userList[user].avatar} />
          {this.state.userList[user].username}
        </Chip>
    );
  }

  render() {
    return (
      <div style={styles.wrapper}>
        User count: {this.state.userCount}
        {this.renderUserList()}
      </div>
    );
  }
}
