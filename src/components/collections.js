import React, { Component } from 'react'

class CollectionVideos extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {}

    playVideo = (videoId) => {
        this.props.playVideo(videoId)
    }

    render() {
        return (
            <div className="row">
                {
                    this.props.details.map((video, index) =>
                        <div className="col-sm-4">
                            <img style={{width:"200px", height:"200px"}} src={'https://img.youtube.com/vi/' + video.contentDetails.videoId + '/default.jpg'}  onClick={() => this.playVideo(video.contentDetails.videoId)}/>
                        </div>
                    )
                }
            </div>
        )
    }
}
export default CollectionVideos;


