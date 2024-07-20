// var select_release = 0;

// // モーダルを開くボタン
// var openModalBtn = document.getElementById("openModalBtn");

// // モーダル本体
// var modal = document.getElementById("myModal");

// // モーダルを閉じるための<span>要素
// var span = document.getElementsByClassName("close")[0];

// // モーダルを開くボタンのクリックイベント
// if (openModalBtn)
//   openModalBtn.onclick = function () {
//     modal.style.display = "block";
//   }

// // モーダルを閉じる<span>要素のクリックイベント
// if (span)
//   span.onclick = function () {
//     modal.style.display = "none";
//   }

// // モーダル外をクリックした場合の処理
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

// // モーダル内のボタンのクリックイベント
// var modalButtons = document.getElementsByClassName("modal-button");
// for (var i = 0; i < modalButtons.length; i++) {
//   modalButtons[i].onclick = function () {
//     var selectedChoice = this.getAttribute("data-choice");
//     modal.style.display = "none";
//     processSelection(selectedChoice);
//   }
// }

// // 選択肢が選ばれた後の処理を定義する関数
// function processSelection(choice) {
// }