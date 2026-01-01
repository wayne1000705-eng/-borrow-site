// 匯入 Firebase 套件 (CDN 模組)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 正確的 firebaseConfig (來自 Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBkie6n3skpcGmnbp31DpNsmZTPWBVYtQ",
  authDomain: "borrow-site.firebaseapp.com",
  projectId: "borrow-site",
  storageBucket: "borrow-site.appspot.com",
  messagingSenderId: "1108024130860",
  appId: "1:1108024130860:web:37f1237df9015c19259089",
  measurementId: "G-VD69LS4R48"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 註冊功能
document.getElementById("registerBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    document.getElementById("status").innerText = "✅ 註冊成功：" + userCredential.user.email;
  } catch (error) {
    document.getElementById("status").innerText = "❌ 註冊失敗：" + error.message;
  }
});

// 登入功能
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    document.getElementById("status").innerText = "✅ 登入成功：" + userCredential.user.email;
  } catch (error) {
    document.getElementById("status").innerText = "❌ 登入失敗：" + error.message;
  }
});

// 監聽登入狀態
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("使用者已登入：", user.email);
  } else {
    console.log("目前沒有使用者登入");
  }
});