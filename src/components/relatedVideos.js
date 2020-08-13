import React from 'react';

class RelatedVideos extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={{ width: "100%", backgroundColor: "orange", height: "250px", overflowX: 'scroll', whiteSpace: 'nowrap', padding: '20px' }}>
                {
                    this.props.relatedVideos.map((video, index) =>
                        <div style={{ display: 'inline-block' }}>
                            <img style={{ width: "300px", height: "200px", marginRight: "10px" }} src={'https://img.youtube.com/vi/' + video.id.videoId + '/default.jpg'} onClick={() => this.playVideo(video)} />
                        </div>
                    )
                }
            </div>
        )
    }
}
export default RelatedVideos