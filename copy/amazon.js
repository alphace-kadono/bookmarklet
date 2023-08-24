javascript:
(async () => {
  if (!navigator.clipboard) {
    alert('このブラウザでは使用できません🙇');
    return;
  }
  if (!window.location.href.match(/amazon\.(com|co\.jp)\//)) {
    alert('このサイトでは使用できません🙇');
    return;
  }

  const sleep = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

  /* XPath 式よりオブジェクトを取得する */
  const _x = (STR_XPATH) => {
    const xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    let xnodes = [];
    let xres;
    while (xres = xresult.iterateNext()) {
      xnodes.push(xres);
    }
    return xnodes;
  };

  /* 商品タイトル */
  let title = _x('//*[@id="productTitle"]')[0].textContent || 'unknown';
  title = title.trim();
  title = title.replace(/\n/g, '');

  /* 商品 URL */
  let url = _x('//link[@rel="canonical"]')[0].href;
  url = url.replace(/amazon.co.jp\/.*\/dp/, 'amazon.co.jp/dp');

  clipText = [title, url].join('\n');
  navigator.clipboard.writeText(clipText);

  if (location.href != url) {
    location.href = url;
  }
})();
