// your-script.js

// カメラへのアクセスをリクエスト
navigator.mediaDevices
  .getUserMedia({ video: { facingMode: { exact: "environment" } } }) // バックカメラを使用
  .then((stream) => {
    const videoElement = document.getElementById("video");
    videoElement.srcObject = stream;

    // QRコード読み取り処理
    const canvasElement = document.getElementById("canvas");
    const context = canvasElement.getContext("2d");

    const videoWidth = videoElement.videoWidth;
    const videoHeight = videoElement.videoHeight;
    canvasElement.width = videoWidth;
    canvasElement.height = videoHeight;

    const qrCodeResultElement = document.getElementById("result");

    function scanQRCode() {
      context.drawImage(videoElement, 0, 0, videoWidth, videoHeight);
      const imageData = context.getImageData(0, 0, videoWidth, videoHeight);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code) {
        qrCodeResultElement.textContent = "QRコードを読み取りました: " + code.data;
        const baseURL = "https://example.com/";
        const redirectTo = baseURL + code.data;
        window.location.href = redirectTo; // リダイレクト
      } else {
        qrCodeResultElement.textContent = "QRコードが見つかりません";
      }

      requestAnimationFrame(scanQRCode);
    }

    videoElement.addEventListener("loadedmetadata", () => {
      videoElement.play();
      requestAnimationFrame(scanQRCode);
    });
  })
  .catch((error) => {
    console.error("カメラへのアクセスに失敗しました:", error);
  });
