import React, { Component } from 'react'
import { Media, Card, CardBody } from 'reactstrap';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import logo from './default.jpg';

class CommentDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      "isReply": false,
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
    comment.comment = this.state.isReplyComment
    this.props.submitReply(comment)
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <h3>Comment Details</h3>
          {
            this.props.commentDetails && this.props.commentDetails.map((comment, index) =>
              <Card key={index}>
                <CardBody>
                  <Media>
                    <Media left top href="#">
                      <Media object src={logo} alt="test" style={{ width: "50px", borderRadius: "100px" }} />
                    </Media>
                    <Media body>
                      <Media>
                        <div style={{ textAlign: "left", marginLeft: "50px" }}>
                          {comment.comment}<br />
                        </div>
                      </Media>
                      <div style={{ textAlign: "left", marginLeft: "50px" }}><br />
                        <span onClick={() => this.props.likeOnHandler(comment)}> <FaThumbsUp /> ({comment.likes})</span> {' '}
                        <span onClick={() => this.props.dislikeOnHandler(comment)}> <FaThumbsDown /> ({comment.dislikes}) </span>
                        <span onClick={() => this.openreply(comment)}>Reply</span>
                        {
                          this.state.isReply && this.state.isReplyId == comment._id &&
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" id="basic-addon1" className="btn btn-success" onClick={() => this.submitReply(comment)}>Submit</span>
                            </div>
                            <input type="text" onChange={this.replyOnHandler} className="form-control" />
                          </div>
                        }
                      </div>
                    </Media>
                  </Media>
                  {
                    comment.replies.map((replies, j) =>
                      <CardBody key={j}>
                        <Media>
                          <Media left top href="#">
                            <Media object src={logo} alt="test" style={{ width: "50px", borderRadius: "100px" }} />
                          </Media>
                          <Media body>
                            <Media heading>
                              <div style={{ textAlign: "left", marginLeft: "50px" }}>
                                {replies.comment}<br />
                              </div>
                            </Media>
                          </Media>
                        </Media>
                      </CardBody>
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