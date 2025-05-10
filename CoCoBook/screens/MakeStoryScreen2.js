// screens/MakeStoryScreen2.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MakeStoryScreen2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.topText}>부기와 대화를 통해 이야기를 생성하세요!</Text>

      <Image
        source={require('../assets/boogiwithbook.png')}
        style={styles.image}
      />

      <Text style={styles.bottomText}>부기가 이야기를 듣는중 …</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Answer')} // 이어가기
        >
          <Text style={styles.buttonText}>이어가기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StoryPartial')} // 대화 종료 시 메인으로
        >
          <Text style={styles.buttonText}>대화종료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MakeStoryScreen2;

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
    color: '#3b3b3b',
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
    color: '#3e3e3e',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    backgroundColor: '#9ACA70',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});