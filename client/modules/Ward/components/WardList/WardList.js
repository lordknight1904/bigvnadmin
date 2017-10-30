import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Checkbox, Button } from 'react-bootstrap';
import { fetchWards, toggleWard } from '../../WardActions';
import { getWards, getCurrentPage, getDistrictId } from '../../WardReducer';
import { getId } from '../../../Login/LoginReducer';
// import { setNotify } from '../../../App/AppActions';
import styles from '../../../../main.css';
import dateFormat from 'dateformat';
class WardList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.districtId && this.props.districtId !== '') {
      this.props.dispatch(fetchWards(this.props.districtId, this.props.currentPage - 1));
    }
  }
  onToggle = (id) => {
    const ward = {
      id,
    };
    this.props.dispatch(toggleWard(ward)).then(() => {
      if (this.props.districtId && this.props.districtId !== '') {
        this.props.dispatch(fetchWards(this.props.districtId, this.props.currentPage - 1));
      }
    });
  };
  render() {
    return (
      <Table striped bordered condensed hover className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Tên Quận/Huyện</th>
            <th style={{ width: '20%' }}>Ngày tạo</th>
            <th style={{ width: '20%' }}>Sửa</th>
            <th style={{ width: '20%' }} className={styles.tableButtonCol}>Khóa</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.wards.map((ward, index) => {
            return (
              <tr key={index}>
                <td>{ward.name}</td>
                <td>{dateFormat(ward.dateCreated, 'dd/mm/yyyy HH:mm')}</td>
                <td>
                  <Button onClick={() => this.props.onEdit(ward)}>Sửa</Button>
                </td>
                <td>
                  <Checkbox checked={ward.disable} onClick={() => this.onToggle(ward._id)} />
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
    wards: getWards(state),
    currentPage: getCurrentPage(state),
    id: getId(state),
    districtId: getDistrictId(state),
  };
}

WardList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  districtId: PropTypes.string.isRequired,
  wards: PropTypes.array,
  showDialog: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

WardList.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(WardList);
