/**
 * Modal Plugin
 */

Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling)
};

function noop() {

}

function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement('div')
  }

  const wrap = document.createElement('div');
  wrap.classList.add('modal__footer');

  buttons.forEach(btn => {
    const button = document.createElement('button');
    button.textContent = btn.text;
    button.classList.add('button');
    button.classList.add(`${'button-' + btn.type || 'secondary'}`);
    button.onclick = btn.handler || noop

    wrap.appendChild(button)
  });

  return wrap
}

function _createModal(options) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.insertAdjacentHTML('afterbegin', `
  <div class="modal__overlay" data-close="true">
    <div class="modal__window">
      <div class="modal__header">
        <span class="modal__title">${options.title || 'Window'}</span>
        ${options.closable ? '<span class="modal__close" data-close="true">&times;</span>' : ''}
      </div>
      <div class="modal__body" data-content>
         ${options.content || ''}
      </div>
    </div>
  </div>
  `);

  const footer = _createModalFooter(options.footerButtons);
  footer.appendAfter(modal.querySelector('[data-content]'));
  document.body.appendChild(modal);
  return modal
}

const modalFunc = function (options) {
  const modal = _createModal(options);
  const ANIMATION_SPEDD = 200;
  let open = false;
  let destroyed = false;

  const methods = {
    open() {
      if (destroyed) {
        return console.log('Modal is destroyed.')
      }
      !open && modal.classList.add('open');
      open = true
    },
    close() {
      open && modal.classList.remove('open');
      open && modal.classList.add('hide');
      setTimeout(() => {
        if(typeof options.onClose === 'function') {
          options.onClose()
        }
        modal.classList.remove('hide');
      }, ANIMATION_SPEDD);
      open = false;
    },
  };

  const listener = event => {
    if (event.target.dataset.close) {
      methods.close()
    }
  };

  modal.addEventListener('click', listener);

  return Object.assign(methods, {
    destroy() {
      modal.parentNode.removeChild(modal);
      modal.removeEventListener('click', listener);
      destroyed = true
    },
    setContent(html) {
      modal.querySelector('[data-content]').innerHTML = html
    }
  })
};