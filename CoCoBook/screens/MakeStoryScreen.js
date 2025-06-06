import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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
  }, []);

  useEffect(() => {
    // JWT 토큰 발급
    const getToken = async () => {
      const token = await fetchJwtToken();
      setJwtToken(token);
    };
    getToken();
  }, []);

  useEffect(() => {
    if (!jwtToken) return;
    // WebSocket 연결
    const queryParams = `child_name=상아&age=7&interests=공룡,로봇&token=${jwtToken}`;
    const wsUrl = `${WS.BASE_URL}?${queryParams}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      setWsConnected(true);
      console.log('✅ MakeStoryScreen WebSocket 연결됨');
    };
    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log('MakeStoryScreen 서버 응답:', msg);
      if (msg.type === 'ai_response') {
        setAiText(msg.text);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
    };
    ws.current.onerror = (e) => {
      console.error('MakeStoryScreen WebSocket 에러:', e.message);
    };
    ws.current.onclose = () => {
      setWsConnected(false);
      console.log('MakeStoryScreen WebSocket 연결 종료');
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
    <View style={styles.container}>
      <Text style={styles.topText}>부기와 대화를 통해 이야기를 생성하세요!</Text>
      
      <View style={styles.bubble}>
        <Text style={styles.bubbleText}>{aiText}</Text>
      </View>

      <Image source={require('../assets/boogiwithbook.png')} style={styles.image} />

      <TouchableOpacity
        style={styles.button}
        onPress={handleAnswer}
      >
        <Text style={styles.buttonText}>대답하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MakeStoryScreen;

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
  bubble: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: '#3e5d3d',
    borderWidth: 2,
    marginBottom: 10,
  },
  bubbleText: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#000',
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20,
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