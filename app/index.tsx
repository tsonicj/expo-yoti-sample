import React from 'react';
import { View, Text } from 'react-native';

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1f1f1',
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
