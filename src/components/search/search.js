import React from 'react'
import Axios from 'axios';


class Search extends React.Component { 
    constructor(props){
        super(props)
        this.config = {
            youtubeApi: ''
        }
        this.state = {
            query : "", 
            currentVideo : ""
        }
    
    }   
    componentDidMount(){
        
    } 
    
    search = () => { 
        Axios.get(`https://www.googleapis.com/youtube/v3/search?type=video&autoplay=1&q=${this.state.query}&key=${this.config.youtubeApi}`).then(res => {
            console.log(res)
            console.log(res.data.items[0].id.videoId)
            this.setState({
                currentVideo: 'https://www.youtube.com/embed/' + res.data.items[0].id.videoId + '?autoplay=1'
            })
            console.log('https://www.youtube.com/watch?v=' + res.data.items[0].id.videoId)

        })
    } 
    queryHandler = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    render(){
        return (
            <div>
                <input type="text" id="fname" name="fname" onChange={this.queryHandler}/> <button type="button" onClick={this.search}>Click Me!</button>
                <iframe allow="autoPlay" width="420" height="315" src={this.state.currentVideo} title="videos"></iframe>
            
            </div>
        )
    }
}
export default Search; 