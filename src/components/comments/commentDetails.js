import React from 'react'
import { Media, Card, CardBody } from 'reactstrap';
import Axios from 'axios';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

import logo from './default.jpg'; // Tell webpack this JS file uses this image


class CommentDetails extends React.Component {
  //router.get('/:youtubeId

  constructor(props) {
    super(props)
    this.state = {
      "details": [],
      "isReply": false,
      "isReplyId": "",
      "isReplyComment": ""
    }
  }

  componentDidMount() {
    this.getComments()
  }

  getComments = () => {
    let youtubeId = 'youtubeId';
    Axios.get('http://localhost:5000/api/comments/' + youtubeId)
      .then(res => {
        this.setState({
          details: res.data
        })

      }, function (err) {

        console.log(err)
      })

  }

  likeOnHandler = (comment) => {
    comment.likes++
    Axios.put('http://localhost:5000/api/comments/'+comment._id, {
        "comment": comment.comment,
        "dislikes": comment.dislikes,
        "likes": comment.likes,
        "youtubeId": comment.youtubeId
    })
      .then(res => {
        this.getComments()

      }, function (err) {

        console.log(err)
      })
  }

  dislikeOnHandler = (comment) => {
    
    comment.dislikes++
    Axios.put('http://localhost:5000/api/comments/'+comment._id, {
        "comment": comment.comment,
        "dislikes": comment.dislikes,
        "likes": comment.likes,
        "youtubeId": comment.youtubeId
    })
      .then(res => {
        this.getComments()

      }, function (err) {

        console.log(err)
      })
  }

  openreply = (comment) => {
    
    this.setState({
      isReply: true,
      isReplyId: comment._id
    })
  }

  replyOnHandler = (e, comment) => {
    console.log(e.target.value)
    this.setState({
      isReplyComment:e.target.value
    })
  }

  submitReply = (comment) => {
    
  }


  render() {
    return (
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <h3>Comment Details</h3>

          {
            this.state.details.map((comment, index) =>
              <Card key={index}> <CardBody>
                <Media>
                  <Media left top href="#">
                    <Media object src={logo} alt="test" style={{width:"50px",borderRadius:"100px"}}/>
                  </Media>
                  <Media body>
                    <Media heading>
                      <div style={{textAlign:"left",marginLeft:"50px"}}>
                      {comment.comment}  
                      </div>
                      <span onClick={() => this.openreply(comment)}>Reply</span>
                      { this.state.isReply && this.state.isReplyId == comment._id && 
                        <div>
                          <input type="text"  onChange={this.replyOnHandler}/>
                          <button className="btn btn-success" onChange={() => this.submitReply(comment)}>Submit</button>
                        </div> }
                      </Media>

                      <br />
                        <div style={{textAlign:"right"}}>
                        <span onClick={() => this.likeOnHandler(comment)}> <FaThumbsUp /> ({comment.likes})</span> {' '}
                        <span onClick={() => this.dislikeOnHandler(comment)}> <FaThumbsDown /> ({comment.dislikes}) </span>  
                        </div>
                    </Media>
                </Media>
              </CardBody></Card>
            )
          }


        </div>
        <div className="col-lg-3"></div>
      </div>
    )
  }
}
export default CommentDetails; 