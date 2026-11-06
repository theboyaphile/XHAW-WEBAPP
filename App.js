import React from 'react';
import { Image, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { QuoteProvider } from './src/context/QuoteContext';
import HomeScreen from './src/screens/HomeScreen';
import QuoteScreen from './src/screens/QuoteScreen';
import ContactScreen from './src/screens/ContactScreen';
import { COLORS } from './src/theme';

const Tab = createBottomTabNavigator();

function HeaderTitle() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={require('./Assets/logo.jpg')}
        style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8 }}
      />
      <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
        Adventure Escape SA
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <QuoteProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerTitle: () => <HeaderTitle />,
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: '#fff',
            tabBarActiveTintColor: COLORS.accent,
            tabBarInactiveTintColor: COLORS.secondary,
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopWidth: 1,
              borderTopColor: '#e5e7eb',
              paddingBottom: 6,
              paddingTop: 6,
              height: 64,
            },
            tabBarIcon: ({ color, size }) => {
              if (route.name === 'Home') return <Ionicons name="home" size={size} color={color} />;
              if (route.name === 'Quote') return <Ionicons name="receipt" size={size} color={color} />;
              return <Ionicons name="call" size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Quote" component={QuoteScreen} />
          <Tab.Screen name="Contact" component={ContactScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </QuoteProvider>
  );
}
