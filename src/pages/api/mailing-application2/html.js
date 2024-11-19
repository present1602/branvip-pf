export function createMailHtmlApplication2(
    name,
    productType,
    trademarkNameKr,
    trademarkNameEn,
    serviceIntroduction,
    items
) {
    return `<!DOCTYPE html>
<html lang="ko">
  <head>
  <title></title>
<meta charset="UTF-8">
  <style>
    .container {
    margin: 0 auto;
    max-width: 600px;
  }

    .custom-table, .info-table {
    width: 100%;
    border-collapse: collapse;
  }

    .info-cell, .table-cell {
    font-size: 17px;
    padding: 18px 0;
    text-align: left;
  }

    .info-cell {
    border-bottom: 1px solid rgba(0, 27, 55, 0.1);
  }

    .info-cell-title {
    white-space: nowrap;
    vertical-align: top;
    width: 1%;
  }

    .info-cell-content {
    padding-left: 31px;
  }

    .font-details, .text-section, .footer-text {
    font-family: 'Noto Sans KR', 'SF Pro KR', 'SF Pro Display', 'SF Pro Icons', '-apple-system', 'BlinkMacSystemFont', 'Basier Square', 'Apple SD Gothic Neo', 'Roboto', 'Noto Sans', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    text-align: left;
    color: #333d4b;
  }

    .font-details {
    font-size: 29px;
    font-weight: 700;
    margin-top: 60px;
  }

    .text-section, .footer-text {
    font-size: 14px;
    color: #4e5968;
  }

    .footer-text {
    font-size: 13px;
    color: #8b95a1;
    padding-top: 32px;
  }

    .divider {
    border-top: solid 1px rgba(0, 29, 58, 0.18);
    margin-top: 32px;
  }

    .image-style {
    height: 40px;
    display: block;
  }

    .ul-style {
    margin-top: 30px;
  }

    .li-style {
    margin-left: 8px;
    margin-bottom: 8px;
  }
    .social-links {
    margin-top: 10px;
    margin-right: 1px; /* 소셜 링크 이미지 간격 조정 */
  }
  </style>
</head>
<body>
<div class="container">
  <table class="custom-table">
    <tr>
      <td class="table-cell">
      <a  id="myLink" href="https://www.branvip.com">
        <img id="myImage"  class="image-style" src="https://branvip.dooray.com/drive/v1/downloads/3257992129857003896/3747936684348624791?"  alt="logo" onclick="return false;">
        </a>
          <div class="font-details">${name} 님, <br>의뢰가 정상적으로 접수되었습니다.</div>
      </td>
    </tr>
  </table>
</div>
<div class="container">
  <table class="info-table">
    <tr>
      <td class="info-cell info-cell-title">의뢰유형</td>
<!--      order.item join order-->
      <td class="info-cell info-cell-content">${items}</td>
    </tr>
    <tr>
      <td class="info-cell info-cell-title">상표명</td>
      <td class="info-cell info-cell-content">${trademarkNameKr} ${trademarkNameEn}</td>
    </tr>    
    <tr>
      <td class="info-cell info-cell-title">상품류</td>
      <td class="info-cell info-cell-content">${productType}</td>
    </tr>
    <tr>
      <td class="table-cell info-cell-title" colspan="2">제품서비스 소개</td>
    </tr>
    <tr>
      <td class="info-cell info-cell-content" colspan="2">${serviceIntroduction}</td>
    </tr>
  </table>
</div>
<div class="container">
  <div class="text-section">
    <ul class="ul-style">
      <li class="li-style">저희 서비스에 관심을 가지고 문의해 주셔서 감사드립니다.</li>
      <li class="li-style">문의에 대하여 순차적으로 답변해 드리도록 하겠습니다.</li>
      <li class="li-style">궁금하신 점이 있다면 언제든지 저희에게 연락해 주시기 바랍니다. 감사합니다.</li>
    </ul>
  </div>
  <div class="divider"></div>
  <div class="footer-text">
    <strong>브랜빕</strong><br>06249 서울특별시 강남구 역삼로 160, 6층 4호<br>Copyright ⓒ branvip. All Rights Reserved
  </div>
  <div class="social-links">
    <a href="https://www.branvip.com/" target="_blank"><img src="https://branvip.dooray.com/drive/v1/downloads/3257992129857003896/3747899516362036853?" width="23" alt="link1"></a>
    <a href="https://www.instagram.com/branvip_official/" target="_blank"><img src="https://branvip.dooray.com/drive/v1/downloads/3257992129857003896/3747899515091349538?" width="23" alt="link2"></a>
    <a href="https://blog.naver.com/branvip" target="_blank"><img src="https://branvip.dooray.com/drive/v1/downloads/3257992129857003896/3747899524010123554?" width="23" alt="link3"></a>
    <a href="https://branvipcorp.com/" target="_blank"><img src="https://branvip.dooray.com/drive/v1/downloads/3257992129857003896/3747899524022865879?" width="23" alt="link4"></a>
  </div>
</div>
</body>
</html>`;
}

