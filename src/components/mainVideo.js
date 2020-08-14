import React from 'react'

const MainVideo = (props) => {
    return(
        <div>
            <iframe width={props.width} height={props.height} src={props.currentVideo} title={props.title}></iframe>
            <div style={{lineHeight:"5px"}}>
                <h4>{props.info.title}</h4>
                <p>{props.info.description}</p>
                <small> {props.info.numberOfViews} </small>
            </div>
            <hr/>
        </div>
    )
}


export default MainVideo;