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
  const [pendingFinish, setPendingFinish] = useState(false);

  // 아래처럼 기본값을 할당
  const childName_ = childName ?? "상아";
  const age_ = age ?? 7;
  const interests_ = interests ?? ["공룡", "로봇"];

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
    console.log('params:', { childName: childName_, age: age_, interests: interests_, jwtToken });
    if (!jwtToken || !childName_ || !age_ || !interests_) return;
    const queryParams = `child_name=${encodeURIComponent(childName_)}&age=${age_}&interests=${encodeURIComponent(Array.isArray(interests_) ? interests_.join(',') : interests_)}&token=${jwtToken}`;
    ws.current = new WebSocket(`${WS.BASE_URL}?${queryParams}`);

    ws.current.onopen = () => {
      console.log('✅ WebSocket 연결됨');
      setStatus('connected');
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
      console.error('WebSocket 에러:', e);
      setStatus('error');
    };
    ws.current.onclose = (e) => {
      console.log('WebSocket 연결 종료', e);
      setStatus('closed');
    };
    return () => {
      if (ws.current) ws.current.close();
    };
  }, [jwtToken, childName_, age_, interests_]);

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
    if (!ws.current || ws.current.readyState !== 1) {
      Alert.alert('실패', '서버와 연결 중입니다. 잠시 후 다시 시도해 주세요.');
      setPendingFinish(true);
      return;
    }
    const path = await stopRecording();
    setIsRecording(false);
    if (!path || path === 'Already stopped') {
      Alert.alert('실패', '녹음 파일 경로를 가져오지 못했습니다.');
      return;
    }

    // WebSocket 연결 상태 체크
    console.log('handleFinish ▶ ws.current:', ws.current);
    console.log('handleFinish ▶ readyState:', ws.current?.readyState);
    if (!ws.current || ws.current.readyState !== 1) {
      Alert.alert('실패', '서버와 연결되어 있지 않습니다. 잠시 후 다시 시도해 주세요.');
      return;
    }

    try {
      // 1. 파일 경로 수정
      const correctedPath = path.replace('file:////', 'file:///');

      // 2. 파일을 base64로 읽기
      const audioBase64 = await RNFS.readFile(correctedPath, 'base64');

      // 3. base64를 바이너리로 변환
      const binaryString = atob(audioBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // 4. WebSocket으로 바이너리 전송
      ws.current.send(bytes.buffer);

      console.log('[부기] 음성 파일 바이너리 전송 완료:', bytes.length, 'bytes', '경로:', correctedPath);
      navigation.navigate('MakeStory2');
    } catch (err) {
      console.error('🔴 음성 파일 전송 실패:', err);
      Alert.alert('실패', '파일을 읽거나 전송하는 데 실패했습니다.');
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

  // WebSocket 연결이 열릴 때 pendingFinish가 true면 자동 실행
  useEffect(() => {
    if (ws.current) {
      ws.current.onopen = () => {
        setStatus('connected');
        console.log('✅ WebSocket 연결됨');
        if (pendingFinish) {
          setPendingFinish(false);
          handleFinish();
        }
      };
    }
  }, [pendingFinish]);

  const isWsOpen = ws.current && ws.current.readyState === 1;

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
      <TouchableOpacity
        style={styles.button}
        onPress={handleFinish}
      >
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