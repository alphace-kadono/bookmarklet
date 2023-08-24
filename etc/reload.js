javascript:
(() => {
  const timeout = prompt('update interval [sec]', 60);
  // const waitSec = prompt('Set wait for page loaded [sec]', 3);
  const waitSec = 1;
  const url = location.href;
  const title = document.title;

  const reload = async () => {
    const timestamp = new Date().toLocaleTimeString();
    const newTitle = `${timestamp} | ${title}`;
    // IFRAME Set Height to 100%
    // https://stackoverflow.com/a/68987936
    const body = `
    <div style="position:fixed; left:0; right:0; top:0; bottom:0; margin:0px; padding:0px; overflow:hidden">
      <iframe src="${url}" frameborder="0" style="overflow:hidden; height:100%; width:100%" height="100%" width="100%">
      </iframe>
    </div>
    `;

    // <head><title>
    document.head.innerHTML = `<title>${newTitle}</title>`;
    // <body>
    for (const className of [...document.body.classList]) {
      document.body.classList.remove(className);
    }
    document.body.style = 'position:relative;';
    document.body.innerHTML = body;

    if (waitSec > 0) {
      const sleep = sec => new Promise(resolve => setTimeout(resolve, sec * 1000));
      await sleep(waitSec);
    }

    const $frame = $('frame').contents();

    if ($('.number, .number-multi', $frame).length > 0) {
      document.title = `🛑${document.title}`;
    }

    setTimeout(reload, timeout * 1000);
  };

  if (timeout > 0) {
    setTimeout(reload, timeout * 1000);
  }
})();
