$(function () {
  var db = firebase.firestore();

  // サインアップ機能
  $('#signupBtn').click(function () {
    var email = $('#email').val();
    var password = $('#password').val();
    var company = $('#company').val();
    var phone = $('#phone').val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        localStorage.setItem('uid', uid); 
        return saveUserData(uid, email, password, company, phone);
      })
      .then(() => {
        // データ保存が完了した後、ページ遷移
        window.location.href = 'job_list_page.html'; // 実際のログインページのURLに置き換えてください
      })
      .catch((error) => {
        // サインアップまたはデータ保存失敗
        $('#error-message').text('エラー: ' + error.message);
      });
  });

  function saveUserData(uid, email, password, userName, phone) {

    return new Promise((resolve, reject) => {
      db.collection("user").doc(uid).set({
        email: email,
        password: password,
        userName: userName,
        phone: phone,
        createdAt: firebase.firestore.Timestamp.now(),
        profile: '',
        uid: uid,
      })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  $('#loginBtn').click(function () {
    // 実際のログインページのURLにリダイレクトする
    window.location.href = 'sign_in.html'; // 実際のログインページのURLに置き換えてください
  });
});
