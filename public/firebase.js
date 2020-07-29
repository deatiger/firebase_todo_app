const db = firebase.firestore();

const todoForm = document.getElementById('todo-form');
const todoContainer = document.getElementById('todo-container');

const saveTodo = (title) => {
    return db.collection("todo").doc().set({title: title});
};

const deleteTodo = (id) => {
    return db.collection("todo").doc(id).delete();
}

// HTMLの読み込みが完了したら実行開始
window.onload = async() => {
    db.collection("todo").onSnapshot((snapshots) => {

        snapshots.docChanges().forEach((change) => {
            const todo = change.doc.data();
            const title = todo.title;
            const todoId = change.doc.id;

            if (change.type === "added") {
                // 追加するTODOアイテムのHTMLを生成する
                const newItem =`<li class="list-item" id="item-${todoId}">
						          <label>${title}</label>
						          <button class="btn-delete" role="button" data-id="${todoId}">完了</button>
                                </li>`;

                // リストにTODOアイテムを追加する
                todoContainer.insertAdjacentHTML('beforeend', newItem)
            } else {
                // データベースからデータが削除されたらHTML上からもTODOアイテムを削除
                const deletedItem = document.getElementById(`item-${todoId}`)
                todoContainer.removeChild(deletedItem)
            }
        });

        // btn-deleteクラスを持つ要素（全TODOアイテムの完了ボタン）を取得
        const deleteButtons = todoContainer.querySelectorAll(".btn-delete");

        //　完了ボタン1つずつにclickイベントのリスナーを設定
        deleteButtons.forEach((button) =>
            button.addEventListener("click", async (e) => {
                try {
                    // 完了ボタンを押されたTODOアイテムのIDを、data-id属性から取得
                    const deletedId = e.target.dataset.id;
                    await deleteTodo(deletedId);
                } catch (error) {
                    console.log(error);
                }
            })
        );

    });
}

// 追加ボタンをクリックしたら実行されるイベントリスナーを設定
todoForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const addedTodo = todoForm["todo-title"];
    const todoTitle = addedTodo.value;
    await saveTodo(todoTitle);

    todoForm.reset();
});
