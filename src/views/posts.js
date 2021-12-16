import { readData, auth, deleteData } from '../lib/firebase.js';

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
            
          </div>
      
    `;
    const printCommentClosure = `
      </div>
    </div>
    `;

    let printCommentMiddle = '';
    if (element.userId === auth.currentUser.uid) {
      printCommentMiddle = `
      <div id="user_icons" class="user-icons">


        <button class="button-delete" id="button_delete" value="${element.id}">
          <img id="delete_icon" class="delete-icon" src="Img/icono_delete.png">
        </button>

      </div>
      `;
    }
    commentBox.innerHTML += printCommentStart + printCommentMiddle + printCommentClosure;
    feedContainer.appendChild(commentBox);
  };
  posts.forEach(printPost);

  // función para borrar post

  const deleteButton = document.querySelectorAll('.button-delete');
  deleteButton.forEach((icon) => {
    icon.addEventListener('click', () => {
      deleteData(icon.value);
    });
  });
};

export const showPosts = () => {
  readData('posts', templatePost);
};

// esto va en la línea 30: <div class="button-edit">
// <img id="edit_icon" class="edit-icon" src="Img/icono-subir-imagen.png">
// </div>
