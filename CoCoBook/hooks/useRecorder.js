// hooks/useRecorder.js
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { PermissionsAndroid, Platform } from 'react-native';
import uuid from 'react-native-uuid';

const audioRecorderPlayer = new AudioRecorderPlayer();

export const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    console.log('안드로이드 권한 요청 시작');
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);
    console.log('권한 요청 결과:', granted);
    return (
      granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
    );
  }
  return true;
};

export const startRecording = async () => {
  const hasPermission = await requestPermissions();
  if (!hasPermission) {
    console.log('안드로이드 권한이 거부되었습니다.');
    return null;
  }

  const uniqueId = uuid.v4();
  const fileName = `story_${uniqueId}.wav`;

  const path = Platform.select({
    ios: fileName,
    android: `/sdcard/${fileName}`,
  });

  console.log('안드로이드 녹음 시작:', {
    fileName,
    path,
    uniqueId
  });

  await audioRecorderPlayer.startRecorder(path);
  return { path, fileName };
};

export const stopRecording = async () => {
  console.log('안드로이드 녹음 중지 시작');
  const result = await audioRecorderPlayer.stopRecorder();
  console.log('안드로이드 녹음 파일 저장됨:', result);
  audioRecorderPlayer.removeRecordBackListener();
  return result; // file path
};