export function createMailHtmlDesign(name, items) {
    return `<!DOCTYPE html>
<html lang="ko">
  <head>
  <title></title>
<meta charset="UTF-8">
  <style>
    .container {
    margin: 0 auto;
    max-width: 600px;
  }

    .custom-table, .info-table {
    width: 100%;
    border-collapse: collapse;
  }

    .info-cell, .table-cell {
    font-size: 17px;
    padding: 18px 0;
    text-align: left;
  }

    .info-cell {
    border-bottom: 1px solid rgba(0, 27, 55, 0.1);
  }

    .info-cell-title {
    white-space: nowrap;
    vertical-align: top;
    width: 1%;
  }

    .info-cell-content {
    padding-left: 31px;
  }

    .font-details, .text-section, .footer-text {
    font-family: 'Noto Sans KR', 'SF Pro KR', 'SF Pro Display', 'SF Pro Icons', '-apple-system', 'BlinkMacSystemFont', 'Basier Square', 'Apple SD Gothic Neo', 'Roboto', 'Noto Sans', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    text-align: left;
    color: #333d4b;
  }

    .font-details {
    font-size: 29px;
    font-weight: 700;
    margin-top: 60px;
  }

    .text-section, .footer-text {
    font-size: 14px;
    color: #4e5968;
  }

    .footer-text {
    font-size: 13px;
    color: #8b95a1;
    padding-top: 32px;
  }

    .divider {
    border-top: solid 1px rgba(0, 29, 58, 0.18);
    margin-top: 32px;
  }

    .image-style {
    height: 40px;
    display: block;
  }

    .ul-style {
    margin-top: 30px;
  }

    .li-style {
    margin-left: 8px;
    margin-bottom: 8px;
  }
    .social-links {
    margin-top: 10px;
    margin-right: 1px; /* 소셜 링크 이미지 간격 조정 */
  }
  </style>
</head>
<body>
<div class="container">
  <table class="custom-table">
    <tr>
      <td class="table-cell">
      <a  id="myLink" href="https://www.branvip.com">
        <img id="myImage"  class="image-style" src="https://branvip.dooray.com/drive/v1/downloads/3257992129857003896/3747936684348624791?"  alt="logo" onclick="return false;">
        </a>
          <div class="font-details">${name} 님, <br>의뢰가 정상적으로 접수되었습니다.</div>
      </td>
    </tr>
  </table>
</div>
<div class="container">
  <table class="info-table">
    <tr>
      <td class="info-cell info-cell-title">의뢰유형</td>
<!--      order.item join order-->
      <td class="info-cell info-cell-content">${items.map(item => item)}</td>
    </tr>
  </table>
</div>
<div class="container">
  <div class="text-section">
    <ul class="ul-style">
      <li class="li-style">저희 서비스에 관심을 가지고 문의해 주셔서 감사드립니다.</li>
      <li class="li-style">문의에 대하여 순차적으로 답변해 드리도록 하겠습니다.</li>
      <li class="li-style">궁금하신 점이 있다면 언제든지 저희에게 연락해 주시기 바랍니다. 감사합니다.</li>
    </ul>
  </div>
  <div class="divider"></div>
  <div class="footer-text">
    <strong>브랜빕</strong><br>06249 서울특별시 강남구 역삼로 160, 6층 4호<br>Copyright ⓒ branvip. All Rights Reserved
  </div>
  <div class="social-links">
    <a href="https://www.branvip.com/" target="_blank"><img src="https://branvip.dooray.com/drive/v1/downloads/3257992129857003896/3747899516362036853?" width="23" alt="link1"></a>
    <a href="https://www.instagram.com/branvip_official/" target="_blank"><img src="https://branvip.dooray.com/drive/v1/downloads/3257992129857003896/3747899515091349538?" width="23" alt="link2"></a>
    <a href="https://blog.naver.com/branvip" target="_blank"><img src="https://branvip.dooray.com/drive/v1/downloads/3257992129857003896/3747899524010123554?" width="23" alt="link3"></a>
    <a href="https://branvipcorp.com/" target="_blank"><img src="https://branvip.dooray.com/drive/v1/downloads/3257992129857003896/3747899524022865879?" width="23" alt="link4"></a>
  </div>
</div>
</body>
</html>`;
}
