const dropzones = document.querySelector('.dropzones');

document.addEventListener('dragstart', e => {
  e.dataTransfer.dropEffect = "move"
  e.dataTransfer.setData('application/x-moz-node', e.target.cloneNode(true));
  console.log(e)
})
document.addEventListener('dragend', e => {
  console.log(e)
})

dropzones.addEventListener('dragenter', (e) => {
  if (e.target.classList.contains('dropzone')) {
    e.target.classList.add('solid-border');
  }
})
dropzones.addEventListener('dragleave', (e) => {
  if (e.target.classList.contains('dropzone')) {
    console.log(e, event.dataTransfer)
    e.target.classList.remove('solid-border');
  }
})
dropzones.addEventListener('drop', (e) => {
  if (e.target.classList.contains('dropzone')) {
    console.log(e.srcElement, e.dataTransfer)
    e.target.appendChild(e.srcElement);
  }
})
