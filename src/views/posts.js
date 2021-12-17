/* eslint-disable import/named */
import {
  readData,
  auth,
  deleteData,
  updateLikes,

} from '../lib/firebase.js';

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
        
        <div class="user-icons">

        <div class="buttonLike">
          <button class="button-like" id="button_like" value="${element.id}">
            <img id="like_icon" class="like-icon" src="Img/icono-like.png">
          </button>
          <p class="counter-likes" id="counterLikes">${element.likesCounter} Me gusta</p>
        </div>
      
    `;
    const printCommentClosure = `
        </div>
      </div>
    </div>
    `;

    let printCommentMiddle = '';
    if (element.userId === auth.currentUser.uid) {
      printCommentMiddle = `
      
      <div id="owner_icon" class="owner-icon">
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

  // función para dar like
  const likeButton = document.querySelectorAll('.button-like');
  likeButton.forEach((heart) => {
    heart.addEventListener('click', () => {
      const postId = heart.value;
      updateLikes(postId);
    });
  });

  return feedContainer;
};

export const showPosts = () => {
  readData('posts', templatePost);
};

// esto va en la línea 30: <div class="button-edit">
// <img id="edit_icon" class="edit-icon" src="Img/icono-subir-imagen.png">
// </div>
