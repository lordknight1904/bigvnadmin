import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WardNavBar from '../components/WardNavBar/WardNavBar';
import WardList from '../components/WardList/WardList';
import { getId } from '../../Login/LoginReducer';
import { Modal, Button, Form, FormGroup, FormControl, Col, Row, ControlLabel, Panel, HelpBlock } from 'react-bootstrap';
import { createWard, fetchWards, fetchDistricts, fetchDistrictsAll } from '../WardActions';
import { getCurrentPage, getWardCities } from '../WardReducer';
import { setNotify } from '../../App/AppActions';

class Ward extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      idSelected: '',
      show: false,
      message: '',

      cityId: '',
      districtId: '',
      wardName: '',
      createWard: false,
      creatingWard: false,
      districts: [],
    }
  }
  componentWillMount() {
    if (this.props.id === '') {
      this.context.router.push('/');
    } else {
      this.props.dispatch(fetchDistrictsAll());
    }
  }
  showDialog = (type, id) => {
    this.setState({ show: true, type, idSelected: id });
  };

  onCreateWard = () => {
    this.setState({ createWard: true });
  };
  hideCreateWard = () => {
    this.setState({ createWard: false });
  };
  handleWardName = (event) => {
    this.setState({ wardName: event.target.value });
  };
  onSubmit = () => {
    if (this.state.wardName.trim() === '') {
      this.props.dispatch(setNotify('Tên Tỉnh/Thành không được trống'));
      return;
    }
    const ward = {
      district: this.state.districtId,
      name: this.state.wardName,
    };
    this.setState({ createWard: true });
    this.props.dispatch(createWard(ward)).then(() => {
      if (this.props.districtId && this.props.districtId !== '') {
        this.props.dispatch(fetchWards(this.props.districtId, this.props.currentPage - 1));
      }
      this.setState({ creatingWard: false, createWard: false  });
    });
  };
  onDistrict = (event) => {
    this.setState({ districtId: event.target.value });
  };
  onCity = (event) => {
    this.setState({ cityId: event.target.value });
    if (event.target.value === '') {
      this.setState({ districts: [] });
    } else {
      this.props.dispatch(fetchDistricts(event.target.value, false)).then((res) => {
        this.setState({ districts: res.districts });
      });
    }
  };
  render() {
    return (
      <div>
        <Row>
          <WardNavBar onCreateWard={this.onCreateWard}/>
        </Row>
        <Row>
          <WardList showDialog={this.showDialog}/>
        </Row>

        <Modal
          show={this.state.createWard}
          onHide={this.hideCreateWard}
        >
          <Modal.Header>
            <Modal.Title>Thêm Phường/Xã mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>Thuộc Tỉnh/Thành</Col>
                <Col sm={10}>
                  <FormControl componentClass="select" placeholder="select" onChange={this.onCity} >
                    <option value=''>Chọn Tỉnh/Thành</option>
                    {
                      this.props.cities.map((city, index) => (
                        <option key={`${index}City`} value={city._id}>{city.name}</option>
                      ))
                    }
                  </FormControl>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>Thuộc Quận/Huyện</Col>
                <Col sm={10}>
                  <FormControl componentClass="select" placeholder="select" onChange={this.onDistrict} >
                    <option value=''>
                      {
                        (this.state.districts.length > 0) ? (
                          'Chọn Quận/Huyện'
                        ) : 'Chọn Tỉnh/Thành trước'
                      }
                    </option>
                    {
                      this.state.districts.map((district, index) => (
                        <option key={`${index}District`} value={district._id}>{district.name}</option>
                      ))
                    }
                  </FormControl>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Tên Phường/Xã
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.wardName}
                    onChange={this.handleWardName}
                  />
                </Col>
              </FormGroup>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideCreateWard} disabled={this.state.creatingWard}>Hủy</Button>
            <Button bsStyle="primary" onClick={this.onSubmit} disabled={this.state.creatingWard}>Tạo</Button>
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
    cities: getWardCities(state),
  };
}

Ward.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  cities: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

Ward.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Ward);
