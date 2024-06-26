const cameraInitSmartphoneSupport = async () => {
    const video = document.getElementById("camera");

    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log('Devices:', devices);

        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        console.log('Video devices:', videoDevices);

        let frontCamera = videoDevices.find(device => device.label.toLowerCase().includes('front')) || videoDevices[0];

        if (!frontCamera) {
            console.error('Front camera not found');
            alert('前面カメラが見つかりませんでした。');
            return;
        }

        console.log('Using front camera:', frontCamera);

        const cameraSetting = {
            audio: false,
            video: {
                deviceId: { frontCamera.deviceId },
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: "user"
            }
        };

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia(cameraSetting);
            video.srcObject = mediaStream;
        } catch (innerErr) {
            console.warn('Initial settings failed, trying default settings', innerErr);
            // デフォルトの設定で再試行
            const defaultSettings = {
                audio: false,
                video: {
                    deviceId: { exact: frontCamera.deviceId }
                }
            };
            const mediaStream = await navigator.mediaDevices.getUserMedia(defaultSettings);
            video.srcObject = mediaStream;
        }
    } catch (err) {
        console.error('Error accessing the camera: ', err);
        if (err.name === 'NotAllowedError') {
            alert('カメラへのアクセスが拒否されました。ブラウザの設定を確認してください。');
        } else if (err.name === 'NotFoundError') {
            alert('カメラが見つかりませんでした。デバイスを確認してください。');
        } else if (err.name === 'NotReadableError') {
            alert('カメラにアクセスできませんでした。他のアプリがカメラを使用している可能性があります。');
        } else if (err.name === 'OverconstrainedError') {
            alert('指定されたカメラの設定がサポートされていません。');
        } else {
            alert(`カメラにアクセスできませんでした: ${err.name} - ${err.message}`);
        }
    }
}
