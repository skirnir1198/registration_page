$(function () {
  // jobPostingsコレクションのドキュメントを全て取得してリストを作成する関数
  function fetchJobPostingsAndCreateList() {
    const db = firebase.firestore();
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

        // リスト要素にリストアイテムを追加
        listElement.appendChild(listItem);
      });
      // #jobPostingsList内のすべてのli要素にイベントリスナーを設定
      document.querySelectorAll('#jobPostingsList li').forEach(item => {
        item.addEventListener('click', event => {
          // クリックされたli要素からdocIdを取得
          const docId = event.currentTarget.getAttribute('data-doc-id');

          // 新しいページのURLを構築（ここではdetails.htmlとし、paramとしてdocIdを追加）
          const newPageUrl = `job_detail_page.html?param=${docId}`;

          // 新しいページを新しいタブで開く
          window.open(newPageUrl, '_blank');
        });
      });

    }).then(() => {
      $('#loading').hide();
    }).catch((error) => {
      console.error("Error fetching documents: ", error);
    });
  }
  // 関数を呼び出してリストを表示
  fetchJobPostingsAndCreateList();

});