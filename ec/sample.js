(function (func) {
  var scr = document.createElement("script");
  scr.src = "//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
  scr.onload = function () {
    func(jQuery.noConflict(true));
  };
  document.body.appendChild(scr);
})(function ($) {
  function _x(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    while (xres = xresult.iterateNext()) {
      xnodes.push(xres);
    }

    return xnodes;
  }

  let type;

  if ( window.location.href.match(/order-rp\.rms\.rakuten\.co\.jp\//) ) {
    type = 'rakuten';
  } else if ( window.location.href.match(/pro\.store\.yahoo\.co\.jp\//) ) {
    type = 'yahoo';
  } else {
    alert('このサイトでは使用できません🙇');
    return;
  }

  const selectors = {
    /* 楽天 RMS */
    'rakuten' : {
      '名前'     : '//div[@class="rms-content-order-details-contact-info col-sm-12 rms-clear-padding"]//*[@class="fullname"]',
      'フリガナ' : '//div[@class="rms-content-order-details-contact-info col-sm-12 rms-clear-padding"]//*[@class="furigana"]',
      '住所'     : '//div[@class="rms-content-order-details-contact-info col-sm-12 rms-clear-padding"]//*[@class="address"]',
      '電話番号' : '//div[@class="rms-content-order-details-contact-info col-sm-12 rms-clear-padding"]//*[@class="phone"]',

      '受注番号' : '//a[@class="rms-status-order-nr"]',
      '注文日時' : '//td[contains(text(), "注文日時")]/following-sibling::td[1]',
      '支払方法' : '//div[@class="rms-col-70-percent"]/p/span[contains(text(), "クレジット") or contains(text(), "振込") or contains(text(), "払")]',
      '支払区分' : '//td[contains(text(), "支払い回数")]/following-sibling::td[1]',
      '配送日時指定' : '//div[@class="rms-col-70-percent"]/p/span[starts-with(text(), "202") and contains(text(), "/")]',
      '送料'     : '//div[@class="rms-content-order-details-block-destination-wrapper col-sm-12 rms-clear-padding"]//div[5]//span[1]',
      'ポイント利用' : '//td[./span[.="ポイント利用"]]/following-sibling::td[1]/span',
      'クーポン利用' : '//table[@class="rms-content-order-details-billing-details-table"]//tr[not(@class="highlight")]//td[.//span[contains(text(), "クーポン")]]',
      '合計(税込)'   : '//td//span[@class="rms-price-tag"]',

      '商品URL'    : '//div[@class="rms-table-column-line"]//a[contains(@href, "item.rakuten.co.jp")]',
      '注文者住所' : '//div[@class="rms-content-order-details-contact-info"]//div[@class="rms-content-order-details-contact-info-contact-options"]/span[@class="address"]',
      '注文者名前' : '//div[@class="rms-content-order-details-contact-info"]//span[@class="fullname"]',
      '注文者フリガナ' : '//div[@class="rms-content-order-details-contact-info"]//span[@class="furigana"]',
      '注文者電話番号' : '//div[@class="rms-content-order-details-contact-info"]//span[@class="phone"]',
    },
    /* Yahoo */
    'yahoo' : {
      '郵便番号' : '//div[@class="ReceAdd"]//th[.="郵便番号"]/following-sibling::td[1]//p',
      '住所'     : '//div[@class="ReceAdd"]//th[.="住所"]/following-sibling::td[1]//p',
      '名前'     : '//div[@class="ReceAdd"]//th[.="氏名"]/following-sibling::td[1]//span',
      'フリガナ' : '//div[@class="ReceAdd"]//th[.="氏名カナ"]/following-sibling::td[1]//p',
      '電話番号' : '//div[@class="ReceAdd"]//th[.="電話番号"]/following-sibling::td[1]//p',

      '受注番号' : '//p[contains(text(),"ec-furniture-")]',
      '注文日時' : '//div[@id="ordBasic"]//tr[1]//td[2]//div[1]//p[1]',
      '支払方法' : '//th[.="お支払方法"]/following-sibling::td[1]//p',
      '支払区分' : '//th[.="お支払区分"]/following-sibling::td[1]//p',
      '配送日時指定' : '//div[@class="ReceMeth"]//th[.="お届け希望日"]/following-sibling::td[1]//p',
      '送料'     : '//th[.="送料"]/following-sibling::td[1]',
      '手数料'   : '//th[.="手数料"]/following-sibling::td[1]',
      'ポイント利用' : '//th[.="ポイント利用分"]/following-sibling::td[1]',
      'クーポン利用' : '//th[.="クーポン値引き"]/following-sibling::td[1]',
      'クーポン原資' : '//th[.="クーポン原資元"]/following-sibling::td[1]',
      '合計(税込)'   : '//th[.="請求金額（税込）"]/following-sibling::td[1]//p',

      '商品URL'        : '//td[@class="itemName"]/p[1]/a[1]',
      '注文者郵便番号' : '//div[@class="Orderer"]//th[.="郵便番号"]/following-sibling::td[1]//p',
      '注文者住所'     : '//div[@class="Orderer"]//th[.="住所"]/following-sibling::td[1]//p',
      '注文者名前'     : '//div[@class="Orderer"]//th[.="氏名"]/following-sibling::td[1]//p',
      '注文者フリガナ' : '//div[@class="Orderer"]//th[.="氏名カナ"]/following-sibling::td[1]//p',
      '注文者電話番号' : '//div[@class="Orderer"]//th[.="電話番号"]/following-sibling::td[1]//p',

      '備考' : '//th[.="ご要望"]/following-sibling::td[1]//pre',
    },
  };
  const values = {
    'ショップ' : type == 'rakuten' ? '楽天' : 'Yahoo!',
  };
  const bgColor = '#ffe4c4';

  $.each(selectors[type], function (key, selector) {
    let value;
    const item = $(_x(selector));

    /* <br> が含まれている場合は空白に置換しておく */
    if ( item.html() !== undefined && item.html().includes('<br') ) {
      const replace = item.html().replace(/<br[\s/]*>/gi, ' ');
      item.html(replace);
    }

    value = item.text() || item.val();

    if (key.indexOf('URL') !== -1) {
      value = item.attr('href');
    }

    if (value !== undefined) {
      values[key] = value.trim();
      item.css('background', bgColor);
    }
  });

  values['名前フリガナ'] = values['名前'] + '[' + values['フリガナ'] + ']様';
  values['注文者名前フリガナ'] = values['注文者名前'] + '[' + values['注文者フリガナ'] + ']様';

  if (values['クーポン利用'] !== undefined) {
    values['クーポン利用'] = values['クーポン利用'].replace(/\s{2,}/gm, ' ');
  }

  if (values['クーポン原資'] !== undefined) {
    values['クーポン利用'] = values['クーポン利用'] + ' ' + values['クーポン原資'];
  }

  if (values['支払区分'] !== undefined) {
    values['支払方法'] = values['支払方法'] + ' ' + values['支払区分'];
  }
  values['受注URL'] = window.location.href;

  const json = JSON.stringify(values);
  navigator.clipboard.writeText(json);
});
