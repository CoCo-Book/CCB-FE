// screens/AnswerScreen.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import { startRecording, stopRecording } from '../hooks/useRecorder';
import { getPresignedUrl, uploadToS3 } from '../api/s3';
import { API, WS } from '../constants';
import { WS_AUTH_TOKEN } from '@env';

const AnswerScreen = ({ navigation, route }) => {
  const ws = useRef(null);
  const [status, setStatus] = useState('connecting');

  useEffect(() => {
    const { childName, age, interests } = route.params;
    const queryParams = `child_name=${encodeURIComponent(childName)}&age=${age}&interests=${encodeURIComponent(interests.join(','))}&token=${WS_AUTH_TOKEN}`;
    const wsUrl = `${WS.BASE_URL}?${queryParams}`;

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('✅ WebSocket 연결됨');
      setStatus('connected');
    };

    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log('서버 응답 받음:', msg);

      if (msg.type === 'ai_response') {
        navigation.navigate('MakeStory2', { aiResult: msg });
      }
    };

    ws.current.onerror = (e) => {
      console.error('WebSocket 에러:', e.message);
      setStatus('error');
    };

    ws.current.onclose = () => {
      console.log('WebSocket 연결 종료');
      setStatus('closed');
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const start = async () => {
      const { path } = await startRecording();
      console.log('🔴 녹음 시작:', path);
    };
    start();
  }, []);

  const handleFinish = async () => {
    const { path, fileName } = await stopRecording();
    console.log('녹음 종료, 저장 위치:', path);

    try {
      const base64String = await RNFS.readFile(path, 'base64');
      const payload = JSON.stringify({
        event: 'audio',
        data: base64String,
        filename: fileName,
      });
      ws.current.send(payload);
      console.log('WebSocket으로 오디오 데이터 전송 완료');
    } catch (err) {
      console.error('🔴 파일을 Base64로 읽기 실패:', err);
    }
  };

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