javascript:
(() => {
  const timeout = prompt('Set timeout [sec]', 60);
  const waitSec = prompt('Set wait for page loaded [sec]', 3);
  const url = location.href;
  const title = document.title;

  const reload = async () => {
    const timestamp = new Date().toLocaleTimeString();
    const newTitle = `${timestamp} | ${title}`;

    // iframe をフル画面に設定するのが面倒そうなので、非推奨の frameset を利用
    // const iframe = `<iframe src="${url}"/></iframe>`;
    const iframe = `<frameset cols="*"><frame src="${url}"/></frameset>`;

    document.write(`<title>${newTitle}</title>`);
    document.write(iframe);
    document.close();

    if (waitSec > 0) {
      const sleep = sec => new Promise(resolve => setTimeout(resolve, sec * 1000));
      await sleep(waitSec);
    }

    const frame = $('frame').contents();

    if ($('.number, .number-multi', frame).length > 0) {
      document.title = `🛑${document.title}`;
    }

    setTimeout(reload, timeout * 1000);
  };

  if (timeout > 0) {
    setTimeout(reload, timeout * 1000);
  }
})();
