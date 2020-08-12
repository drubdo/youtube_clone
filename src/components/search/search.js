import React from 'react'
import Axios from 'axios';
import Test from '../relatedVideos/relatedVideos';

class Search extends React.Component { 
    constructor(props){
        super(props)
        this.config = {
            youtubeApi: 'AIzaSyBMpy7LKrgHmjC8PyzIgjtTYDa0K07Uq-U'
        }
        this.state = {
            query : "", 
            currentVideo : "",
            videoId : "",
            relatedVideos : []
        }
    
    }   
    componentDidMount(){
        
    } 
    
    search = () => { 
        Axios.get(`https://www.googleapis.com/youtube/v3/search?type=video&autoplay=1&q=${this.state.query}&key=${this.config.youtubeApi}`).then(res => {
            console.log(res)
            console.log(res.data.items[0].id.videoId)
            this.setState({
                currentVideo: 'https://www.youtube.com/embed/' + res.data.items[0].id.videoId + '?autoplay=1',
                videoId : res.data.items[0].id.videoId
            })
            this.RelatedVideos();
            console.log('https://www.youtube.com/watch?v=' + res.data.items[0].id.videoId)

        })
    } 
    queryHandler = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    RelatedVideos = () => { 
        Axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${this.state.videoId}&type=video&maxResults=10&key=${this.config.youtubeApi}`).then(res => {
            console.log('relatedVideos', res)
            this.setState({
                relatedVideos:res.data.items
            })
            

        })
    } 
 
    playVideo = (video) => {
        this.setState({
            currentVideo: 'https://www.youtube.com/embed/' + video.id.videoId + '?autoplay=1',
            videoId : video.id.videoId
        })
    }

    render(){
        return (
            
            <div>

                <div style={{width:"100%",backgroundColor:"orange", height:"250px",overflowX:'scroll', whiteSpace:'nowrap', padding:'20px'}}>
                related videos
                {
                    this.state.relatedVideos.map((video, index) =>
                        <div style={{display:'inline-block'}}>
                            
                            <iframe allow="autoPlay" width="300" height="180" src={"https://www.youtube.com/embed/" + video.id.videoId} title="videos"></iframe>
                            <button onClick={() => this.playVideo(video)}>Play</button>
                        </div>
                    )
                }
            </div>
            <br/> 

                <input type="text" id="fname" name="fname" onChange={this.queryHandler}/> <button type="button" onClick={this.search}>Click Me!</button>
                <br/> <iframe allow="autoPlay" width="420" height="315" src={this.state.currentVideo} title="videos"></iframe>
            
            </div>
        )
    }
}
export default Search; 

