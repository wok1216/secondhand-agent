/* Visual adjustments only. Search state and events live exclusively in app.js. */
const visualAdjustments = document.createElement('style');
visualAdjustments.textContent = `
  .brand { display:flex; align-items:center; gap:7px; font-size:25px; }
  .brand-mark { width:31px; height:31px; flex:0 0 31px; }
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
    .brand { font-size:21.25px; }
    .brand-mark { width:27px; height:27px; flex-basis:27px; }
    .market-header-search { height:50px; }
    .market-header-search input { font-size:14px; }
    .market-hero h1 { font-size:28.75px; }
  }
`;
document.head.append(visualAdjustments);

document.title = '당근나라번개';
const brand = document.querySelector('.brand');
if (brand) {
  brand.setAttribute('aria-label', '당근나라번개 홈');
  brand.innerHTML = '<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="15" fill="#ff6f32"/><path d="M18.2 4.8c-2.4 1.5-3.2 3.4-2.7 5.4" fill="none" stroke="#54a64a" stroke-width="2.6" stroke-linecap="round"/><path d="M17.5 8.1 9.7 18h5.8l-1 6 7.8-10h-5.8z" fill="#fff" stroke="#fff" stroke-linejoin="round"/></svg>당근나라번개';
}
document.querySelectorAll('footer').forEach(footer => {
  footer.innerHTML = footer.innerHTML.replaceAll('당근번개나라', '당근나라번개');
});
document.querySelectorAll('.home-collection .section-heading h2').forEach(heading => {
  if (heading.textContent.includes('오늘의 추천')) heading.textContent = '사용자님을 위한 추천 상품';
});
const profileTitle = document.querySelector('.profile-hero h1');
if (profileTitle) profileTitle.innerHTML = '김선규님의<br><em>생활 이해하기</em>';
