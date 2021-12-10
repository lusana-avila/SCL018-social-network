import { readData, auth } from '../lib/firebase.js';

const templatePost = (posts) => {
  const feedContainer = document.querySelector('.feed-container');
  feedContainer.innerHTML = '';
  const printPost = (element) => {
    const commentBox = document.createElement('section');
    commentBox.className = 'comment-box';
    const printCommentStart = `
    <div id="container_comment" class="container-comment">
      <div id="${element.id}" class="post-id">
        <div id="user_name" class="user-name">${element.name}</div>
        <div id="title_comment" class="title-comment">${element.title}</div>
        <div id="description_comment" class="description-comment">${element.description}</div>
          <div class="button-like">
            <img id="picture-icon" src="Img/icono-subir-imagen.png">
          </div>
      
    `;
    const printCommentClosure = `
      </div>
    </div>
    `;

    let printCommentMiddle = '';
    if (element.id === auth.currentUser.uid) {
      printCommentMiddle = `
      <div id="buttons" class="buttons">

        <button class="button-edit">
          <img id="" src="Img/icono-subir-imagen.png">
        </button>

        <button class="button-delete">
          <img id="" src="Img/icono-subir-imagen.png">
        </button>

      </div>
      `;
    }
    commentBox.innerHTML += printCommentStart + printCommentMiddle + printCommentClosure;
    feedContainer.appendChild(commentBox);
  };
  posts.forEach(printPost);
  return feedContainer;
};

export const showPosts = () => {
  readData('posts', templatePost);
};
