import React,  { Component } from 'react'

class SearchVideo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue : ""
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
            <div>
                <input type="text" id="fname" name="fname" onChange={this.searchHandler} />
                <div class="btn-group">
                    <button type="button" onClick={this.searchVideo}>onSubmit</button>
                </div>
            </div>
        )
    }
}
export default SearchVideo;


