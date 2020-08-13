import React, { Component } from 'react'
import CommentDetails from './commentDetails'; 

class Comments extends Component { 
    
    constructor(props){
        super(props)
        this.state = {
            "newComment" : ""
        }
    }

    commentOnHandler = (e) => {
        this.setState({
            "newComment" : e.target.value
        })
    }

    addNewComment = () => { 
        this.props.addNewComment(this.state.newComment)
    }

    render(){
        return (
            <div>
               <h3>Comment Section {this.props.videoId}</h3>
                Add comment: <input type="text" onChange={this.commentOnHandler} />
                <button onClick={this.addNewComment}>Add comment</button>
                <CommentDetails videoId={this.props.videoId}/>
            </div>
        )
    }
}
export default Comments; 