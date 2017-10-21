import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DistrictNavBar from '../components/DistrictNavBar/DistrictNavBar';
import DistrictList from '../components/DistrictList/DistrictList';
import { getId } from '../../Login/LoginReducer';
import { Modal, Button, Form, FormGroup, FormControl, Col, Row, ControlLabel, Panel, HelpBlock } from 'react-bootstrap';
import { createDistrict, fetchDistricts, fetchCitiesAll } from '../DistrictActions';
import { getCurrentPage } from '../DistrictReducer';
import { setNotify } from '../../App/AppActions';
import { getCities } from '../../City/CityReducer';

class District extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      idSelected: '',
      show: false,
      message: '',

      districtName: '',
      cityId: '',
      createDistrict: false,
      creatingDistrict: false,
    }
  }
  componentWillMount() {
    if (this.props.id === '') {
      this.context.router.push('/');
    } else {
      this.props.dispatch(fetchCitiesAll());
    }
  }
  showDialog = (type, id) => {
    this.setState({ show: true, type, idSelected: id });
  };

  onCreateDistrict = () => {
    this.setState({ createDistrict: true });
  };
  hideCreateDistrict = () => {
    this.setState({ createDistrict: false });
  };
  handleDistrictName = (event) => {
    this.setState({ districtName: event.target.value });
  };
  onSubmit = () => {
    if (this.state.districtName.trim() === '') {
      this.props.dispatch(setNotify('Tên Tỉnh/Thành không được trống'));
      return;
    }
    const district = {
      cityId: this.state.cityId,
      name: this.state.districtName,
    };
    this.setState({ createDistrict: true });
    this.props.dispatch(createDistrict(district)).then(() => {
      if (this.props.cityId && this.props.cityId !== '') {
        this.props.dispatch(fetchDistricts(this.props.cityId, this.props.currentPage - 1));
      }
      this.setState({ creatingDistrict: false, createDistrict: false  });
    });
  };
  onCity = (event) => {
    this.setState({ cityId: event.target.value });
  };
  render() {
    return (
      <div>
        <Row>
          <DistrictNavBar onCreateDistrict={this.onCreateDistrict}/>
        </Row>
        <Row>
          <DistrictList showDialog={this.showDialog}/>
        </Row>

        <Modal
          show={this.state.createDistrict}
          onHide={this.hideCreateDistrict}
        >
          <Modal.Header>
            <Modal.Title>Thêm Quận/Huyện mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Thuộc Tỉnh/Thành
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="select" placeholder="select" onChange={this.onCity} >
                    <option value=''>Chọn Tỉnh/Thành</option>
                    {
                      this.props.cities.map((city, index) => (
                        <option key={index} value={city._id}>{city.name}</option>
                      ))
                    }
                  </FormControl>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Tên Quận/huyện
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.districtName}
                    onChange={this.handleDistrictName}
                  />
                </Col>
              </FormGroup>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideCreateDistrict} disabled={this.state.creatingDistrict}>Hủy</Button>
            <Button bsStyle="primary" onClick={this.onSubmit} disabled={this.state.creatingDistrict}>Tạo</Button>
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
    cities: getCities(state),
  };
}

District.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  cities: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

District.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(District);
