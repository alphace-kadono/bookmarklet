javascript:
(async () => {
  if (! navigator.clipboard) {
    alert('このブラウザでは使用できません🙇');
    return;
  }
  if (! window.location.href.match(/amazon\.(com|co\.jp)\/s\?/)) {
    alert('このサイトでは使用できません🙇');
    return;
  }

  const sleep = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

  const pctOffMin = prompt('最小: n % OFF の商品', 10);
  const pctOffMax = prompt('最大: n % OFF の商品', 90);

  /* URL クエリパラメータを追加｜更新 */
  const originalUrl = new URL(location.href);
  let originalParams = new URLSearchParams(originalUrl.search);

  originalParams.delete('rh');
  originalParams.set('pct-off', `${pctOffMin}-${pctOffMax}`);

  if (Array.from(originalParams).length > 0) {
    originalParams = '?' + originalParams;
  }

  const newUrl = originalUrl.origin + originalUrl.pathname + originalParams;
  navigator.clipboard.writeText(newUrl);

  if (location.href != newUrl) {
    location.href = newUrl;
  }
})();
