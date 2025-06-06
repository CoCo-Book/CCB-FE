// screens/AnswerScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

const AnswerScreen = ({ navigation }) => {
  return (
    <View style={styles.bg}>
      {/* 상단 흰색 영역 + 말풍선 (화살표 없음) */}
      <View style={styles.topWhite}>
        <View style={styles.bubbleWrap}>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>... 부기가 이야기를 듣는중 ...</Text>
          </View>
        </View>
      </View>
      {/* 가운데 배경 이미지 영역 */}
      <ImageBackground source={require('../assets/num3.png')} style={styles.centerBg}>
        <View style={styles.container}>
          {/* 이미지 제거됨 */}
        </View>
      </ImageBackground>
      {/* 하단 흰색 영역 + 버튼 1개 */}
      <View style={styles.bottomWhite}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MakeStory2')}>
          <Text style={styles.buttonText}>대답완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topWhite: {
    width: '100%',
    height: 90,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centerBg: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  bubbleWrap: {
    width: '100%',
    alignItems: 'center',
    marginTop: 0,
    marginLeft: 0,
    marginBottom: 14,
  },
  bubble: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#4B662B',
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  bubbleText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    textAlign: 'left',
  },
  bookImage: {
    width: 160,
    height: 120,
    resizeMode: 'contain',
    marginTop: 12,
    marginBottom: 0,
  },
  boogiImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    marginTop: -16,
    marginBottom: 0,
  },
  bottomWhite: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 24,
  },
  button: {
    backgroundColor: '#9ACA70',
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 10,
    minWidth: 120,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 2,
    textAlign: 'center',
    includeFontPadding: false,
    paddingVertical: 0,
  },
});

export default AnswerScreen;