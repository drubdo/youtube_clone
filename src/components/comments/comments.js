import React, { Component } from 'react'
import Axios from 'axios'; 


class Comments extends Component { 
    
    constructor(props){
        super(props)
        this.state = {
            "newComment" : ""
        }
    }

    commentOnHandler = (e) => {
        let newComment = e.target.value;

        this.setState({
            "newComment" : newComment
        })
        
    }

    submitComment = (e) => {
        console.log(this.state)

        
        Axios.post('http://localhost:5000/api/comments/',{
            youtubeId: "youtubeId", 
            comment: this.state.newComment
        })
            .then(res => {
                console.log(res)

            }, function (err) {
                
                console.log(err)
            })
    }

    render(){
        return (
            <div>
               <h3>Comment Section</h3>
               Add comment: <input type="text" onChange={this.commentOnHandler} />
                <button onClick={this.submitComment}>Add comment</button>
            </div>
        )
    }
}
export default Comments; 