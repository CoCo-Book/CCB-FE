// screens/AnswerScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const AnswerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.topText}>부기와 대화를 통해 이야기를 생성하세요!</Text>

      <ActivityIndicator size="large" color="#3e5d3d" style={{ marginVertical: 10 }} />

      <Image source={require('../assets/boogiwithbook.png')} style={styles.image} />

      <Text style={styles.bottomText}>부기가 이야기를 듣는중 ...</Text>

      {/* 임시 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MakeStory2')} // 예시용, 실제 목적지로 변경
      >
        <Text style={styles.buttonText}>대답 완료</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AnswerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f6cc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  topText: {
    fontSize: 12,
    color: '#4a4a4a',
    marginBottom: 10,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  bottomText: {
    fontSize: 14,
    marginBottom: 20,
    color: '#3e3e3e',
  },
  button: {
    backgroundColor: '#9ACA70',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});