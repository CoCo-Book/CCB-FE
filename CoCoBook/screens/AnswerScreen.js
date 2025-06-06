// screens/AnswerScreen.js
// screens/AnswerScreen.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ImageBackground } from 'react-native';
import RNFS from 'react-native-fs';
import { startRecording, stopRecording } from '../hooks/useRecorder';
import { getPresignedUrl, uploadToS3 } from '../api/s3';
import { API, WS } from '../constants';
import { fetchJwtToken } from '../utils/getJwtToken';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const AnswerScreen = ({ navigation, route }) => {
  const ws = useRef(null);
  const [status, setStatus] = useState('connecting');
  const [isRecording, setIsRecording] = useState(false);
  const [aiText, setAiText] = useState('서버 연결 중...');
  const [greetingLoaded, setGreetingLoaded] = useState(false);
  const soundRef = useRef(null);
  // childName, age, interests, jwtToken은 route.params에서 받음. jwtToken이 없으면 fetch해서 사용
  const { childName, age, interests, jwtToken: routeJwtToken } = route.params || {};
  const [jwtToken, setJwtToken] = useState(routeJwtToken || null);

  // JWT 토큰이 없으면 fetch
  useEffect(() => {
    if (jwtToken) return;
    const getToken = async () => {
      const token = await fetchJwtToken();
      setJwtToken(token);
    };
    getToken();
  }, []);

   // WebSocket 연결
   useEffect(() => {
    if (!jwtToken || !childName || !age || !interests) return;
    const queryParams = `child_name=${encodeURIComponent(childName)}&age=${age}&interests=${encodeURIComponent(interests.join(','))}&token=${jwtToken}`;
    const wsUrl = `${WS.BASE_URL}?${queryParams}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      setStatus('connected');
      console.log('✅ WebSocket 연결됨');
    };
    ws.current.onmessage = async (event) => {
      const msg = JSON.parse(event.data);
      console.log('서버 응답 받음:', msg);
      setAiText(msg.text);

      if (msg.audio) {
        try {
          const path = `${RNFS.CachesDirectoryPath}/ai_audio.mp3`;
          await RNFS.writeFile(path, msg.audio, 'base64');
          if (soundRef.current) soundRef.current.release();
          soundRef.current = new Sound(path, '', (error) => {
            if (error) {
              console.log('음성 로딩 실패:', error);
              return;
            }
            console.log('음성 로딩 성공, 재생 시작');
            soundRef.current.play((success) => {
              if (success) {
                console.log('음성 재생 성공');
              } else {
                console.log('음성 재생 실패');
              }
            });
          });
        } catch (e) {
          console.log('오디오 저장/재생 실패:', e);
        }
      } else {
        console.log('서버에서 audio 데이터가 오지 않음');
      }
    };
    ws.current.onerror = (e) => {
      setStatus('error');
      console.error('WebSocket 에러:', e.message);
    };
    ws.current.onclose = () => {
      setStatus('closed');
      console.log('WebSocket 연결 종료');
    };
    return () => {
      if (ws.current) ws.current.close();
    };
  }, [jwtToken, childName, age, interests]);

  useEffect(() => {
    const start = async () => {
      const result = await startRecording();
      if (result) {
        setIsRecording(true);
      }
    };
    start();
  }, []);

  const handleStart = async () => {
    const result = await startRecording();
    if (result) {
      setIsRecording(true);
    }
  };

  const handleFinish = async () => {
    if (!isRecording) {
      Alert.alert('실패', '녹음이 시작되지 않았습니다.');
      return;
    }
    const path = await stopRecording();
    setIsRecording(false);
    if (!path || path === 'Already stopped') {
      Alert.alert('실패', '녹음 파일 경로를 가져오지 못했습니다.');
      return;
    }
    try {
      const base64String = await RNFS.readFile(path, 'base64');
      // audio_chunk 메시지로 서버에 전송
      ws.current.send(
        JSON.stringify({
          type: 'audio_chunk',
          data: base64String,
          chunk_index: 1, // 단일 chunk라면 1
          is_final: true,
        })
      );
      console.log('음성 데이터가 서버로 전송되었습니다.');
      navigation.navigate('MakeStory2');
    } catch (err) {
      console.error('🔴 파일을 Base64로 읽기 실패:', err);
      Alert.alert('실패', '파일을 읽는 데 실패했습니다.');
    }
  };

  // 컴포넌트 언마운트 시 사운드 정리
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.release();
      }
    };
  }, []);

  useEffect(() => {
    let timeoutId = null;
    let isMounted = true;

    const fetchAiGreeting = async () => {
      try {
        const res = await fetch(`${API.BASE_URL}/api/start`);
        const data = await res.json();
        if (isMounted && !greetingLoaded) {
          setGreetingLoaded(true);
          setAiText(data.text);
        }
      } catch (e) {
        // 에러가 나도 5초 동안은 aiText를 바꾸지 않음
      }
    };

    timeoutId = setTimeout(() => {
      if (isMounted && !greetingLoaded) {
        setAiText('서버 연결 실패');
      }
    }, 5000);

    fetchAiGreeting();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

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