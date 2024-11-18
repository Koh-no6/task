
// タスクを追加する関数
const BUTTON_CLICK_EVENT= document.getElementById('addTask');

BUTTON_CLICK_EVENT.addEventListener('click', () => {
    const taskInput = document.getElementById("taskInput"); //入力されたタスクの内容を取得
    const deadLine = document.getElementById("deadLine"); //入力された期限の内容を取得
    const taskList = document.getElementById("taskList");   //タスク一覧を表示するul要素を取得
    const newTask = document.createElement("li");   // li要素を作成。新しく追加されるタスクを表示

    // タスク未入力の場合エラー表示
    if (taskInput.value === ""){
        alert("落ち着いてタスクを入れましょう");
        return;
    }
    
    newTask.innerText = taskInput.value;  // 新しく作成されたli要素のテキスト = 入力されたタスクの内容

    // 期限を追加
    const newDeadLine = document.createElement("span");   // span要素を作成。新しく追加されるタスクを表示
    newTask.appendChild(newDeadLine);    //新しく作成されたli要素の子要素として、期限を追加

    //deadLine.value = ""; //リストに追加されると同時に入力欄を空欄にする
    //詰んだ const date = document.getElementById("deadLine"); //入力された期限の内容を取得
    //詰んだ date.value = '';

    newDeadLine.innerText = deadLine.value;  // 新しく作成されたspan要素のテキスト = 入力された期限の内容

    // タスク完了ボタンを追加
    const doneButton = document.createElement("button"); //button要素を作成するためのメソッド。タスク完了ボタンを表示
    doneButton.innerText = "タスク完了";
    doneButton.addEventListener("click", removeTask); // タスク完了ボタンを押した際にremoveTaskを呼び出す
    newTask.appendChild(doneButton);    //新しく作成されたli要素の子要素として、タスク完了ボタンを追加

    newTask.addEventListener("click", toggleTask); //タスクの文字列部分がクリックされた時に実行する関数。この場合toggle関数
    taskList.appendChild(newTask); //新しく追加されたli要素、ulの子要素として一覧に追加
    //詰んだ taskInput.value = ""; //リストに追加されると同時に入力欄を空欄にする
    
});

// タスクを削除する関数
function removeTask(){
    this.parentNode.parentNode.removeChild(this.parentNode); //タスク完了ボタンクリック → 属するliを削除
}

// タスクを完了する関数
function toggleTask(){
    this.classList.toggle("completed");
}

// 保存する処理
const save = document.querySelector("#save");
save.onclick = () => {
    localStorage.clear();
    const taskList = document.querySelector("#taskList");
    const memoItems = taskList.children;
    for (let i = 0; i < memoItems.length; i++) {
        const key = i;
        const value = memoItems[i].innerText;
        localStorage.setItem(key, value);
    }
}

// 保存された値を取り出す処理
const load = document.querySelector("#load");
load.onclick = () => {
    const reset = document.querySelector("#reset");
    reset.click();
    const keys = Object.keys(localStorage).sort();
    for (const key of keys) {
        const value = localStorage.getItem(key);
        const memoItem = document.createElement("li");
        memoItem.innerText = value;
        const newDeadLine = document.createElement("span");
        deadLine.innerText = value;
        const taskList = document.querySelector("#taskList");
        taskList.appendChild(memoItem);
    }
}

// リセット
const reset = document.querySelector("#reset");
reset.onclick = () => {
    const taskList = document.querySelector("#taskList");
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

// $('#save').on('click', function (){
//     // オブジェクトにまとめる
//     const data = {
//         taskInput: $('#taskInput').val(),
//         deadLine: $('#deadLine').val(),
//         taskList: $('#taskList').val(),
//     };
//     console.log(data);
//       // JSON形式に変換する
//       const json = JSON.stringify(data);
//       console.log(json);
//       // JSON形式のデータを保存
//       localStorage.setItem('memo', json);
//   });

//  $('#load').on('click', function (){
//     const json = localStorage.getItem('memo');
//     console.log(json);
//     const data = JSON.parse(json);
//     console.log(data);
//     $('#taskInput').val(data.taskInput);
//     $('#deadLine').val(data.deadLine);
//     $('#taskList').val(data.taskList);
//   });