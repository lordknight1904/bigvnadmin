import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CityNavBar from '../components/CityNavBar/CityNavBar';
import CityList from '../components/CityList/CityList';
import { getId } from '../../Login/LoginReducer';
import { Modal, Button, Form, FormGroup, FormControl, Col, Row, ControlLabel } from 'react-bootstrap';
import { createCity, fetchCities } from '../CityActions';
import { getCurrentPage } from '../CityReducer';
import { setNotify } from '../../App/AppActions';

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      idSelected: '',
      show: false,
      message: '',

      cityName: '',
      createCity: false,
      creatingCity: false,
    };
  }
  componentWillMount() {
    if (this.props.id === '') {
      this.context.router.push('/');
    }
  }
  onSubmit = () => {
    if (this.state.cityName.trim() === '') {
      this.props.dispatch(setNotify('Tên Tỉnh/Thành không được trống'));
      return;
    }
    const city = {
      name: this.state.cityName,
    };
    this.setState({ createCity: true });
    this.props.dispatch(createCity(city)).then(() => {
      this.props.dispatch(fetchCities(this.props.currentPage - 1));
      this.setState({ creatingCity: false, createCity: false, });
    });
  };
  onCreateCity = () => {
    this.setState({ createCity: true });
  };
  hideCreateCity = () => {
    this.setState({ createCity: false });
  };
  handleCityName = (event) => {
    this.setState({ cityName: event.target.value });
  };
  showDialog = (type, id) => {
    this.setState({ show: true, type, idSelected: id });
  };
  render() {
    return (
      <div>
        <Row>
          <CityNavBar onCreateCity={this.onCreateCity} />
        </Row>
        <Row>
          <CityList showDialog={this.showDialog} />
        </Row>

        <Modal
          show={this.state.createCity}
          onHide={this.hideCreateCity}
        >
          <Modal.Header>
            <Modal.Title>Thêm Tỉnh/Thành mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Tên Tỉnh/Thành
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.cityName}
                    onChange={this.handleCityName}
                  />
                </Col>
              </FormGroup>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideCreateCity} disabled={this.state.creatingCity}>Hủy</Button>
            <Button bsStyle="primary" onClick={this.onSubmit} disabled={this.state.creatingCity}>Tạo</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    id: getId(state),
    currentPage: getCurrentPage(state),
  };
}
City.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
City.contextTypes = {
  router: PropTypes.object,
};
export default connect(mapStateToProps)(City);
