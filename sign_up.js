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

        // サインアップ成功
        alert('サインアップ成功！');
        saveUserData(uid, email, password, company, phone)
      })
      .catch((error) => {
        // サインアップ失敗
        var errorMessage = error.message;
        $('#error-message').text('エラー: ' + errorMessage);
      });
  });

  function saveUserData(uid, email, password, userName,phone) {
    db.collection("user").doc(uid).set({
        email: email,
        password: password,
        favorite_work: [],
        userName: userName,
        phone:phone,
        createdAt: firebase.firestore.Timestamp.now(),
        profile: '',
        uid: uid,
        token: '',
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

  $('#loginBtn').click(function () {
    // 実際のログインページのURLにリダイレクトする
    window.location.href = 'sign_in.html'; // 実際のログインページのURLに置き換えてください
  });
});
