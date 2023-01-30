let active = false
let tag = '#'
let span;
let imputModal;

const createSpan = element => {
  span = document.createElement('span')
  span.appendChild(document.createTextNode(tag))
  element.appendChild(span)
  span.style.cssText = 'background-color: yellowgreen; color: teal;'
}

/* const createSpan = element => {
  span = document.createElement('div')
  imputModal = document.createElement('input')
  span.appendChild(imputModal)
  element.appendChild(span)
  span.setAttribute("style", "border:2px solid red; background-color: rgb(255, 125, 115); display: absolute; margin: auto auto; width: 200px; height: 200px")
} */


const keyPress = e => {
  const focus = e.target
  const tagName = focus.tagName
  const contentEditable = focus.attributes.getNamedItem('contenteditable')

  if (tagName === 'INPUT' || (tagName === 'DIV' && contentEditable)) {
    readKeys(e, focus)
  }
}


function readKeys(key, focusElement) {
  if (key.keyCode === 35) {
    key.preventDefault()
    active = true
    createSpan(focusElement)
  }

  if(active && key.keyCode != 35) {
    key.preventDefault()
    tag += key.key    
    span.textContent = tag

    console.log(tag)
    console.log(span)
  }

  if (key.keyCode === 27 || key.keyCode == 32) {
    active = false
    tag = '#'
  }

}








// Función autoejecutable para capturar las pulsaciones en diferentes iframes de la página
(function checkForNewIframe(doc) {
  if (!doc) return;

  doc.addEventListener('keypress', keyPress, true);

  doc.hasSeenDocument = true;
  for (let i = 0, contentDocument; i<frames.length; i++) {
    try {
      contentDocument = iframes[i].document;
    } catch (e) {
      continue;
    }
    if (contentDocument && !contentDocument.hasSeenDocument) {
      checkForNewIframe(iframes[i].contentDocument);
    }
  }
})(document)