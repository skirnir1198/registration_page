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

  function updateReleaseField(docId, newValue) {
    db.collection("jobPostings").doc(docId).update({
      release: newValue
    })
      .then(() => {
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }

  // jobPostingsコレクションのドキュメントを全て取得してリストを作成する関数
  function fetchJobPostingsAndCreateList() {
    db.collection("jobPostings")
      .where("uid", "==", uid)
      .get().then((querySnapshot) => {
        const listElement = document.getElementById("jobPostingsList");
        listElement.innerHTML = ''; // 既存のリストアイテムをクリア

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          // リストアイテムを作成
          const listItem = document.createElement("li");
          // 名前を表示するためのspan要素を作成
          listItem.innerHTML = `<div class="text_content"><h4>${data.name}</h4><h6>${data.title}</h6><p style="font-size:12px;">${data.type}</p></div>`;
          listItem.setAttribute("data-doc-id", doc.id);

          // リストアイテムにクリックイベントを追加
          listItem.addEventListener('click', (event) => {
            const docId = event.currentTarget.getAttribute('data-doc-id');
            const newPageUrl = `job_detail_page.html?param=${docId}`;
            window.open(newPageUrl, '_blank');
          });

          // トグルボタンとテキストを追加
          const toggleButton = document.createElement("div");
          toggleButton.classList.add("toggleButton");
          if (data.release) {
            toggleButton.classList.add("on");
          }

          const toggleText = document.createElement("p");
          toggleText.style.margin = "0";
          toggleText.style.fontSize = "12px";
          toggleText.textContent = data.release ? "公開" : "非公開";

          toggleButton.onclick = function (e) {
            e.stopPropagation();
            const newValue = !toggleButton.classList.contains("on");
            toggleButton.classList.toggle("on");
            toggleText.textContent = newValue ? "公開" : "非公開";
            updateReleaseField(doc.id, newValue);
          };

          // トグルボタンとテキストを囲むdivを作成
          const toggleContainer = document.createElement("div");
          toggleContainer.style.display = "flex";
          toggleContainer.style.flexDirection = "column";
          toggleContainer.style.alignItems = "center";
          toggleContainer.style.marginRight = "8px";

          toggleContainer.appendChild(toggleText);
          toggleContainer.appendChild(toggleButton);

          // 削除ボタンを追加
          const deleteButton = document.createElement("button");
          deleteButton.innerHTML = '<i class="fas fa-trash-alt" style="font-weight: 100;"></i>'; // Font Awesomeアイコンを設定
          deleteButton.onclick = function (e) {
            e.stopPropagation(); // イベントのバブリングを停止
            if (confirm("この求人を削除してもよろしいですか？")) {
              deleteJobPosting(doc.id);
            }
          };

          // ホバーイベントの追加
          deleteButton.addEventListener('mouseover', function () {
            const icon = deleteButton.querySelector('i');
            icon.style.fontWeight = '900'; // ホバー時のフォントウェイトを変更
          });

          deleteButton.addEventListener('mouseout', function () {
            const icon = deleteButton.querySelector('i');
            icon.style.fontWeight = '100'; // ホバーが解除されたら元のフォントウェイトに戻す
          });

          // ボタンを囲むdivを作成
          const containerDiv = document.createElement("div");
          containerDiv.classList.add("button-box");
          containerDiv.appendChild(toggleContainer);
          containerDiv.appendChild(deleteButton);

          // <div>をlistItemに追加
          listItem.appendChild(containerDiv);

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
    $('#loading').show();
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
      db.collection("jobPostings").doc(docId).delete().then(() => {
        $('#loading').hide();
        fetchJobPostingsAndCreateList(); // リストを再読み込みして更新
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }).catch((error) => {
      $('#loading').hide();
      // エラー処理
      console.error("Error during document fetch or file deletion:", error);
    });


  }

  // 関数を呼び出してリストを表示
  fetchJobPostingsAndCreateList();

  $('#signOutButton').on('click', function () {
    console.log('click');
    firebase.auth().signOut().then(function () {
      localStorage.removeItem('uid');
      window.location.href = 'sign_in.html'; // 遷移先のURLを入力してください
    }).catch(function (error) {
      // サインアウトに失敗した場合
      console.error('Sign Out Error', error);
    });
  });




  // 使用例
  const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/rizoba-app.appspot.com/o/jobPostingsimages%2Fdomitory_image%2FXmgL9nCzRMOv9ediqnR0%2FQRtifivJ.jpg?alt=media&token=174eaee5-7cc4-4175-b922-a5e9a4750c05';
  // processImage(imageUrl);
});
// Firebase Storageから画像を取得し解像度を下げて再アップロードする関数
function processImage(imageUrl, maxWidth = 480, quality = 0.9) {
  // 画像を読み込む
  fetch(imageUrl)
    .then(response => response.blob())
    .then(blob => {
      const img = new Image();
      img.src = URL.createObjectURL(blob);

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // 幅が最大幅を超える場合はサイズを調整
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }

        // canvasを使用して画像をリサイズ
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((resizedBlob) => {
          // Firebase Storageに再アップロード
          const storageRef = firebase.storage().refFromURL(imageUrl); // imageUrlから参照を取得
          storageRef.put(resizedBlob).then((snapshot) => {
            console.log('画像が再アップロードされました');
          }).catch((error) => {
            console.error('アップロード中にエラーが発生しました:', error);
          });
        }, 'image/jpeg', quality);
      };
    }).catch((error) => {
      console.error('画像の取得中にエラーが発生しました:', error);
    });
}