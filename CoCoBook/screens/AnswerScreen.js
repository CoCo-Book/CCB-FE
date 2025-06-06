// screens/AnswerScreen.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.topText}>부기와 대화를 통해 이야기를 생성하세요!</Text>

      <ActivityIndicator size="large" color="#3e5d3d" style={{ marginVertical: 10 }} />

      <Image source={require('../assets/boogiwithbook.png')} style={styles.image} />

      <Text style={styles.bottomText}>부기가 이야기를 듣는중 ...</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleFinish}
      >
        <Text style={styles.buttonText}>대답 완료</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AnswerScreen;

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
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  bottomText: {
    fontSize: 14,
    marginBottom: 20,
    color: '#3e3e3e',
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