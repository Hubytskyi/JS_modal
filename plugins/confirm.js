const confirm = function (options) {
  return new Promise((resolve, reject) => {
    const confirmModal = modalFunc({
      title: options.title,
      closable: false,
      content: options.content,
      onClose() {
        confirmModal.destroy()
      },
      footerButtons: [
        {
          text: 'Yes', type: 'accepted', handler() {
            confirmModal.close();
            resolve()
          }
        },
        {
          text: 'Cancel', type: 'cancel', handler() {
            confirmModal.close();
            reject()
          }
        }
      ]
    });

    setTimeout(() => {
      confirmModal.open()
    }, 100)
  })
};