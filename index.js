const cameraWidth = 300;
const cameraHeight = 400;

const cameraInitSmartphoneSupport = async () => {
    const video = document.getElementById("camera");

    try {
        // 利用可能なカメラデバイスのリストを取得
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        // 前面カメラを見つける
        let frontCamera = videoDevices.find(device => device.label.toLowerCase().includes('front')) || videoDevices[0];

        if (!frontCamera) {
            console.error('Front camera not found');
            return;
        }

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
        const mediaStream = await navigator.mediaDevices.getUserMedia(cameraSetting);
        video.srcObject = mediaStream;
    } catch (err) {
        console.error('Error accessing the camera: ', err);
        alert('カメラにアクセスできませんでした。ブラウザの設定を確認してください。');
    }
}
