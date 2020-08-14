import React, { Component } from 'react'
import { Media, Card, CardBody } from 'reactstrap';
import { FaThumbsUp, FaThumbsDown, FaAngleDown } from 'react-icons/fa';
import logo from './default.jpg';

class CommentDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      "isReply": false,
      "isCommentDetails": false,
      "viewCommentDetailsId": "",
      "isReplyId": "",
      "isReplyComment": ""
    }
  }

  openreply = (comment) => {
    this.setState({
      isReply: true,
      isReplyId: comment._id
    })
  }

  replyOnHandler = (e) => {
    this.setState({
      isReplyComment: e.target.value
    })
  }

  submitReply = (comment) => {
    this.clearForm();
    comment.comment = this.state.isReplyComment
    this.props.submitReply(comment);
    
  }

  openReplyDetails = (index) => {
    this.setState({
      isCommentDetails: true,
      viewCommentDetailsId: index
    })
  }

  clearForm = () => {
    document.getElementById("commentDetailsForm").reset();
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <h3>Comment Details</h3>
          {this.props.commentDetails.length > 0 && <p>{this.props.commentDetails.length} Comments</p>}
          {!this.props.commentDetails.length && <p>Be the first to write a comment!</p>}
          {
            this.props.commentDetails && this.props.commentDetails.map((comment, index) =>
              <Card key={index}>
                <CardBody>
                  <Media>
                    <Media left top href="#">
                      <Media object src={logo} alt="test" style={{ width: "40px", borderRadius: "100px" }} />
                    </Media>
                    <Media body>
                      <Media>
                        <div style={{ textAlign: "left", marginLeft: "30px" }}>
                          <b>49er Fan</b> <small> 35 mins ago</small>
                          <p style={{ fontWeight: "500" }}>{comment.comment}</p>
                        </div>
                      </Media>
                      <div style={{ textAlign: "left", marginLeft: "30px" }}>
                        <span onClick={() => this.props.likeOnHandler(comment)}> <FaThumbsUp /> {comment.likes} </span> {' '}
                        <span onClick={() => this.props.dislikeOnHandler(comment)} style={{ marginLeft: "10px" }}> <FaThumbsDown /> {comment.dislikes} </span>
                        <span onClick={() => this.openreply(comment)} style={{ marginLeft: "10px", cursor: "pointer" }}>REPLY</span> <br />
                        {comment.replies.length > 0 && <div onClick={() => this.openReplyDetails(index)} style={{ textAlign: "left", cursor: "pointer", marginTop: "10px" }}>  <FaAngleDown /> View {comment.replies.length} Replies {this.state.viewCommentDetails}</div>}
                        {
                          this.state.isReply && this.state.isReplyId == comment._id &&
                          <form id="commentDetailsForm">
                            <div class="input-group mb-3" style={{ marginTop: "10px" }}>
                              <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1" className="btn btn-success" onClick={() => this.submitReply(comment)}>Submit</span>
                              </div>
                              <input type="text" onChange={this.replyOnHandler} className="form-control" placeholder="Enter comments" />
                            </div>
                          </form>
                        }
                      </div>
                    </Media>
                  </Media>
                  {
                    comment.replies.map((replies, j) =>
                      <div>
                        {this.state.viewCommentDetailsId == index && this.state.isCommentDetails &&
                          <CardBody key={j}>

                            <Media>
                              <Media left top href="#">
                                <Media object src={logo} alt="test" style={{ width: "40px", borderRadius: "100px", marginLeft: "40px" }} />
                              </Media>
                              <Media body>
                                <Media>
                                  <div style={{ textAlign: "left", marginLeft: "30px" }}>
                                    <b>Frank Gore</b> <small> 1 day ago</small>
                                    <p style={{ fontWeight: "500" }}>{replies.comment}</p>
                                  </div>
                                </Media>
                              </Media>
                            </Media>
                          </CardBody>}
                      </div>
                    )}
                </CardBody>
              </Card>
            )
          }
        </div>
        <div className="col-lg-3"></div>
      </div>
    )
  }
}
export default CommentDetails; 