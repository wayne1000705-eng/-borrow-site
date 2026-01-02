// Firebase SDK（版本統一）
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Firebase 設定
const firebaseConfig = {
  apiKey: "AIzaSyBkie6n3skpcGmnbp31DpNsmZTPWBVYtQ",
  authDomain: "borrow-site.firebaseapp.com",
  projectId: "borrow-site",
  storageBucket: "borrow-site.appspot.com",
  messagingSenderId: "1108024130860",
  appId: "1:1108024130860:web:37f1237df9015c19259089",
  measurementId: "G-VD69LS4R48"
};

// 初始化（只一次）
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// DOM 載入完成後再綁定事件
document.addEventListener("DOMContentLoaded", () => {

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const statusText = document.getElementById("status");

  document.getElementById("registerBtn").addEventListener("click", async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailInput.value,
        passwordInput.value
      );
      statusText.innerText = "✅ 註冊成功：" + userCredential.user.email;
    } catch (error) {
      statusText.innerText = "❌ 註冊失敗：" + error.message;
    }
  });

  document.getElementById("loginBtn").addEventListener("click", async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailInput.value,
        passwordInput.value
      );
      statusText.innerText = "✅ 登入成功：" + userCredential.user.email;
    } catch (error) {
      statusText.innerText = "❌ 登入失敗：" + error.message;
    }
  });
});

// 登入狀態監聽
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("使用者已登入：", user.email);
  } else {
    console.log("目前沒有使用者登入");
  }
});
