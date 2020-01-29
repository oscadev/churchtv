import React from 'react'
import {StyleSheet, TVMenuControl} from 'react-native';
import Video from 'react-native-video';


const VideoScreen = (props) => {
    const [reff, setReff] = React.useState(null)
    const [rate, setRate] = React.useState(1)
    const [bool, setBool] = React.useState(false)

    React.useEffect(()=>{
        TVMenuControl.enableTVMenuKey()
        console.log("is video focused?: ",props.navigation.isFocused())

    },[])





    return (
        <Video source={{uri: props.navigation.getParam('video')}}   // Can be a URL or a local file.
       ref={(ref) => {
         setReff(ref)

       }}   
                                       // Store reference
       onBuffer={this.onBuffer}                // Callback when remote video is buffering
    //    onError={props.navigation.goBack()}  
       style={styles.backgroundVideo} 
       controls={true}

       
       

       rate={1}
       
       />
    )
}



var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });

export default VideoScreen;
