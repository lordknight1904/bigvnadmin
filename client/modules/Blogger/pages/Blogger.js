import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getId } from '../../Login/LoginReducer';
import { Modal, Button, Form, FormGroup, FormControl, Col, Row, ControlLabel, DropdownButton, MenuItem, } from 'react-bootstrap';
import { uploadImage, postBlog, fetchTopics, fetchBlogs } from '../BloggerActions';
import { getTopics } from '../BloggerReducer';
import  CKEditor from 'react-ckeditor-component';
import { setNotify } from '../../App/AppActions'
import styles from './Blogger.css';

class Blogger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      topicName: 'Chủ để',
      title: '',
      content: '',

      reviews: [],
      images: [],
      isSubmitting: false,
    }
  }
  componentWillMount() {
    if (this.props.id === '') {
      this.context.router.push('/');
    } else {
      this.props.dispatch(fetchTopics());
    }
  }
  onChange = (evt) => { this.setState({ content: evt.editor.getData() });};
  onTitle = (event) => { this.setState({ title: event.target.value });};
  onUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    let base64image = null;
    reader.onload = (readerEvt) => {
      base64image = readerEvt.target.result;
    };
    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
      this.props.dispatch(uploadImage(base64image)).then((res) => {
        console.log(res);
        if (res.news !== 'error') {
          this.setState({
            images: [...this.state.images, res.blog],
            reviews: [...this.state.reviews, base64image]
          });
        }
      });
    };
    reader.readAsDataURL(file);
  };
  onTopic = (topic) => {
    this.setState({ topic: topic._id, topicName: topic.title });
  };
  onSubmit = () => {
    const blog = {
      title: this.state.title,
      topic: this.state.topic,
      content: this.state.content,
      imageDirectories: this.state.images,
    };
    this.props.dispatch(postBlog(blog)).then((res) => {
      console.log(res);
    })
  };
  render() {
    return (
      <div style={{ padding : '20px', width: '80%', margin: 'auto' }}>
        <Form horizontal>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Chủ đề
            </Col>
            <Col sm={10}>
              <DropdownButton title={this.state.topicName} id="bg-nested-dropdown" >
                {
                  this.props.topics.map((topic, index) => {
                    if (!topic.disable)
                      return (
                        <MenuItem key={`${index}Topic`} value={topic._id} onClick={() => this.onTopic(topic)} >{topic.title}</MenuItem>
                      )
                    }
                  )
                }
              </DropdownButton>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Tiêu đề
            </Col>
            <Col sm={10}>
              <FormControl type="text" value={this.state.title} onChange={this.onTitle} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Nội dung
            </Col>
            <Col sm={10}>
              <CKEditor
                activeClass="p10"
                content={this.state.content}
                events={{
                  change: this.onChange
                }}
              />
            </Col>
          </FormGroup>


          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Hình ảnh
            </Col>
            <Col sm={10}>
              {
                this.state.reviews.map((r, index) => (
                  <div key={index} className={styles.containerImages}>
                    <img width={75} height={75} src={r} />
                  </div>
                ))
              }

              <div className={styles.containerImages}>
                <label htmlFor="file-upload" className={styles.customUpload}>
                  <i className="fa fa-cloud-upload" style={{ color: '#03a9f4' }} />
                  Tải hình ảnh
                </label>
                <input id="file-upload" accept="image/jpeg, image/png" type="file" style={{ display: 'none' }} onChange={this.onUpload} />
              </div>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button onClick={this.onSubmit} disabled={this.state.isSubmitting}>
                Đăng bài
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    topics: getTopics(state)
  };
}

Blogger.propTypes = {
  dispatch: PropTypes.func.isRequired,
  topics: PropTypes.array.isRequired,
};

Blogger.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Blogger);
