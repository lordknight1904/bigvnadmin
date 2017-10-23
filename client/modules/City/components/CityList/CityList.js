import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Checkbox } from 'react-bootstrap';
import { fetchCities, toggleCity } from '../../CityActions';
import { getCities, getCurrentPage } from '../../CityReducer';
import { getId } from '../../../Login/LoginReducer';
import styles from '../../../../main.css';
import dateFormat from 'dateformat';
class CityList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(fetchCities(this.props.currentPage - 1));
  }
  onToggle = (id) => {
    const city = {
      id,
    };
    this.props.dispatch(toggleCity(city)).then(() => {
      this.props.dispatch(fetchCities(this.props.currentPage - 1));
    });
  };
  render() {
    return (
      <Table striped bordered condensed hover className={styles.table}>
        <thead>
          <tr>
            <th>Tên Tỉnh/Thành</th>
            <th>Ngày tạo</th>
            <th className={styles.tableButtonCol}>Khóa</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.cities.map((city, index) => {
            return (
              <tr key={index}>
                <td>{city.name}</td>
                <td>{dateFormat(city.dateCreated, 'dd/mm/yyyy HH:mm')}</td>
                <td>
                  <Checkbox checked={city.disable} onClick={() => this.onToggle(city._id)} />
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
    currentPage: getCurrentPage(state),
    id: getId(state),
  };
}

CityList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,

  showDialog: PropTypes.func.isRequired,
};

CityList.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(CityList);
