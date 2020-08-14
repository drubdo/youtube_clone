import React, { Component } from 'react'
import CommentDetails from './commentDetails';
import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';

class Comments extends Component {

    constructor(props) {
        super(props)
        this.state = {
            "newComment": ""
        }
    }

    commentOnHandler = (e) => {
        this.setState({
            "newComment": e.target.value
        })
    }

    addNewComment = () => {
        this.props.addNewComment(this.state.newComment);
        this.clearForm();
    }

    clearForm = () =>{
        document.getElementById("commentForm").reset();
    }

    render() {
        return (
            <div>
                <Container className="themed-container">
                    <Row style={{ padding: "15px" }}>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <form id="commentForm">
                                <FormGroup>
                                    <Label for="exampleText">Add a comment</Label>
                                    <Input type="textarea" name="text" id="exampleText" placeholder="Add a comment" onChange={this.commentOnHandler} />
                                </FormGroup>
                                <Button outline color="success" onClick={this.addNewComment}>Comment</Button>
                            </form>
                        </Col>
                    </Row>
                </Container>
                <CommentDetails videoId={this.props.videoId} commentDetails={this.props.commentDetails} likeOnHandler={this.props.likeOnHandler} dislikeOnHandler={this.props.dislikeOnHandler} submitReply={this.props.submitReply} />
            </div>
        )
    }
}
export default Comments; 