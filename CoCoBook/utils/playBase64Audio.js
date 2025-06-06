import RNFS from 'react-native-fs';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

export const playBase64Audio = async (base64String) => {
  try {
    const filePath = `${RNFS.DocumentDirectoryPath}/server_audio.mp3`; // mp3/wav 확장자 서버 응답에 맞게
    await RNFS.writeFile(filePath, base64String, 'base64');
    await audioRecorderPlayer.startPlayer(filePath);
    console.log('오디오 재생 시작:', filePath);
  } catch (e) {
    console.error('Base64 오디오 재생 에러:', e);
  }
};
