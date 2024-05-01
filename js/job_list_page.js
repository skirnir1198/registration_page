$(function () {
  const db = firebase.firestore();
  const storage = firebase.storage();

  var uid = localStorage.getItem('uid');

  // ログイン状態の変更を監視する
  if (!uid) {
    window.location.href = 'sign_in.html'; // 実際のログインページのURLに置き換えてください
  } else {
    db.collection("user").doc(uid).get().then((doc) => {
      if (doc.exists) {
        $('#companyName').text(doc.data().userName);
      }
    }).catch((error) => {
      // エラー処理
      console.error("Error getting document:", error);
    });
  }
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
        deleteButton.onclick = function (e) {
          e.stopPropagation(); // イベントのバブリングを停止
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
    const docRef = db.collection("jobPostings").doc(docId);
    // ドキュメントのデータを取得
    docRef.get().then((doc) => {
      if (doc.exists) {
        // ドキュメントのデータが存在する場合
        console.log("Document data:", doc.data());
        // imageUrls1とimageUrls2の削除を処理
        const deletePromises = [];

        if (doc.data().imageUrls1) {
          doc.data().imageUrls1.forEach(url => {
            const fileRef = storage.refFromURL(url);
            deletePromises.push(fileRef.delete());
          });
        }

        if (doc.data().imageUrls2) {
          doc.data().imageUrls2.forEach(url => {
            const fileRef = storage.refFromURL(url);
            deletePromises.push(fileRef.delete());
          });
        }

        // 全ての削除が完了したことを保証
        return Promise.all(deletePromises);
      } else {
        // ドキュメントが見つからない場合
        console.log("No such document!");
        return Promise.reject("No such document!");
      }
    }).then(() => {
      // すべての削除が完了した後に実行される
      console.log("All files deleted successfully");
       db.collection("jobPostings").doc(docId).delete().then(() => {
      console.log("Document successfully deleted!");
      fetchJobPostingsAndCreateList(); // リストを再読み込みして更新
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
    }).catch((error) => {
      // エラー処理
      console.error("Error during document fetch or file deletion:", error);
    });

   
  }

  // 関数を呼び出してリストを表示
  fetchJobPostingsAndCreateList();

});