import React, { Component } from 'react'
import Axios from 'axios';

class Main extends Component { 
    constructor(props){
        super(props)
        this.config = {
            youtubeApi: 'AIzaSyBFMXe8ompwelRgxm7aMpUbxlrFC8A2qiU'
        }
        this.state = {
            query : "", 
            currentVideo : "",
            videoId : "",
            relatedVideos : []
        }
    }   

    componentDidMount(){
        
    } 
    
    render(){
        return (
            <div>
                main
            </div>
        )
    }
}
export default Main; 

