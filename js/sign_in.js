$(function () {
  // ログイン機能
  $('#loginBtn').click(function () {
    var email = $('#email').val();
    var password = $('#password').val();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        localStorage.setItem('uid', uid);
        window.location.href = 'index.html'; // 実際のログインページのURLに置き換えてください

      })
      .catch((error) => {
        // ログイン失敗
        var errorMessage = error.message;
        $('#login-error-message').text('エラー: ' + errorMessage);
      });
  });

  
  $('#sign_up').click(function () {
    // 実際のログインページのURLにリダイレクトする
    window.location.href = 'sign_up.html'; // 実際のログインページのURLに置き換えてください
  });
});