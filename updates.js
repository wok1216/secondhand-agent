/* Visual adjustments only. Search state and events live exclusively in app.js. */
const visualAdjustments = document.createElement('style');
visualAdjustments.textContent = `
  .market-actions button, .category-nav button { font-size:16px; }
  .market-header-search { height:58px; }
  .market-header-search input { font-size:17.5px; }
  .market-toggle { font-size:12.5px; }
  .market-header-search > button:last-of-type { font-size:28px; line-height:1; }
  .market-hero h1 { font-size:35px; }
  .popular-keywords, .popular-keywords button { font-size:15px; }
  .judgment-badge { display:inline-flex; align-items:center; border:1px solid currentColor; border-radius:7px; padding:5px 8px; background:#fff; font-size:10px; font-weight:700; white-space:nowrap; }
  .judgment-badge.recommend { color:#22C55E; }
  .judgment-badge.info { color:#3B82F6; }
  .judgment-badge.low { color:#FBBF24; }
  .judgment-badge.reject { color:#EF4444; }
  @media (max-width:720px) {
    .market-header-search { height:50px; }
    .market-header-search input { font-size:14px; }
    .market-hero h1 { font-size:28.75px; }
  }
`;
document.head.append(visualAdjustments);

document.title = '당근나라번개';
document.querySelectorAll('footer').forEach(footer => {
  footer.innerHTML = footer.innerHTML.replaceAll('당근번개나라', '당근나라번개');
});
document.querySelectorAll('.home-collection .section-heading h2').forEach(heading => {
  if (heading.textContent.includes('오늘의 추천')) heading.textContent = '사용자님을 위한 추천 상품';
});
const profileTitle = document.querySelector('.profile-hero h1');
if (profileTitle) profileTitle.innerHTML = '김선규님의<br><em>생활 이해하기</em>';
