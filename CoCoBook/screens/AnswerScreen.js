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
import { Buffer } from 'buffer';

Sound.setCategory('Playback');

const AnswerScreen = ({ navigation, route }) => {
  const ws = useRef(null);
  const [status, setStatus] = useState('connecting');
  const [isRecording, setIsRecording] = useState(false);
  const [aiText, setAiText] = useState('서버 연결 중...');
  const [greetingLoaded, setGreetingLoaded] = useState(false);
  const soundRef = useRef(null);
  // childName, age, interests, jwtToken은 route.params에서 받음. jwtToken이 없으면 fetch해서 사용
  const { childName, age, interests, jwtToken: routeJwtToken, recordingStarted } = route.params || {};
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
    if (!jwtToken || !childName_ || !age_ || !interests_) return;

    const params = [
      `child_name=${encodeURIComponent(childName_)}`,
      `age=${age_}`,
      `interests=${encodeURIComponent(
        Array.isArray(interests_) ? interests_.join(',') : interests_
      )}`,
      `token=${jwtToken}`
    ].join('&');
    const wsUrl = `${WS.BASE_URL}?${params}`;  // 메인 오디오 엔드포인트 사용
    console.log('WebSocket URL →', wsUrl);

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('✅ WebSocket 연결됨 (readyState=', ws.current.readyState, ')');
      setStatus('connected');
    };
    ws.current.onerror = (e) => {
      console.error('🔴 WebSocket 에러:', e.message || e);
      setStatus('error');
    };
    ws.current.onclose = () => {
      console.log('🛑 WebSocket 종료 (readyState=', ws.current.readyState, ')');
      setStatus('closed');
    };
    ws.current.onmessage = async (event) => {
      try {
        const msg = JSON.parse(event.data);
        console.log('서버 응답 받음:', msg);

        // API 문서에 따른 응답 처리
        if (msg.type === 'ai_response') {
          // ✅ 사용자 음성이 있는 응답만 처리 (초기 인사 메시지 제외)
          if (msg.user_text) {
            // AI 응답 처리
            setAiText(msg.text);
            console.log('AI 응답:', msg.text);
            console.log('사용자 음성 인식:', msg.user_text);
            console.log('신뢰도:', msg.confidence);

            // Base64 오디오 재생
            if (msg.audio) {
              try {
                const path = `${RNFS.CachesDirectoryPath}/ai_response_audio.mp3`;
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
                      // ✅ 음성 재생 완료 후 MakeStoryScreen2로 돌아가기
                      setTimeout(() => {
                        navigation.navigate('MakeStory2', {
                          aiResult: msg.text // AI 응답 전달
                        });
                      }, 1000); // 1초 후 네비게이트
                    } else {
                      console.log('음성 재생 실패');
                      // 재생 실패해도 네비게이트
                      setTimeout(() => {
                        navigation.navigate('MakeStory2', {
                          aiResult: msg.text
                        });
                      }, 1000);
                    }
                  });
                });
              } catch (e) {
                console.log('오디오 저장/재생 실패:', e);
                // 오디오 실패해도 네비게이트
                setTimeout(() => {
                  navigation.navigate('MakeStory2', {
                    aiResult: msg.text
                  });
                }, 1000);
              }
            } else {
              // 오디오가 없어도 네비게이트
              setTimeout(() => {
                navigation.navigate('MakeStory2', {
                  aiResult: msg.text
                });
              }, 1000);
            }
          } else {
            // 초기 인사 메시지는 무시
            console.log('🔇 초기 인사 메시지 무시:', msg.text);
          }
        } else if (msg.type === 'transcription') {
          // 음성 인식 중간 결과
          console.log('음성 인식:', msg.text, '신뢰도:', msg.confidence);
          setAiText(`음성 인식: ${msg.text}`);
        } else if (msg.type === 'processing') {
          // 처리 상태 알림
          console.log('처리 중:', msg.message, '단계:', msg.stage);
          setAiText(msg.message);
        } else if (msg.type === 'error') {
          // 에러 처리
          console.error('서버 에러:', msg.error_message, '코드:', msg.error_code);
          setAiText(`에러: ${msg.error_message}`);
        } else if (msg.type === 'conversation_end') {
          // 대화 종료 처리
          console.log('대화 종료:', msg.message);
          setAiText(msg.message || msg.text || '대화가 완료되었습니다.');
          
          // 2초 후 MakeStoryScreen2로 이동
          setTimeout(() => {
            navigation.navigate('MakeStory2', {
              aiResult: msg.message || msg.text || '재미있는 이야기를 만들어볼게요!'
            });
          }, 2000);
        } else {
          console.log('알 수 없는 메시지 타입:', msg.type);
        }
      } catch (e) {
        console.log('메시지 파싱 실패:', event.data, e);
      }
    };

    return () => ws.current?.close();
  }, [jwtToken, childName_, age_, interests_, navigation]);

  // ✅ MakeStoryScreen2에서 이미 녹음이 시작되었으면 상태만 업데이트
  useEffect(() => {
    if (recordingStarted) {
      console.log('✅ 녹음이 이미 시작됨 (MakeStoryScreen2에서)');
      setIsRecording(true);
      setAiText('말해보세요! 부기가 듣고 있어요.');
    }
  }, [recordingStarted]);

  const handleStart = async () => {
    if (isRecording) {
      console.log('⚠️ 이미 녹음 중입니다.');
      return;
    }
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
      Alert.alert('실패', '서버와 연결되어 있지 않습니다. 잠시 후 다시 시도해 주세요.');
      return;
    }
    
    // ✅ WebSocket 연결 상태 및 URL 로그
    console.log('🌐 음성 전송 WebSocket URL:', ws.current.url || 'URL 확인 불가');
    console.log('🔗 WebSocket readyState:', ws.current.readyState, '(1=OPEN)');
    
    const path = await stopRecording();
    setIsRecording(false);
    
    if (!path || path === 'Already stopped') {
      Alert.alert('실패', '녹음 파일 경로를 가져오지 못했습니다.');
      return;
    }

    try {
      // 1. 파일 경로 수정 (Android에서 file://// → file:///)
      const correctedPath = path.replace('file:////', 'file:///');
      console.log('[녹음] 파일 경로:', correctedPath);

      // 파일 존재 여부 및 크기 확인
      const exists = await RNFS.exists(correctedPath);
      if (!exists) {
        console.log('[녹음] 파일이 존재하지 않습니다:', correctedPath);
        Alert.alert('실패', '녹음 파일이 존재하지 않습니다.');
        return;
      }
      const stat = await RNFS.stat(correctedPath);
      console.log(`[녹음] 파일 존재, 크기: ${stat.size} bytes, 경로: ${correctedPath}`);

      // 2. 파일을 base64로 읽기
      const audioBase64 = await RNFS.readFile(correctedPath, 'base64');
      console.log('[녹음] Base64 크기:', audioBase64.length);

      // 3. React Native Buffer 사용 (atob 대신)
      const buffer = Buffer.from(audioBase64, 'base64');
      console.log('[녹음] Buffer 크기:', buffer.length);

      // ✅ 전송 전 상세 로그
      console.log('📤 음성 데이터 전송 시작');
      console.log('📍 전송 대상 서버:', '13.124.141.8:8000');
      console.log('🛣️ WebSocket 엔드포인트:', '/ws/audio');
      console.log('📦 전송 데이터 크기:', buffer.length, 'bytes');
      console.log('⏰ 전송 시간:', new Date().toISOString());

      // 4. WebSocket으로 바이너리 전송
      ws.current.send(buffer);

      console.log('✅ 음성 파일 바이너리 전송 완료!');
      console.log('📊 전송 요약:');
      console.log('  - 서버: 13.124.141.8:8000/ws/audio');
      console.log('  - 크기:', buffer.length, 'bytes');
      console.log('  - 파일:', correctedPath);
      
      // ✅ 서버 응답 대기 상태 표시
      setAiText('음성을 서버로 전송했습니다. 부기가 답변을 준비 중이에요...');

    } catch (err) {
      console.error('🔴 음성 파일 전송 실패:', err);
      console.error('🔴 실패 상세:', {
        error: err.message,
        path: correctedPath,
        wsReadyState: ws.current?.readyState,
        wsUrl: ws.current?.url
      });
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