// screens/MakeStoryScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const MakeStoryScreen = ({ navigation }) => {
  return (
    <View style={styles.bg}>
      {/* 상단 흰색 영역 + 말풍선 */}
      <View style={styles.topWhite}>
        <View style={styles.bubbleWrap}>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>안녕 나는 부기라고 해!</Text>
          </View>
          <View style={{ overflow: 'hidden', borderRadius: 10 }}>
            <View style={styles.bubbleArrow} />
          </View>
        </View>
      </View>
      {/* 가운데 배경 이미지 영역 */}
      <ImageBackground source={require('../assets/num3.png')} style={styles.centerBg}>
        <View style={styles.container}>
          {/* <Image source={require('../assets/book.png')} style={styles.bookImage} /> */}
          {/* <Image source={require('../assets/boogiwithbook.png')} style={styles.boogiImage} /> */}
        </View>
      </ImageBackground>
      {/* 하단 흰색 영역 + 버튼 */}
      <View style={styles.bottomWhite}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MakeStory2')}>
          <Text style={styles.buttonText}>다음으로</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MakeStoryScreen;

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
    marginBottom: 0,
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
  bubbleArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderTopWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4B662B',
    alignSelf: 'flex-start',
    marginLeft: 34,
    marginTop: -2,
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
    paddingHorizontal: 44,
    paddingVertical: 10,
    minWidth: 180,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
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