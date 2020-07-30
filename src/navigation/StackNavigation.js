import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IconButton} from 'react-native-paper';
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import News from '../screens/News';
import Popular from '../screens/Popular';
import Search from '../screens/Search';
//import Navigation from './Navigation';
const Stack = createStackNavigator();

export default function StackNavigation(props) {
  const {navigation} = props;

  //Creamos nuestro botón para el buscador
  const buttonRight = () => {
    return (
      <IconButton
        icon="magnify"
        onPress={() => navigation.navigate('search')}
      />
    );
  };

  //Creamos el boton izquierdo para nuestro menú
  const buttonLeft = screen => {
    //Crear una condicio para desaparecer mi boton
    switch (screen) {
      case 'search':
      case 'movie':
        return (
          <IconButton
            icon="arrow-left"
            onPress={() => navigation.goBack()} 
          />
        );
      default:
        return (
          <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
        );
        //break;
    }
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: 'TheMovieApp',
          headerLeft: () => buttonLeft(),
          headerRight: () => buttonRight(),
        }}
      />

      <Stack.Screen
        name="movie"
        component={Movie}
        options={{
          title: '',
          headerTransparent:true,
          headerLeft: () => buttonLeft("movie"),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="news"
        component={News}
        options={{
          title: 'News',
          headerLeft: () => buttonLeft(),
          headerRight: () => buttonRight(),
        }}
      />

      <Stack.Screen
        name="popular"
        component={Popular}
        option={{
          title: 'Popular',
          headerLeft: () => buttonLeft(),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        option={{
          title: '',
          headerLeft: () => buttonLeft('search'),
        }}
      />
    </Stack.Navigator>
  );
}
