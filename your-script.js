// your-script.js

// QRコードを読み取る関数
function readQRCode() {
  const qrCodeText = document.getElementById('qrCodeText').value;

  // QRコードに含まれる数字とベースURLを足して誘導先URLを生成
  const baseURL = 'https://example.com/';
  const redirectURL = baseURL + qrCodeText;

  // リダイレクト
  window.location.href = redirectURL;
}

// ボタンクリック時にQRコードを読み取る関数を呼び出す
document.getElementById('readQRCodeButton').addEventListener('click', readQRCode);
