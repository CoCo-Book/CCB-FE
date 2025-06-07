// screens/MakeStoryScreen2.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { startRecording } from '../hooks/useRecorder';
import { playBase64Audio } from '../utils/playBase64Audio';
import { API } from '../constants';
import Sound from 'react-native-sound';

const MakeStoryScreen2 = ({ navigation, route }) => {
  const aiResult = route.params?.aiResult;
  const [aiText, setAiText] = useState('부기가 답변을 준비 중이에요...');
  const soundRef = useRef(null);
  const timeoutRef = useRef(null);

  // AI 응답 텍스트 설정
  useEffect(() => {
    if (aiResult) {
      // AnswerScreen에서 받은 AI 응답이 있으면 사용
      console.log('✅ AnswerScreen에서 받은 AI 응답:', aiResult);
      setAiText(aiResult);
    } else {
      // 처음 진입 시 서버에서 기본 메시지 받기
      fetchDefaultMessage();
    }
  }, [aiResult]);

  const fetchDefaultMessage = async () => {
    // ✅ 기본 메시지 설정
    if (!aiResult) {
      setAiText('지금부터 너의 이야기를 들려줄래?');
    }
  };

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (soundRef.current) {
        soundRef.current.release();
      }
    };
  }, []);

  const handleAnswer = async () => {
    try {
      console.log('🎤 MakeStoryScreen2에서 녹음 시작');
      const result = await startRecording();
      
      if (result && result.path) {
        console.log('✅ 녹음 시작 성공:', result);
        console.log('📁 녹음 파일 경로:', result.path);
        console.log('📝 파일명:', result.fileName);
        
        navigation.navigate('Answer', {
          childName: '상아',
          age: 7,
          interests: ['공룡', '로봇'],
          recordingStarted: true,
          recordingPath: result.path,      // 녹음 파일 경로 전달
          recordingFileName: result.fileName // 파일명 전달
        });
      } else {
        console.error('🔴 녹음 시작 실패: result가 null');
        Alert.alert('실패', '녹음을 시작할 수 없습니다.');
      }
    } catch (error) {
      console.error('🔴 녹음 시작 에러:', error);
      Alert.alert('실패', '녹음을 시작하는 데 실패했습니다.');
    }
  };

  return (
    <View style={styles.bg}>
      {/* 상단 흰색 영역 + 말풍선 */}
      <View style={styles.topWhite}>
        <View style={styles.bubbleWrap}>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>{aiText}</Text>
          </View>
          <View style={styles.bubbleArrow} />
        </View>
      </View>
      {/* 가운데 배경 이미지 영역 */}
      <ImageBackground source={require('../assets/num3.png')} style={styles.centerBg}>
        <View style={styles.container}>
          {/* <Image source={require('../assets/book.png')} style={styles.bookImage} /> */}
          {/* <Image source={require('../assets/boogiwithbook.png')} style={styles.boogiImage} /> */}
        </View>
      </ImageBackground>
      {/* 하단 흰색 영역 + 버튼 2개 */}
      <View style={styles.bottomWhite}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleAnswer}>
            <Text style={styles.buttonText}>대답하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StoryPartial')}>
            <Text style={styles.buttonText}>완성하기</Text>
          </TouchableOpacity>
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