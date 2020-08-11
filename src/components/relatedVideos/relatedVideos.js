import React from 'react';
import Axios from 'axios';

class RelatedVideos extends React.Component { 
    constructor(props){
        super(props)
        console.log('props', props)
        this.config = {
            youtubeApi: 'AIzaSyAbSA4hqrHZX3myZ7P7ViSqBraAf6EKnpA'
        }
        this.state = {
            query : "", 
            RelatedVideos : ""
        }
    }   
    componentDidMount(){
        console.log('testtest', this.props.videoId)
        this.RelatedVideos()
    } 
    
    RelatedVideos = () => { 
        Axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${this.props.videoId}&type=video&key=${this.config.youtubeApi}`).then(res => {
            console.log(res)
            console.log(res.data.items[0].id.videoId)
            this.setState({
                RelatedVideos: res.data.items
            })
            console.log(res.data.items)

        })
    } 
    queryHandler = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    //end call functions

    render(){
        return(
        //start elements here
        <div>
            related videos work!!!
            asdfasdf
            <div style={{width:"500px",backgroundColor:"orange", height:"200px"}}>
                related videos
            </div>
        </div>
        //end elements
        )
    }
}
export default RelatedVideos