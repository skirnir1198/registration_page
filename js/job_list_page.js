$(function () {
  const db = firebase.firestore();

  // ログイン状態の変更を監視する
  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      window.location.href = 'sign_in.html'; // 実際のログインページのURLに置き換えてください
    } else {
      db.collection("user").doc(user.uid).get().then((doc) => {
        if (doc.exists) {
          $('#companyName').text(doc.data().userName);
        }
      }).catch((error) => {
        // エラー処理
        console.error("Error getting document:", error);
      });
    }
  });
  // jobPostingsコレクションのドキュメントを全て取得してリストを作成する関数
  function fetchJobPostingsAndCreateList() {
    db.collection("jobPostings").get().then((querySnapshot) => {
      const listElement = document.getElementById("jobPostingsList");
      listElement.innerHTML = ''; // 既存のリストアイテムをクリア

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const name = data.name; // nameフィールドの値を取得

        // リストアイテムを作成
        const listItem = document.createElement("li");
        listItem.textContent = name;
        listItem.setAttribute("data-doc-id", doc.id);

        // リストアイテムにクリックイベントを追加
        listItem.addEventListener('click', (event) => {
          const docId = event.currentTarget.getAttribute('data-doc-id');
          const newPageUrl = `job_detail_page.html?param=${docId}`;
          window.open(newPageUrl, '_blank');
        });

        // 削除ボタンを追加
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        deleteButton.onclick = function () {
          if (confirm("この求人を削除してもよろしいですか？")) {
            deleteJobPosting(doc.id);
          }
        };
        // リストアイテムに削除ボタンを追加
        listItem.appendChild(deleteButton);

        // リスト要素にリストアイテムを追加
        listElement.appendChild(listItem);
      });

    }).then(() => {
      $('#loading').hide();
    }).catch((error) => {
      console.error("Error fetching documents: ", error);
    });
  }

  function deleteJobPosting(docId) {
    db.collection("jobPostings").doc(docId).delete().then(() => {
      console.log("Document successfully deleted!");
      fetchJobPostingsAndCreateList(); // リストを再読み込みして更新
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  // 関数を呼び出してリストを表示
  fetchJobPostingsAndCreateList();

});