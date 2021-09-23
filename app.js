const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// Create refs

const imagesGallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const modalContent = document.querySelector('.lightbox__image');
const dataSource = [];

// Create list of images

const makeImageAtt = ({ preview, description, original }) => {
  return `<li class="gallery__item">
   <a
    class="gallery__link"
    href = ${original}
    >
    <img
    class="gallery__image"
    src = ${preview}
    data-source = ${original} 
    alt = ${description}
    />
    </a>
    </li>`;
}

const makeListEls = galleryItems.map(makeImageAtt).join('');

imagesGallery.insertAdjacentHTML('afterbegin', makeListEls);

// Add event listener to open modal window

imagesGallery.addEventListener('click', openModal)
  
function openModal(e) {
  const imageEl = e.target.classList.contains('gallery__image');
  if (!imageEl) {
    return;
  }

  e.preventDefault();
  modal.classList.add("is-open");
  modalContent.src = e.target.dataset.source;
  modalContent.alt = e.target.alt;
  }

// Add event listeners to close modal window

modal.querySelector('.lightbox__button').addEventListener('click', (evt) => {
  modal.classList.remove('is-open');
  modalContent.src = '';
})

document.addEventListener('keyup', closeModalESC)

function closeModalESC(evt) {
  if (evt.which == 27) {
    modal.classList.remove('is-open');
    modalContent.src = '';
  }
}

modal.querySelector('.lightbox__overlay').addEventListener('click', (evt) => {
  modal.classList.remove('is-open');
  modalContent.src = '';
})

// Make scroll image

const imagesArray = document.querySelectorAll('.gallery__image');
imagesArray.forEach(element => {
  dataSource.push(element.dataset.source)
})

console.log(dataSource)

document.addEventListener('keydown', e => {
  const currentIndex = dataSource.indexOf(modalContent.src)
  if (e.key === 'ArrowLeft') {
    buttonLeft(currentIndex)
  } else if (e.key === 'ArrowRight') {
      buttonRight(currentIndex)
    }
})

function buttonLeft(currentIndex) {
  let nextIndex = currentIndex - 1;
  if (nextIndex == -1) {
    nextIndex = dataSource.length - 1;
  }
  modalContent.src = dataSource[nextIndex]
}

function buttonRight(currentIndex) {
  let nextIndex = currentIndex + 1;
  if (nextIndex === dataSource.length) {
    nextIndex = 0;
  }
  modalContent.src = dataSource[nextIndex]
}