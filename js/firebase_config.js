{
  firebase.initializeApp({
    // 控えておいたapiキーとプロジェクトIDを設定する
    apiKey: "AIzaSyDm6j2FkqDdRE0cVl_zHbbmIN41IzwK08U",
    authDomain: "rizoba-app.firebaseapp.com",
    projectId: "rizoba-app",
    storageBucket: "rizoba-app.appspot.com",
    messagingSenderId: "1043757292649",
    appId: "1:1043757292649:web:a65e564cf2f157194996f8",
    measurementId: "G-DL6QKE1FJC"
  });
  const db = firebase.firestore();
  const disableAnalytics = localStorage.getItem('disableAnalytics'); //開発者はtrue;
if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1" && !disableAnalytics) {
  firebase.analytics();
} else {
  console.log("The website is running on localhost && hostUser.");
}

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}