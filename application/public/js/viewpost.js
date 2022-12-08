function addNewComment(data) {

}
document.getElementById('comment-button')
  .addEventListener('click', function (ev) {
    let commentTextElement = document.getElementById('comment-text');
    let commentText = commentTextElement.value;
    let postid = ev.currentTarget.dataset.postid;

    fetch("/comments/create", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({ comment: commentText, postid: postid })
    })
      .then(response => response.json())
      .then(res_json => console.log(res_json));
  })