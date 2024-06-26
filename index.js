const cameraWidth = 640;
const cameraHeight = 480;

const cameraInitSmartphoneSupport = async () => {
    const video = document.getElementById("camera");

    // 利用可能なカメラデバイスのリストを取得
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');

    // 前面カメラを見つける
    let frontCamera = videoDevices.find(device => device.label.toLowerCase().includes('front')) || videoDevices[0];

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
