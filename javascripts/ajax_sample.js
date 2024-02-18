let number = 0;
let data = []; // ajax.jsonから取得したデータを格納する変数
const titleArea = document.getElementById("title");
const contentArea = document.getElementById("content");
const videoArea = document.getElementById("video");
const button = document.getElementById('btn');

function getData() {
  console.log('getData関数が呼び出される'); // この行を追加
  const request = new XMLHttpRequest();
  request.open("GET", "ajax.json", true);
  request.responseType = "json";
  request.onload = function() {
    if (request.status === 200) {
      data = request.response; // データを格納
      changeVideo(); // 初回のデータ表示
    } else {
      console.error('データの取得に失敗しました。');
    }
  };
  request.send();
}

function changeVideo() {
  if (data.length > 0) {
    // 既にデータがある場合は、そのデータを使ってUIを更新
    titleArea.innerHTML = data[number].title;
    contentArea.innerHTML = data[number].content;
    videoArea.setAttribute("src", data[number].url);
    number = number >= data.length - 1 ? 0 : number + 1;
  } else {
    // データがまだない場合は、データを取得
    getData();
  }
}

button.addEventListener('click', changeVideo); // ボタンクリック時に動画を切り替える

window.onload = function() {
  changeVideo(); // ページ読み込み時にも動画を表示
};
