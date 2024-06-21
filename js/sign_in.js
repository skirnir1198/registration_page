$(function () {
  console.log(localStorage.getItem('uid'));
  // ログイン機能
  $('#loginBtn').click(function () {
    var email = $('#email').val();
    var password = $('#password').val();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        localStorage.setItem('uid', uid);
        window.location.href = 'job_list_page.html';

      })
      .catch((error) => {
        // ログイン失敗
        var errorMessage = error.message;
        $('#login-error-message').text('エラー: ' + errorMessage);
      });
  });

  
  $('#sign_up').click(function () {
    // 実際のログインページのURLにリダイレクトする
    window.location.href = 'sign_up.html';
  });
});