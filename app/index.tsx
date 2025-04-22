import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import YotiDocScanExpo from '@/modules/yoti-doc-scan-expo';

const HomeScreen = () => {
  const startSession = async () => {
    const sessionId = ''; // GETTING SESSION ID FROM Backend
    const sessionToken = ''; // GETTING SESSION TOKEN FROM Backend

    try {
      const result = await YotiDocScanExpo.startSession(
        sessionId,
        sessionToken
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

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
      <TouchableOpacity onPress={() => startSession()}>
        <Text>Start Session</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
