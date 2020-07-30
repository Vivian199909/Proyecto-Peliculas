import React, {useState, useEffect} from 'react';
import {Title} from "react-native-paper";
import {StyleSheet,View,ScrollView, Text} from 'react-native';
import CarouselVertical from '../components/CarouselVertical';
import { getNewsMovieAPi, getAllGenereApi,getGenreMoviesApi } from '../api/movies';
import {map} from 'lodash';
import CarouselMulti from '../components/CarouselMulti';
    export default function Home(props) {
        const {navigation} = props;
        const [newMovies, setNewMovies] = useState(null);

        const [genreList,setGenreList] = useState([]);
        const [genreSelected, setGenreSelected] = useState(28)
        const [genreMovies, setGenreMovies] = useState(null);
        
        console.log(genreMovies);
        useEffect(() => {
            getNewsMovieAPi().then((response)=>{
                setNewMovies(response.results);
            });
        },[]);
        

            useEffect(() => {
                getAllGenereApi().then((response)=>{
                    setGenreList(response.genres);
                    //console.log(response);
                });
            },[]);
            //Creamos un useEffect para obtener las peliculas dependiendo el genero
            useEffect(() => {
                getGenreMoviesApi(genreSelected).then((response)=>{
                    setGenreMovies(response.results);
                    //console.log(response);
                });
        },[genreSelected]);
        const onChangeGenre = (newGenreId) =>{
            setGenreSelected(newGenreId);
        };
    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
            {newMovies && (
                <View style={styles.news}>
                    <Title style= {styles.newsTitle}>Nuevas Peliculas</Title>
                    <CarouselVertical
                        data={newMovies}
                        navigation={navigation}
                    />
                </View>
            )}
        <View style={styles.genres}>
            <Title style={styles.genresTitle}>Películas por Género</Title>
                <ScrollView horizontal showsVerticalScrollIndicator ={false} style={styles.genreList}>
                {map(genreList, (genre) =>(
                    <Text key={genre.id} style={[styles.genre,
                    {color: genre.id !== genreSelected ? '#8697a5' : '#fff'},]}
                    onPress={() => onChangeGenre(genre.id)}>
                        {genre.name}   </Text>
                ))}
                </ScrollView>

                {genreMovies && (
                    <CarouselMulti data ={genreMovies} navigation = {navigation}/>
                )}
        </View>
        </ScrollView>
        
    );
    }

    const styles = StyleSheet.create (
        {
            news: {
                marginVertical: 10,
            },
            newsTitle:{
                marginBottom:15,
                marginHorizontal:20,
                fontWeight: "bold",
                fontSize:22,
            },
            genre:{
                marginTop:20,
                marginBottom: 16,
                padding:10,
            },
            genres: {
                marginTop:20,
                marginBottom: 16,
            },
            genreList:{
                marginTop:5,
                marginBottom:15,
                marginHorizontal:20,
                padding:10,
            },
            genresTitle:{
                marginHorizontal: 20,
                fontWeight: 'bold',
                fontSize: 22,
            },

        }
    );
