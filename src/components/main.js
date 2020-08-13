import React, { Component } from 'react'
import Axios from 'axios';
import CollectionVideos from './collections';
import SearchVideo from './search';
import RelatedVideos from './relatedVideos';

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
            realApi: false // false = use fake sample json, true = use valid youtubeapi key
        }

        this.currentVideoIdApi = {
            items: [
                { id: { videoId: "DLX62G4lc44" } }
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
    }

    searchVideo = (searchValue) => {

        if (!this.state.realApi) {
            const currentVideoId = this.state.currentVideoIdApi.items[0].id.videoId;
            this.setState({
                currentVideo: currentVideoId,
                videoId: currentVideoId
            })
            this.relatedVideos()
        } else {
            Axios.get(`https://www.googleapis.com/youtube/v3/search?type=video&autoplay=1&q=${searchValue}&key=${this.config.youtubeApi}`).then(res => {
                const currentVideoId = res.data.items[0].id.videoId;
                this.setState({
                    currentVideo: currentVideoId,
                    videoId: currentVideoId
                })
                this.relatedVideos()
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

    render() {
        return (
            <div>
                {!this.state.currentVideo && <CollectionVideos details={this.state.collectionVideos} playVideo={this.playVideo} />}
                {
                    this.state.currentVideo &&
                    <div>
                        <SearchVideo searchVideo={this.searchVideo} />
                        <iframe allow="autoPlay" width="800" height="400" src={'https://www.youtube.com/embed/' + this.state.currentVideo} title="videos"></iframe>
                        <RelatedVideos relatedVideos={this.state.relatedVideos} />
                    </div>
                }
            </div>
        )
    }
}
export default Main;

