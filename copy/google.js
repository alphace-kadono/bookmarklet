/**
 * Google 検索文字列と URL をクリップボードにコピーする
 * 不要な URL クエリパラメータを除去する
 *
 */
javascript:
(async () => {
  if (!navigator.clipboard) {
    alert('このブラウザでは使用できません🙇');
    return;
  }
  if (!window.location.href.match(/google\.com\//)) {
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

  let searchText = _x('//*[@aria-label="検索"]')[0].value || 'unknown';
  searchText = '🔎 ' + searchText;

  /* URL クエリパラメータを除去 */
  const originalUrl = new URL(location.href);
  const originalParams = new URLSearchParams(originalUrl.search);
  let newParams = new URLSearchParams;

  for (const [key, value] of originalParams) {
    if (['q', 'tbs', 'tbm'].includes(key)) {
      newParams.set(key, value);
    }
  }

  if (Array.from(newParams).length > 0) {
    newParams = '?' + newParams;
  }

  const newUrl = originalUrl.origin + originalUrl.pathname + newParams;

  clipText = [searchText, newUrl].join('\n');
  navigator.clipboard.writeText(clipText);

  location.href = newUrl;
})();
