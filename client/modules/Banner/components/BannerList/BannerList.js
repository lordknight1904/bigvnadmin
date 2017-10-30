import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Table, Checkbox } from 'react-bootstrap';
import { fetchBanners, uploadBanner, toggleBanner } from '../../BannerActions';
import { getBanners, getSearch, getCurrentPage } from '../../BannerReducer';
import { getId } from '../../../Login/LoginReducer';
import { setNotify } from '../../../App/AppActions';
import styles from '../../../../main.css';
import dateFormat from 'dateformat';
class BannerList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(fetchBanners(this.props.search, this.props.currentPage - 1));
  }
  onClick = (type, a) => {
    if (a._id === this.props.id) {
      this.props.dispatch(setNotify('Không thể tự Tước quyền/Khôi phục.'));
    } else {
      this.props.showDialog(type, a._id);
    }
  };
  onToggle = (id) => {
    const banner = {
      id,
    };
    this.props.dispatch(toggleBanner(banner)).then(() => {
      this.props.dispatch(fetchBanners(this.props.search, this.props.currentPage - 1));
    });
  };
  onUpdate = (id, e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    let base64image = null;
    reader.onload = (readerEvt) => {
      base64image = readerEvt.target.result;
    };
    reader.onloadend = () => {
      this.props.dispatch(uploadBanner(base64image, id)).then((res) => {
        if (res.banner !== 'error') {
          this.setState({
            imageDirectory: res.banner,
            imagePreview: base64image,
          });
        }
        this.props.dispatch(fetchBanners(this.props.search, this.props.currentPage - 1));
      });
    };
    reader.readAsDataURL(file);
  };
  render() {
    return (
      <Table striped bordered condensed hover className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Tên</th>
            <th style={{ width: '20%' }}>Mô tả</th>
            <th style={{ width: '20%' }}>Ngày tạo</th>
            <th style={{ width: '10%' }}>Preview</th>
            <th style={{ width: '10%' }}>Thao tác</th>
            <th style={{ width: '10%' }}>Khóa</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.banners.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.name}</td>
                <td>{a.description}</td>
                <td>{dateFormat(a.dateCreated, 'dd/mm/yyyy HH:mm')}</td>
                <td>
                  <Button onClick={() => this.props.setPreview(a.imageDirectory)}>Preview Hình</Button>
                  {/*<div style={{ textAlign: 'center' }}>*/}
                    {/*<img role="presentation" width={150} height={150} src={`/banner/${a.imageDirectory}`} />*/}
                  {/*</div>*/}
                </td>
                <td>
                  <Button style={{ padding: '0', zIndex: '-1' }}>
                    <label htmlFor="file-upload" style={{ width: '100%', padding: '6px 12px', zIndex: '1' }}>
                      Sửa ảnh
                    </label>
                  </Button>
                  <input
                    id="file-upload"
                    accept="image/jpeg, image/png"
                    type="file"
                    onChange={(e) => this.onUpdate(a._id, e)}
                    style={{ display: 'none' }}
                  />

                </td>
                <td style={{ textAlign: 'center' }}>
                  <Checkbox checked={a.disable} onClick={() => this.onToggle(a._id)} />
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
    banners: getBanners(state),
    currentPage: getCurrentPage(state),
    search: getSearch(state),
    id: getId(state),
  };
}

BannerList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  setPreview: PropTypes.func.isRequired,
  banners: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  search: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

BannerList.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(BannerList);
