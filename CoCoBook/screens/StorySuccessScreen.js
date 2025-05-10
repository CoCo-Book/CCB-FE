// screens/StorySuccessScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const StorySuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* 배경 색 */}
      <View style={styles.header} />

      {/* 책 UI (배경 이미지로 구성 가능) */}
      <View style={styles.bookWrapper}>
        <View style={styles.bookTitle}>
          <Text style={styles.bookTitleText}>내가 만든 이야기</Text>
        </View>

        <View style={styles.bookContent}>
          {/* 여기에 나중에 작성된 동화 내용 또는 썸네일 추가 */}
        </View>
      </View>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.homeButtonText}>홈으로 돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StorySuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f6cc',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  header: {
    height: 20,
  },
  bookWrapper: {
    backgroundColor: '#5b4534',
    width: '90%',
    height: '70%',
    borderRadius: 8,
    alignItems: 'center',
    paddingTop: 10,
  },
  bookTitle: {
    backgroundColor: '#c8c0b7',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  bookTitleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4a2e17',
  },
  bookContent: {
    backgroundColor: '#fff7cc',
    width: '90%',
    height: '80%',
    borderRadius: 6,
    marginTop: 20,
  },
  homeButton: {
    marginTop: 30,
    backgroundColor: '#fdf6dc',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 2,
    borderColor: '#4a2e17',
    borderRadius: 8,
  },
  homeButtonText: {
    color: '#4a2e17',
    fontWeight: 'bold',
  },
});