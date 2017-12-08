import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Table, Checkbox } from 'react-bootstrap';
import { fetchKeywords, toggleKeyword } from '../../KeywordActions';
import { getKeywords, getSearch, getCurrentPage } from '../../KeywordReducer';
import { getId } from '../../../Login/LoginReducer';
import { setNotify } from '../../../App/AppActions';
import styles from '../../../../main.css';
import dateFormat from 'dateformat';

class KeywordList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(fetchKeywords(this.props.search, this.props.currentPage - 1));
  }
  onToggle = (k) => {
    const keyword = {
      _id: k._id,
      disable: k.disable,
    };
    this.props.dispatch(toggleKeyword(keyword)).then(() => {
      this.props.dispatch(fetchKeywords(this.props.search, this.props.currentPage - 1));
    });
  };
  render() {
    return (
      <Table striped bordered condensed hover className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Tên</th>
            <th style={{ width: '20%' }}>Alias</th>
            <th style={{ width: '20%' }}>Vô hiệu</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.keywords.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.title}</td>
                <td>{a.alias}</td>
                <td style={{ textAlign: 'center' }}>
                  <Checkbox checked={a.disable} onClick={() => this.onToggle(a)} />
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
    keywords: getKeywords(state),
    currentPage: getCurrentPage(state),
    search: getSearch(state),
    id: getId(state),
  };
}

KeywordList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  setPreview: PropTypes.func.isRequired,
  keywords: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  search: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

KeywordList.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(KeywordList);
