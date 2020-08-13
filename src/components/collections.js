import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';

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
            <Container  className="themed-container">
                <Row  style={{padding:"15px"}}>
                {
                    this.props.details.map((video, index) =>
                    <Col xs="6" sm="4" style={{padding:"15px"}}>
                            <img style={{width:"250px", height:"250px"}} src={'https://img.youtube.com/vi/' + video.contentDetails.videoId + '/default.jpg'}  onClick={() => this.playVideo(video.contentDetails.videoId)}/>
                        </Col>
                    )
                }
                </Row>
            </Container>
        )
    }
}
export default CollectionVideos;


