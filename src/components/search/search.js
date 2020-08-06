import React from 'react'
import Axios from 'axios'
import config from 'config';

class Search extends React.Component { 
    search = () => { 
        Axios.get(`https://www.googleapis.com/youtube/v3/search?q=cars&key=${config.youtubeApi}`).then(res => {
            console.log(res)
        })
    } 
    render(){
        return (
            <div>
                <input type="text" id="fname" name="fname"/> <button type="button" onClick={this.search}>Click Me!</button>
            </div>
        )
    }
}
export default Search; 