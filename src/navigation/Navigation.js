import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import StackNavigation from './StackNavigation';


const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    //Vamos a darle varios props
    <Drawer.Navigator initialRouteName="app" 
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="app" 
        component={StackNavigation} 
      />
      
    </Drawer.Navigator>
  );
}
