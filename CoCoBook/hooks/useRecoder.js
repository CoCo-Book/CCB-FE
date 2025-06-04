// hooks/useRecorder.js
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { PermissionsAndroid, Platform } from 'react-native';

const audioRecorderPlayer = new AudioRecorderPlayer();

export const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    return (
      granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
    );
  }
  return true;
};

export const startRecording = async () => {
  const hasPermission = await requestPermissions();
  if (!hasPermission) return null;

  const path = Platform.select({
    ios: 'story_record.wav',
    android: '/sdcard/story_record.wav',
  });

  await audioRecorderPlayer.startRecorder(path);
  return path;
};

export const stopRecording = async () => {
  const result = await audioRecorderPlayer.stopRecorder();
  audioRecorderPlayer.removeRecordBackListener();
  return result; // file path
};