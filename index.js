const todoForm = document.getElementById('todo-form');
const todoContainer = document.getElementById('todo-container');
let index = 0;

// TODOアイテムを削除する関数
const deleteTodo = (deletedIndex) => {
	const deletedItem = document.getElementById(`item-${deletedIndex}`);
	todoContainer.removeChild(deletedItem)
};

// 追加ボタンをクリックしたら実行されるイベントリスナーを設定
todoForm.addEventListener('submit', e =>{
	// submitイベントのデフォルト動作（ページリロードなど）を実行しないよう設定
	e.preventDefault();

	// 入力フォーム(inputタグ)に入力された値を取得
	const addedTodo = todoForm["todo-title"];
	const todoName = addedTodo.value;

	// 追加するTODOアイテムのHTMLを生成する
	const newItem = `<li class="list-item" id="item-${index}">
						<label for="todo-${index}">${todoName}</label>
						<button role="button" onclick="deleteTodo(${index})">完了</button>
					 </li>`

	// リストにTODOアイテムを追加する
	todoContainer.insertAdjacentHTML('beforeend', newItem)

	// 入力フォーム(inputタグ)に入力された値を初期化する
	addedTodo.value = "";

	// インデックスを1増やす
	index++;
});