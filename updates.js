document.title = '당근나라번개';
document.querySelectorAll('footer').forEach(footer => {
  footer.innerHTML = footer.innerHTML.replaceAll('당근번개나라', '당근나라번개');
});
document.querySelectorAll('.home-collection .section-heading h2').forEach(heading => {
  if (heading.textContent.includes('오늘의 추천')) heading.textContent = '사용자님을 위한 추천 상품';
});
const profileTitle = document.querySelector('.profile-hero h1');
if (profileTitle) profileTitle.innerHTML = '김선규님의<br><em>생활 이해하기</em>';
