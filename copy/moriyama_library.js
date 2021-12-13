/**
 * 守山市立図書館
 * 対象図書への直リンク URL をクリップボードにコピーする
 *
 */
(func => {
  console.log('load jquery');
  const script = document.createElement('script');
  script.src = '//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js';
  script.onload = () => {
    func(jQuery.noConflict(true));
  };
  document.body.appendChild(script);
})(async ($) => {
  const _x = STR_XPATH => {
    const xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    const xnodes = [];
    let xres;
    while (xres = xresult.iterateNext()) {
      xnodes.push(xres);
    }

    return xnodes;
  };

  // 全角→半角（英数字）
  // https://qumeru.com/magazine/395
  const replaceFullToHalf = str => {
    if (!str) {
      return;
    }
    return str.replace(/[！-～]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
  }

  const selector = '//form[@name="searchdetail"]//input[@name="biblioid"]';
  const biblioid = $(_x(selector)).val();

  const originalUrl = new URL(location.href);
  const url = unescape(originalUrl.origin + originalUrl.pathname).replace(/;jsess.*$/, '');
  const href = url + '?biblioid=' + biblioid;

  let copys = [];
  const title = $(_x('//form[@name="reviewinput"]//input[@name="prttil"]')).val();
  copys.push(replaceFullToHalf(title));
  copys.push(href);

  navigator.clipboard.writeText(copys.join('\n'));
  alert('タイトルおよび URL をコピーしました🆗');
});
