javascript:
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

  if (!location.href.match(/https:\/\/imgur\.com/)) {
    alert('このページでは使用できません🙇');
    return;
  }

  const selector = '//img[@class="image-placeholder"]';
  const $item = $(_x(selector));
  let url = $item.attr('src');

  url = url.split('?')[0].replace(/\.png/, '.webp');
  url = `${url}?maxwidth=960`;

  navigator.clipboard.writeText(url);
  alert('URL をコピーしました🆗');

  location.href = url;
});
