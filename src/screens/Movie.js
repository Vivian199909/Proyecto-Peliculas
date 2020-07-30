import React, {useState,useEffect} from 'react';
import {View,StyleSheet,Image} from 'react-native';
import {getMovieByIdApi} from '../api/movies'
import { BASE_PATH_IMG } from '../utils/constants';
import { ScrollView } from 'react-native-gesture-handler';
import ModalVideo from '../components/ModalVideo';
import { IconButton,Title, Text } from 'react-native-paper';
import {map} from 'lodash';
    export default function Movie(props) {
        //console.log(props);
        const {route} = props;
        const {id} = route.params;
        const [movie, setMovie]= useState(null);
        const [showVideo, setShowVideo] = useState(true)
        useEffect(()=> {
            getMovieByIdApi(id).then((response)=>{
                //console.log(response);
                setMovie(response);
            })
        },[])
        if(!movie)
        return null;
    return (
        <>
        <ScrollView showsVerticalScrollIndicator={false}>
            
            <MovieImage posterPath={movie.poster_path}/>
            <MovieTrailer setShowVideo={setShowVideo}/>
            <MovieTitle movie={movie} />
            <ModalVideo 
        show={showVideo} 
        setShow={setShowVideo}
        idMovie={id}
        />
        </ScrollView>
        
        </>
    );
    }
    function MovieImage(props) {
        const{posterPath} = props;
    
        return (
            <View style={styles.viewPoster}>
                <Image 
                style={styles.poster}
                source={{uri: `${BASE_PATH_IMG}/w500${posterPath}`}}
            />
            </View>
        );
    }
    function MovieTrailer(props){
        const { setShowVideo } =props;
        return (
            
            <View style ={styles.viewPlay}>
                <IconButton
                    icon="play"
                    color="#000"
                    size={30}
                    onPress={() => setShowVideo(true)}
                    style={styles.play}
                />
            </View>
        )
    }
    function MovieTitle(props) { const { movie } = props;
    return (
    <View style={styles.viewInfo}>
    <Title>{movie.title}</Title>
    <View style={styles.viewGenres}>
    {map(movie.genres, (genre) => (
    <Text key={genre.id} style={styles.genre}>
    {genre.name}
    </Text>
    ))}
    </View>
    </View>
    );
    } 
    const styles = StyleSheet.create({
        viewPoster: {
            shadowColor: "#000",
            shadowOffset: {
                width:0,
                height:10
            },
            shadowOpacity:1,
            textShadowRadius:10,
        },

        poster:{
            width: "100%",
            height:500,
            borderBottomRightRadius:30,
            borderBottomLeftRadius:30,
        },
        viewPlay:{
            justifyContent: "flex-end",
            alignItems:"flex-end",
        },
        play:{
            backgroundColor:"#fff",
            marginTop:0,
            marginRight:30,
            width:60,
            height:60,
            borderRadius:100,
    
        },
            viewInfo: {
                marginHorizontal: 30,
                },
                viewGenres: {
                flexDirection: 'row',
                }, genre: {
                marginRight: 20,
                color: '#8697a5',
                },
    })
