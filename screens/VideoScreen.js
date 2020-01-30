import React from 'react'
import {StyleSheet, TVMenuControl, View, Text, ActivityIndicator} from 'react-native';
import Video from 'react-native-video';


const VideoScreen = (props) => {
    const [reff, setReff] = React.useState(null)
    const [loading, setLoading] = React.useState(<View style={{width:'100%', height:'100%',backgroundColor:'rgba(39, 86, 138, 1)', justifyContent:'center', alignItems:'center'}}>
      <Text style={{color:'white', padding:64,  fontFamily: 'Avenir-Medium', color: 'white', fontSize:32}}>Loading</Text>
      <ActivityIndicator size="large" color="lightblue"/>
     </View>)

    React.useEffect(()=>{
        TVMenuControl.enableTVMenuKey()

    },[])





    return (
      <>
        <Video source={{uri: props.navigation.getParam('video')}}   // Can be a URL or a local file.
       ref={(ref) => {
         setReff(ref)

       }}   
                                       // Store reference
       onBuffer={this.onBuffer}                // Callback when remote video is buffering
       onError={()=>setLoading(<View style={{width:'100%', height:'100%',backgroundColor:'rgba(39, 86, 138, 1)', justifyContent:'center', alignItems:'center'}}>
       <Text style={{color:'white', padding:64,  fontFamily: 'Avenir-Medium', color: 'white', fontSize:32}}>Video is unavailable.</Text>
       <ActivityIndicator size="large" color="lightblue"/>
      </View>)}  
       style={styles.backgroundVideo} 
       controls={true}
       onLoad={()=>setLoading(null)}

       
       

       rate={1}
       
       />
       {loading}
      </>
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
