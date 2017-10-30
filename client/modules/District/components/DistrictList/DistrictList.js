import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Checkbox, Button } from 'react-bootstrap';
import { fetchDistricts, toggleDistrict } from '../../DistrictActions';
import { getDistricts, getCurrentPage, getCityId } from '../../DistrictReducer';
import { getId } from '../../../Login/LoginReducer';
// import { setNotify } from '../../../App/AppActions';
import { getCities } from '../../../City/CityReducer';
import styles from '../../../../main.css';
import dateFormat from 'dateformat';
class DistrictList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.cityId && this.props.cityId !== '') {
      this.props.dispatch(fetchDistricts(this.props.cityId, this.props.currentPage - 1));
    }
  }
  onToggle = (id) => {
    const district = {
      id,
    };
    this.props.dispatch(toggleDistrict(district)).then(() => {
      if (this.props.cityId && this.props.cityId !== '') {
        this.props.dispatch(fetchDistricts(this.props.cityId, this.props.currentPage - 1));
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
          this.props.districts.map((district, index) => {
            return (
              <tr key={index}>
                <td>{district.name}</td>
                <td>{dateFormat(district.dateCreated, 'dd/mm/yyyy HH:mm')}</td>
                <td>
                  <Button onClick={() => this.props.onEdit(district)}>Sửa</Button>
                </td>
                <td className="text-center">
                  <Checkbox checked={district.disable} onClick={() => this.onToggle(district._id)} />
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
    cities: getCities(state),
    districts: getDistricts(state),
    currentPage: getCurrentPage(state),
    id: getId(state),
    cityId: getCityId(state),
  };
}

DistrictList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
  districts: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  cityId: PropTypes.string.isRequired,

  showDialog: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

DistrictList.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(DistrictList);
