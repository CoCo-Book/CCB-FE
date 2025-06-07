// screens/MakeStoryScreen.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { fetchJwtToken } from '../utils/getJwtToken';
import { WS, API } from '../constants';
import Sound from 'react-native-sound';

const MakeStoryScreen = ({ navigation }) => {
  const ws = useRef(null);
  const [aiText, setAiText] = useState('서버 연결 중...');
  const [jwtToken, setJwtToken] = useState(null);
  const [wsConnected, setWsConnected] = useState(false);
  const soundRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // ❌ 제거: 존재하지 않는 엔드포인트 호출
    /*
    let isMounted = true;

    const fetchAiGreeting = async () => {
      try {
        const res = await fetch(`${API.BASE_URL}/api/start`);
        const data = await res.json();
        if (isMounted) {
          setAiText(data.text);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
        
        // 음성 파일 재생
        if (data.audioUrl) {
          soundRef.current = new Sound(data.audioUrl, '', (error) => {
            if (error) {
              console.log('음성 로딩 실패:', error);
              return;
            }
            soundRef.current.play((success) => {
              if (!success) {
                console.log('음성 재생 실패');
              }
            });
          });
        }
      } catch (e) {
        // 에러가 나도 5초 동안은 aiText를 바꾸지 않음
      }
    };

    timeoutRef.current = setTimeout(() => {
      if (isMounted) {
        setAiText('서버 연결 실패');
      }
    }, 5000);

    fetchAiGreeting();

    return () => {
      isMounted = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (soundRef.current) {
        soundRef.current.release();
      }
    };
    */
    
    // ✅ WebSocket 연결만으로 초기 인사 받기 (이미 구현되어 있음)
    return () => {
      if (soundRef.current) {
        soundRef.current.release();
      }
    };
  }, []);

  useEffect(() => {
    // JWT 토큰 발급
    const getToken = async () => {
      const token = await fetchJwtToken();
      console.log('🔍 MakeStoryScreen 토큰 확인:', token);
      setJwtToken(token);
    };
    getToken();
  }, []);

  useEffect(() => {
    if (!jwtToken) return;
    
    // WebSocket 연결해서 초기 인사 받기
    const wsUrl = `${WS.BASE_URL}?child_name=${encodeURIComponent('상아')}&age=7&interests=${encodeURIComponent('공룡,로봇')}&token=${jwtToken}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      setWsConnected(true);
      console.log('✅ MakeStoryScreen WebSocket 연결됨');
    };
    
    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'ai_response' && !msg.user_text) {
        // 초기 인사 메시지 처리
        setAiText(msg.text);
        console.log('🎉 초기 인사 받음:', msg.text);
        
        // 초기 인사 받으면 WebSocket 닫기 (AnswerScreen에서 새로 연결)
        ws.current.close();
      }
    };
    
    return () => {
      if (ws.current) ws.current.close();
    };
  }, [jwtToken]);

  const handleAnswer = () => {
    if (!wsConnected) {
      Alert.alert('실패', '서버 연결이 아직 완료되지 않았습니다.');
      return;
    }
    navigation.navigate('Answer', {
      childName: '상아',
      age: 7,
      interests: ['공룡', '로봇'],
      jwtToken, // AnswerScreen에 토큰 전달
    });
  };

  return (
    <View style={styles.bg}>
      {/* 상단 흰색 영역 + 말풍선 */}
      <View style={styles.topWhite}>
        <View style={styles.bubbleWrap}>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>{aiText}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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