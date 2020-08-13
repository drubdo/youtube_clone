import React, { Component } from 'react'
import Axios from 'axios';
import CollectionVideos from './collections';
import SearchVideo from './search';
import RelatedVideos from './relatedVideos';
import Comments from '../components/comments/comments';

class Main extends Component {
    constructor(props) {
        super(props)

        this.config = {
            youtubeApi: 'AIzaSyD5RB6v7Enw2gFoBe8B12qznVdwf_yTRT0'
        }
        this.state = {
            searchValue: "",
            currentVideo: "",
            videoId: "",
            relatedVideos: [],
            playlistId: "PLIuXETiXnqzBSZAi7ZEVd1q-_pi7MdeMV",
            collectionVideos: [],
            realApi: false, // false = use fake sample json, true = use valid youtubeapi key
            commentDetails: []
        }

        this.currentVideoIdApi = {
            items: [
                { id: { videoId: "Ke90Tje7VS0" } }
            ]
        }

        this.collectionVideosApi = {
            items: [
                { contentDetails: { videoId: "DLX62G4lc44" } },
                { contentDetails: { videoId: "Ke90Tje7VS0" } },
                { contentDetails: { videoId: "DLX62G4lc44" } },
                { contentDetails: { videoId: "Ke90Tje7VS0" } },
                { contentDetails: { videoId: "DLX62G4lc44" } }
            ]
        }

        this.relatedVideosApi = {
            items: [
                { id: { videoId: "DLX62G4lc44" } },
                { id: { videoId: "Ke90Tje7VS0" } },
                { id: { videoId: "DLX62G4lc44" } },
                { id: { videoId: "Ke90Tje7VS0" } },
                { id: { videoId: "DLX62G4lc44" } }
            ]
        }
    }

    componentDidMount() {
        this.getCollections();
    }

    getCollections = () => {

        if (!this.state.realApi) {
            this.setState({
                collectionVideos: this.collectionVideosApi.items
            })
        } else {

            Axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${this.state.playlistId}&key=${this.config.youtubeApi}`).then(res => {
                this.setState({
                    collectionVideos: res.data.items
                })
            })
        }
    }

    playVideo = (videoId) => {
        this.setState({
            currentVideo: videoId
        })
        this.getComments(videoId);
        this.relatedVideos();
    }

    searchVideo = (searchValue) => {

        if (!this.state.realApi) {
            const currentVideoId = this.currentVideoIdApi.items[0].id.videoId;
            this.setState({
                currentVideo: currentVideoId,
                videoId: currentVideoId
            })
            this.playVideo(currentVideoId)
        } else {
            Axios.get(`https://www.googleapis.com/youtube/v3/search?type=video&autoplay=1&q=${searchValue}&key=${this.config.youtubeApi}`).then(res => {
                const currentVideoId = res.data.items[0].id.videoId;
                this.setState({
                    currentVideo: currentVideoId,
                    videoId: currentVideoId
                })
                this.playVideo(currentVideoId)
            })
        }
    }

    relatedVideos = () => {

        if (!this.state.realApi) {
            this.setState({
                relatedVideos: this.relatedVideosApi.items
            })
        } else {
            Axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${this.state.currentVideo}&type=video&key=${this.config.youtubeApi}`).then(res => {
                this.setState({
                    relatedVideos: res.data.items
                })
            })
        }
    }

    addNewComment = (newComment) => {
        Axios.post('http://localhost:5000/api/comments/', {
            youtubeId: this.state.currentVideo,
            comment: newComment
        })
        .then(res => {
            this.getComments(this.state.currentVideo)
        }, function (err) {
            alert('Something went wrong.')
        })
    }

    getComments = (videoId) => {
        let youtubeId = videoId;
        Axios.get('http://localhost:5000/api/comments/' + youtubeId)
            .then(res => {
                this.setState({
                    commentDetails: res.data
                })
            }, function (err) {
                console.log(err)
            })
    }

    likeOnHandler = (comment) => {

        if(comment.likes){
            comment.likes++
        }else{
            comment.likes = 1
        }

        Axios.put('http://localhost:5000/api/comments/' + comment._id, {
            "comment": comment.comment,
            "dislikes": comment.dislikes,
            "likes": comment.likes,
            "youtubeId": comment.youtubeId
        })
            .then(res => {
                this.getComments(comment.youtubeId)

            }, function (err) {

                console.log(err)
            })
    }

    dislikeOnHandler = (comment) => {

        if(comment.dislikes){
            comment.dislikes++
        }else{
            comment.dislikes = 1
        }
        
        Axios.put('http://localhost:5000/api/comments/' + comment._id, {
            "comment": comment.comment,
            "dislikes": comment.dislikes,
            "likes": comment.likes,
            "youtubeId": comment.youtubeId
        })
        .then(res => {
            this.getComments(comment.youtubeId)
        }, function (err) {
            console.log(err)
        })
    }

    submitReply = (comment) => {
        Axios.put('http://localhost:5000/api/comments/replyComment/' + comment._id, {
            "comment": comment.comment
        })
        .then(res => {
            this.getComments(comment.youtubeId)

        }, function (err) {

            console.log(err)
        })
    }

    render() {
        return (
            <div>
                {!this.state.currentVideo && <CollectionVideos details={this.state.collectionVideos} playVideo={this.playVideo} />}
                {
                    this.state.currentVideo &&
                    <div>
                        <RelatedVideos relatedVideos={this.state.relatedVideos} />
                        <SearchVideo searchVideo={this.searchVideo} />
                        <iframe allow="autoPlay" width="800" height="400" src={'https://www.youtube.com/embed/' + this.state.currentVideo} title="videos"></iframe>
                        <Comments videoId={this.state.currentVideo} addNewComment={this.addNewComment} commentDetails={this.state.commentDetails} likeOnHandler={this.likeOnHandler} dislikeOnHandler={this.dislikeOnHandler} submitReply={this.submitReply}/>
                    </div>
                }
            </div>
        )
    }
}
export default Main;

