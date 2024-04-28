$(function () {
  // ログイン機能
  $('#loginBtn').click(function () {
    var email = $('#email').val();
    var password = $('#password').val();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // ログイン成功
        alert('ログイン成功！');
        // ログイン後のページにリダイレクトするなどの処理をここに書く
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