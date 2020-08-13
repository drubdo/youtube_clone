import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';

class SearchVideo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: ""
        }
    }

    searchVideo = () => {
        this.props.searchVideo(this.state.searchValue)
    }

    searchHandler = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    }

    render() {
        return (
            <Container className="themed-container">
                <Row style={{ padding: "15px" }}>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <button type="button" className="btn btn-info" onClick={this.searchVideo} id="btnGroupAddon">Search</button>
                            </div>
                            <input type="text" class="form-control" placeholder="Search" aria-label="Input group example" aria-describedby="btnGroupAddon" onChange={this.searchHandler} />
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default SearchVideo;


