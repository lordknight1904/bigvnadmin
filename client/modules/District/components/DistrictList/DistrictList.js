import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl, Button, Table, Checkbox } from 'react-bootstrap';
import { fetchDistricts, toggleDistrict } from '../../DistrictActions';
import { getDistricts, getCurrentPage, getCityId } from '../../DistrictReducer';
import { getId } from '../../../Login/LoginReducer';
import { setNotify } from '../../../App/AppActions';
import { getCities } from '../../../City/CityReducer';

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
    this.props.dispatch(toggleDistrict(district)).then(()  => {
      if (this.props.cityId && this.props.cityId !== '') {
        this.props.dispatch(fetchDistricts(this.props.cityId, this.props.currentPage - 1));
      }
    });
  };
  render() {
    return (
      <Table striped bordered condensed hover>
        <thead>
        <tr>
          <th>Tên Quận/Huyện</th>
          <th>Ngày tạo</th>
          <th>Thao tác</th>
        </tr>
        </thead>
        <tbody>
        {
          this.props.districts.map((district, index) => {
            const date = new Date(district.dateCreated);
            const hours =  date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
            const minutes =  date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
            const time = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${hours}:${minutes}`;
            return (
              <tr key={index}>
                <td>{district.name}</td>
                <td>{time}</td>
                <td>
                  <Checkbox checked={district.disable} onClick={() => this.onToggle(district._id)} />
                </td>
              </tr>
            )
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
};

DistrictList.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(DistrictList);
