const cameraWidth = 640;
const cameraHeight = 480;

const requestPermissions = async () => {
    try {
        // カメラとマイクへのアクセスをリクエスト
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        console.log('Permissions granted');
    } catch (err) {
        console.error('Permission request failed:', err);
    }
};
        
const cameraInitSmartphoneSupport = async () => {
    const video = document.getElementById("camera");

    // パーミッションをリクエスト
    await requestPermissions();
    
    // 利用可能なカメラデバイスのリストを取得
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log('Devices:', devices);
    
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
　　 console.log('Video devices:', videoDevices);
    
    // 前面カメラを見つける
    let frontCamera = videoDevices.find(device => device.label.toLowerCase().includes('front')) || videoDevices[0];
    console.log('Using front camera:', frontCamera);
    
    const cameraSetting = {
        audio: false,
        video: {
            deviceId: { exact: frontCamera.deviceId },
            width: cameraWidth,
            height: cameraHeight,
            facingMode: "user"
        }
    };

    // カメラを起動
    try {
        const mediaStream = await navigator.mediaDevices.getUserMedia(cameraSetting);
        video.srcObject = mediaStream;
    } catch (err) {
        console.error('Error accessing the camera: ', err);
    }
}
