import React, { Component } from 'react'
import Axios from 'axios';
import CollectionVideos from './collections';
import SearchVideo from './search';

class Main extends Component { 
    constructor(props){
        super(props)

        this.config = {
            youtubeApi: 'AIzaSyBFMXe8ompwelRgxm7aMpUbxlrFC8A2qiU'
        }
        this.state = {
            searchValue : "", 
            currentVideo : "",
            videoId : "",
            relatedVideos : [], 
            playlistId : "PLIuXETiXnqzBSZAi7ZEVd1q-_pi7MdeMV",
            collectionVideos: []
        }
    }   

    componentDidMount(){
        this.getCollections();
    } 

    getCollections = () => {
        Axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${this.state.playlistId}&key=${this.config.youtubeApi}`).then(res => {
            this.setState({
                collectionVideos: res.data.items
            })
        })
    }

    playVideo = (videoId) => {
        alert(videoId)
        this.setState({
            currentVideo: videoId
        })
    }    

    searchVideo = (searchValue) => {
        Axios.get(`https://www.googleapis.com/youtube/v3/search?type=video&autoplay=1&q=${searchValue}&key=${this.config.youtubeApi}`).then(res => {
            const currentVideoId = res.data.items[0].id.videoId;
            this.setState({
                currentVideo: currentVideoId,
                videoId: currentVideoId
            })
        })
    }

    render(){
        return (
            <div>
                { !this.state.currentVideo && <CollectionVideos details={this.state.collectionVideos} playVideo={this.playVideo}/> }
                { 
                    this.state.currentVideo && 
                    <div>
                        <SearchVideo searchVideo={this.searchVideo}/>
                        <iframe allow="autoPlay" width="800" height="400" src={'https://www.youtube.com/embed/' + this.state.currentVideo} title="videos"></iframe> 
                    </div>
                }
            </div>
        )
    }
}
export default Main; 

