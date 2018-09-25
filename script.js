const dropzones = document.querySelector('.dropzones');
const fileDropZone = document.querySelector('.file-dropzone');

let el = null;

document.querySelector('.draggable-items').addEventListener('dragstart', e => {
  console.log(e)
  e.dataTransfer.dropEffect = 'move';
  el = e.target.cloneNode(true)
  el.removeAttribute('draggable');
})

dropzones.addEventListener('dragover', (e) => {
  e.preventDefault();
})
dropzones.addEventListener('dragenter', (e) => {
  if (e.target.classList.contains('dropzone')) {
    e.target.classList.add('solid-border');
  }
})
dropzones.addEventListener('drop', (e) => {
  e.preventDefault();
  e.target.appendChild(el);
  el = null;
  e.target.classList.remove('solid-border');
})

dropzones.addEventListener('dragleave', (e) => {
  if (e.target.classList.contains('dropzone')) {
    e.target.classList.remove('solid-border');
  }
})

const events = [
  'dragenter',
  'dragleave',
  'dragover', // to allow drop
  'drop'
];
events.forEach(e => {
  fileDropZone.addEventListener(e, (ev) => {
    ev.preventDefault();
    if (ev.type === 'dragenter') {
      fileDropZone.classList.add('solid-border');
    }
    if (ev.type === 'dragleave') {
      fileDropZone.classList.remove('solid-border');
    }
    if(ev.type === 'drop') {
      fileDropZone.classList.remove('solid-border');
      handleFiles(ev.dataTransfer.files)
        .then(values => values.map(tag => {
          tag.setAttribute('class', 'border rounded img-preview');
          fileDropZone.appendChild(tag)
        }));
    }
  })
})
const generatePreviewData = (file) => {
  const fr = new FileReader();
  return new Promise((resolve, reject) => {
    fr.addEventListener('load', (e) => {
      resolve(fr.result);
    });
    fr.addEventListener('error', (e) => {
      reject();
    });
    fr.readAsDataURL(file);
  });
}

const imgForFile = (file) => {
  return generatePreviewData(file)
    .then((data) => {
      const img = document.createElement('img');
      img.src = data;
      img.height = 200;
      return img;
    })
}

const handleFiles = (_files)  => {
  const files = Array.prototype.slice.call(_files);
  return Promise.all(files.map(imgForFile)) 
}
