// パスワード検証つきコンピレーションアルバムダウンロード処理
// CORS制約により、本番URLでしか動作しません
const API_ENDPOINT =
  "https://ej5futxhab.execute-api.ap-northeast-1.amazonaws.com/download";

document
  .getElementById("download-button")
  .addEventListener("click", async (event) => {
    const button = event.currentTarget;
    const passwordInput = document.getElementById("password-input");
    const password = passwordInput.value.trim();
    const statusElem = document.getElementById("status");

    if (!password) {
      statusElem.textContent = "パスワードを入力してください。";
      return;
    }
    button.disabled = true;
    statusElem.textContent = "確認中...";

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (response.ok && result.downloadUrl) {
        statusElem.textContent = "ダウンロードを開始します...";
        window.location.href = result.downloadUrl;

        // 数秒後にステータスメッセージをクリア
        setTimeout(() => {
          statusElem.textContent = "";
        }, 5000);
      } else {
        statusElem.textContent =
          "パスワードが正しくありません。再度お試しください。";
      }
    } catch (error) {
      console.error("Error during download request:", error);
      statusElem.textContent =
        "エラーが発生しました。後でもう一度お試しください。";
    } finally {
      button.disabled = false;
    }
  });
