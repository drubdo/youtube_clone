import React from 'react';

class RelatedVideos extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={{ width: "100%", backgroundColor: "#235e71", height: "235px", overflowX: 'auto', overflowY: 'hidden', whiteSpace: 'nowrap', padding: '20px', marginBottom:"15px"}}>
                {
                    this.props.relatedVideos.map((video, index) =>
                        <div style={{ display: 'inline-block' }}>
                            <img style={{ width: "300px", height: "180px", marginRight: "5px", cursor:"pointer" }} src={'https://img.youtube.com/vi/' + video.id.videoId + '/0.jpg'} onClick={() => this.props.playVideo(video.id.videoId)} />
                        </div>
                    )
                }
            </div>
        )
    }
}
export default RelatedVideos