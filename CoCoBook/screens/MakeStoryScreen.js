// screens/MakeStoryScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { startRecording } from '../hooks/useRecorder';

const MakeStoryScreen = ({ navigation }) => {
  const handleAnswer = async () => {
    await startRecording();
    navigation.navigate('Answer', {
      childName: '상아',   // 실제 사용자 입력 값
      age: 7,             // 실제 사용자 입력 값
      interests: ['공룡', '로봇'],  // 배열 형태로 넘김
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>부기와 대화를 통해 이야기를 생성하세요!</Text>
      
      <View style={styles.bubble}>
        <Text style={styles.bubbleText}>지금부터 너의 이야기를 들려줄래?</Text>
      </View>

      <Image source={require('../assets/boogiwithbook.png')} style={styles.image} />

      <TouchableOpacity
        style={styles.button}
        onPress={handleAnswer}
      >
        <Text style={styles.buttonText}>대답하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MakeStoryScreen;

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
  bubble: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: '#3e5d3d',
    borderWidth: 2,
    marginBottom: 10,
  },
  bubbleText: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#000',
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20,
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