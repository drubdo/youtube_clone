import React, { Component } from 'react'
import Axios from 'axios';
import CollectionVideos from './collections';
import SearchVideo from './search';
import RelatedVideos from './relatedVideos';
import Comments from '../components/comments/comments';
import MainVideo from './mainVideo';
import { Fade } from 'reactstrap';
const config = require('../config/default.json');

class Main extends Component {
    constructor(props) {
        super(props)

        this.config = {
            youtubeApi: config.youtubeApi
        }
        this.state = {
            searchValue: "",
            currentVideo: "",
            videoId: "",
            relatedVideos: [],
            playlistId: "PLIuXETiXnqzBSZAi7ZEVd1q-_pi7MdeMV",
            collectionVideos: [],
            realApi: false, // false = use fake sample json, true = use valid youtubeapi key
            commentDetails: [],
            fadeIn: true
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
                { contentDetails: { videoId: "zOjov-2OZ0E" } },
                { contentDetails: { videoId: "rfscVS0vtbw" } },
                { contentDetails: { videoId: "_uQrJ0TkZlc" } },
                { contentDetails: { videoId: "W6NZfCO5SIk" } },
                { contentDetails: { videoId: "sBws8MSXN7A" } },
                { contentDetails: { videoId: "ZS_kXvOeQ5Y" } },
                { contentDetails: { videoId: "lYWYWyX04JI" } }
            ]
        }

        this.relatedVideosApi = {
            items: [
                { id: { videoId: "DLX62G4lc44" } },
                { id: { videoId: "Ke90Tje7VS0" } },
                { id: { videoId: "zOjov-2OZ0E" } },
                { id: { videoId: "rfscVS0vtbw" } },
                { id: { videoId: "_uQrJ0TkZlc" } },
                { id: { videoId: "W6NZfCO5SIk" } },
                { id: { videoId: "sBws8MSXN7A" } },
                { id: { videoId: "ZS_kXvOeQ5Y" } },
                { id: { videoId: "lYWYWyX04JI" } }
            ]
        }
    }

    toggle = (fadeIn) => {
        this.setState({
            fadeIn: fadeIn
        })
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
        this.toggle(true)
        this.setState({
            currentVideo: videoId
        })
        this.getComments(videoId);
        this.relatedVideos();
    }


    selectRandomVideoFromFakeApi() {
        //pull random video from collections due to quota limit
        return Math.floor(Math.random() * this.collectionVideosApi.items.length);
    }

    searchVideo = (searchValue) => {

        if (!this.state.realApi) {
            const currentVideoId = this.collectionVideosApi.items[this.selectRandomVideoFromFakeApi()].contentDetails.videoId;
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

        if (comment.likes) {
            comment.likes++
        } else {
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

        if (comment.dislikes) {
            comment.dislikes++
        } else {
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
                <SearchVideo searchVideo={this.searchVideo} />

                {!this.state.currentVideo && <CollectionVideos details={this.state.collectionVideos} playVideo={this.playVideo} />}
                {
                    this.state.currentVideo &&
                    <div>
                        <RelatedVideos relatedVideos={this.state.relatedVideos} playVideo={this.playVideo} />
                        <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
                            <MainVideo info={{title:'Name of Video', description: "Description of video", numberOfViews : "203,408 views Aug 13, 2020"}} currentVideo={'https://www.youtube.com/embed/' + this.state.currentVideo + '?autoplay=1&mute=1'} width={900} height={400} title={'Main Video'}/>
                        </Fade>
                        <Comments videoId={this.state.currentVideo} addNewComment={this.addNewComment} commentDetails={this.state.commentDetails} likeOnHandler={this.likeOnHandler} dislikeOnHandler={this.dislikeOnHandler} submitReply={this.submitReply} />
                    </div>
                }
            </div>
        )
    }
}
export default Main;

