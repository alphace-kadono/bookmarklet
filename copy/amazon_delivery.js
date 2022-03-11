javascript:
/**
 * Amazon 配送状況 URL を短縮
 */
(async () => {
  if (!navigator.clipboard) {
    alert('このブラウザでは使用できません🙇');
    return;
  }
  if (!window.location.href.match(/amazon[.]co[.]jp[/][^/]+track/)) {
    alert('このサイトでは使用できません🙇');
    return;
  }

  /* URL クエリパラメータを抽出 */
  const originalUrl = new URL(location.href);
  const originalParams = new URLSearchParams(originalUrl.search);
  const newParams = new URLSearchParams;

  for (const [key, value] of originalParams) {
    if (['orderId', 'orderID'].includes(key)) {
      newParams.set('orderID', value);
      continue;
    }
    if (['shipmentId', 'orderingShipmentId'].includes(key)) {
      newParams.set('orderingShipmentId', value);
    }
  }

  const newUrl = 'https://www.amazon.co.jp/gp/css/shiptrack/view.html/?'
    + newParams.toString();

  clipText = newUrl;
  navigator.clipboard.writeText(clipText);
  alert('URL をコピーしました🆗');
})();
