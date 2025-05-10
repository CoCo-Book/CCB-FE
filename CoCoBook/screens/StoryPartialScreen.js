// screens/PartialScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const PartialScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../assets/justroad.png')}
          style={styles.road}
        />
        <Image
          source={require('../assets/walk2.png')}
          style={styles.turtle}
        />
      </View>

      <Text style={styles.mainText}>부기가 동화책을 만들고 있어요!</Text>
      <Text style={styles.subText}>잠시만 기다려주세요</Text>

      {/* 로딩 인디케이터 */}
      <ActivityIndicator size="large" color="#9ACA70" style={{ marginVertical: 30 }} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('StorySuccess')}
      >
        <Text style={styles.buttonText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PartialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f6cc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  road: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    position: 'absolute',
  },
  turtle: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    zIndex: 1,
  },
  mainText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  subText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#9ACA70',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});