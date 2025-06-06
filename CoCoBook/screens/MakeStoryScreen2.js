// screens/MakeStoryScreen2.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { startRecording } from '../hooks/useRecorder';
import { playBase64Audio } from '../utils/playBase64Audio';

const MakeStoryScreen2 = ({ navigation, route }) => {
  const aiResult = route.params?.aiResult;

  return (
    <View style={styles.bg}>
    {/* 상단 흰색 영역 + 말풍선 */}
    <View style={styles.topWhite}>
      <View style={styles.bubbleWrap}>
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>지금부터 너의 이야기를 들려줄래?</Text>
        </View>
        <View style={styles.bubbleArrow} />
      </View>
    </View>

    {/* 가운데 배경 + 이미지 */}
    <ImageBackground source={require('../assets/num3.png')} style={styles.centerBg}>
      <View style={styles.container}>
        <Text style={styles.topText}>부기와 대화를 통해 이야기를 생성하세요!</Text>
        <Image
          source={require('../assets/boogiwithbook.png')}
          style={styles.image}
        />
        <Text style={styles.bottomText}>부기가 말하고 있어요 …</Text>
      </View>
    </ImageBackground>

    {/* 하단 버튼 영역 */}
    <View style={styles.bottomWhite}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await startRecording();
            navigation.navigate('Answer', {
              childName: '상아',
              age: 7,
              interests: ['공룡', '로봇'],
            });
          }}
        >
          <Text style={styles.buttonText}>대답하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StoryPartial')}
        >
          <Text style={styles.buttonText}>완성하기</Text>
        </TouchableOpacity>

        {aiResult && (
          <TouchableOpacity
            onPress={() => playBase64Audio(aiResult.audio)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>AI 음성 듣기</Text>
          </TouchableOpacity>
        )}
      </View>
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
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

export default MakeStoryScreen2;