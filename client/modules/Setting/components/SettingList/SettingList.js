import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Checkbox, Button } from 'react-bootstrap';
import { fetchSettings, toggleSetting } from '../../SettingActions';
import { getSettings, getCurrentPage } from '../../SettingReducer';
import { getId } from '../../../Login/LoginReducer';
import styles from '../../../../main.css';
import dateFormat from 'dateformat';
class SettingList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(fetchSettings(this.props.currentPage - 1));
  }
  onToggle = (id) => {
    const setting = {
      id,
    };
    this.props.dispatch(toggleSetting(setting)).then(() => {
      this.props.dispatch(fetchSettings(this.props.currentPage - 1));
    });
  };
  render() {
    return (
      <Table striped bordered condensed hover className={styles.table}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá trị</th>
            <th>Ngày tạo</th>
            <th>Khóa</th>
            <th>Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.settings.map((setting, index) => {
            return (
              <tr key={index}>
                <td>{setting.name}</td>
                <td>{setting.value}</td>
                <td>{dateFormat(setting.dateCreated, 'dd/mm/yyyy HH:mm')}</td>
                <td>
                  <Checkbox defaultChecked={setting.disable} onClick={() => this.onToggle(setting._id)} />
                </td>
                <td>
                  <Button style={{ padding: '0', zIndex: '-1' }}>
                    <label style={{ width: '100%', padding: '6px 12px', zIndex: '1' }} onClick={() => this.props.modifyDialog(setting)}>
                      Chỉnh giá trị
                    </label>
                  </Button>
                </td>
              </tr>
            );
          })
        }
        </tbody>
      </Table>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    settings: getSettings(state),
    currentPage: getCurrentPage(state),
    id: getId(state),
  };
}

SettingList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  settings: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,

  modifyDialog: PropTypes.func.isRequired,
};

SettingList.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(SettingList);
