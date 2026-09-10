const sellerProfiles = {
  'racket-1': { name: '코트러버', location: '중구 필동', temperature: '40.7°C', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80' },
  'racket-2': { name: '성수테니스', location: '성동구 성수동', temperature: '42.1°C', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80' },
  'racket-3': { name: '주말랠리', location: '마포구 연남동', temperature: '39.8°C', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80' },
  'table-1': { name: '연희살림', location: '서대문구 연희동', temperature: '41.3°C', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80' },
  'bag-1': { name: '오늘도출근', location: '동작구 상도동', temperature: '43.0°C', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80' },
  'lamp-1': { name: '봉천의밤', location: '관악구 봉천동', temperature: '40.2°C', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80' }
};

const products = [
  { id: 'racket-1', name: '윌슨 초보용 테니스 라켓', price: 42000, category: '스포츠', location: '중구 필동', uploadedAt: '33분 전', image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=85', description: '작년 봄 테니스 입문 수업을 들으며 스포츠 매장에서 구매한 윌슨 입문용 라켓입니다. 블랙·오렌지 계열 색상이고, 그립 사이즈는 성인 여성/손이 작은 분께 편한 1번입니다. 주 1회 정도만 실내 코트에서 사용해 프레임에 눈에 띄는 찍힘은 없고, 사용감이 적습니다. 최근 새 그립으로 교체해 미끄럽지 않고 바로 사용하실 수 있어요. 평일 저녁에는 필동·충무로역 근처, 주말에는 명동역 부근에서 직거래 희망합니다.', condition: '사용감 적음 · 그립 새것', tags: ['초보자 추천', '가벼움', '수업용'], imageTags: ['라켓 프레임 깨끗함', '그립 상태 양호'], reason: '예산 안에서 구매 가능하고, 가벼운 무게로 수업을 막 시작한 분에게 잘 맞아요.' },
  { id: 'racket-2', name: '요넥스 EZone 테니스 라켓', price: 48000, category: '스포츠', location: '성동구 성수동', uploadedAt: '1시간 전', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=85', description: '재작년 여름 동대문 테니스 전문점에서 구매한 요넥스 EZone 라켓입니다. 딥블루 색상의 100sq.in 헤드, 그립 사이즈 2번으로 초보자도 공을 맞히기 편한 모델이에요. 동호회 수업용으로만 사용했고 스트링은 지난 가을에 교체했습니다. 프레임 가장자리에 아주 옅은 생활 스크래치만 있으며, 전용 케이스도 함께 드립니다. 성수역·서울숲역 인근에서 평일 퇴근 후 또는 주말 낮 직거래 가능합니다.', condition: '좋음 · 케이스 포함', tags: ['초보자 추천', '넓은 헤드', '케이스 포함'], imageTags: ['프레임 스크래치 미미', '정품 케이스'], reason: '넓은 스윗스팟과 케이스 포함 구성이 첫 수업용으로 실용적이에요.' },
  { id: 'racket-3', name: '바볼랏 테니스 라켓 + 공', price: 35000, category: '스포츠', location: '마포구 연남동', uploadedAt: '3시간 전', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=85', description: '올해 초 중고로 들여와 주말 공원 연습용으로 사용한 바볼랏 라켓입니다. 화이트·블루 색상, 그립 사이즈 2번이며 가볍게 시작해 보실 분께 잘 맞아요. 프레임에는 사용에 따른 작은 스크래치가 있지만 균열이나 휨은 없고, 스트링도 끊어진 곳 없이 유지 중입니다. 연습용 테니스공 3개와 함께 드려 바로 사용 가능합니다. 연남동·홍대입구역 근처에서 거래하고, 시간 맞으면 합정역도 가능합니다.', condition: '보통 · 사용에는 문제 없음', tags: ['가성비', '연습 공 포함'], imageTags: ['프레임 사용감', '공 3개 포함'], reason: '가장 낮은 가격에 바로 연습을 시작할 수 있는 구성입니다.' },
  { id: 'table-1', name: '밝은 원목 접이식 테이블', price: 28000, category: '가구', location: '서대문구 연희동', uploadedAt: '5시간 전', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=85', description: '작년 이사하면서 이케아에서 구매한 밝은 원목색 접이식 테이블입니다. 펼쳤을 때 약 80×50cm, 높이 72cm라 노트북 작업이나 1~2인 식사용으로 알맞습니다. 자취방에서 창가 쪽에 두고 사용했고, 상판에 아주 옅은 생활 흔적 외에는 깨끗합니다. 접으면 틈새에 세워 보관할 수 있어 공간을 많이 차지하지 않아요. 연희동 자택 근처에서 직접 가져가실 분을 우선하며, 주말에는 신촌역 근처 전달도 가능합니다.', condition: '좋음 · 접이식', tags: ['밝은 색', '소형', '접이식'], imageTags: ['밝은 원목 상판', '접이식 다리'], reason: '공간을 아끼면서도 밝고 깔끔한 분위기를 만들기 좋아요.' },
  { id: 'bag-1', name: '심플 노트북 백팩 15인치', price: 38000, category: '패션잡화', location: '동작구 상도동', uploadedAt: '1일 전', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85', description: '작년 가을 온라인 공식몰에서 구매한 블랙 무광 소재 백팩입니다. 15인치 노트북 전용 쿠션 수납칸이 있고 A4 파일, 충전기, 물병을 나눠 넣기 좋은 포켓이 여러 개 있습니다. 출퇴근할 때 몇 차례만 사용해 바닥과 모서리 마모가 거의 없고 지퍼도 모두 부드럽게 작동합니다. 가로 약 30cm, 세로 약 43cm의 데일리 사이즈예요. 숭실대입구역·상도역 근처 직거래를 희망하며, 평일 저녁 거래가 편합니다.', condition: '새상품급 · 수납칸 많음', tags: ['노트북 수납', '미니멀', '출퇴근용'], imageTags: ['15인치 수납칸', '블랙 무광 소재'], reason: '노트북 보호 수납과 절제된 디자인이 출퇴근 용도에 잘 맞아요.' },
  { id: 'lamp-1', name: '무드등 겸용 스탠드', price: 18000, category: '디지털', location: '관악구 봉천동', uploadedAt: '2일 전', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85', description: '지난 겨울 전자제품 매장에서 구매한 LED 스탠드입니다. 화이트·실버 색상의 슬림한 디자인이며, 높이 약 40cm라 책상 위에 두기 좋습니다. 터치 버튼으로 밝기 단계와 주광색·전구색을 조절할 수 있어 공부할 때와 잠들기 전 모두 유용했어요. 사용 기간은 약 6개월이고 불빛 깜빡임이나 버튼 이상 없이 정상 작동 확인했습니다. 봉천역·서울대입구역 근처에서 거래 희망하며, 어댑터 함께 드립니다.', condition: '좋음 · 작동 확인', tags: ['자취방', '공간 절약', '밝기 조절'], imageTags: ['밝기 조절 버튼', '슬림한 받침'], reason: '작은 공간에서도 쓰기 좋고, 공부할 때 필요한 밝기를 조절할 수 있어요.' }
];

// 한 상품의 다섯 장면을 같은 5컷 생활사진 세트에서 가져옵니다.
const createProductPhotoSet = id => ['0%', '25%', '50%', '75%', '100%'].map(position => ({
  src: `assets/products/${id}/contact-sheet.png`,
  position: `${position} 50%`
}));
products.forEach(item => {
  item.images = createProductPhotoSet(item.id);
  item.image = item.images[0].src;
});

const profile = {
  '생활 패턴': ['대학교 수업', '자취 생활', '대중교통 이동'],
  '가격 선호': ['합리적 가격', '5만원 이하 선호', '오래 쓸 수 있는 상태'],
  '취향': ['밝고 깔끔한 디자인', '미니멀', '실용적인 수납'],
  '관심사': ['테니스 입문', '공부', '공간 정리']
};

const profileKeys = { lifestyle: '생활 패턴', price: '가격 선호', taste: '취향', interest: '관심사' };
const storage = {
  profile: 'carrot-profile', removed: 'carrot-removed-keywords', history: 'carrot-search-history', saved: 'carrot-saved-items'
};
const storedProfile = JSON.parse(localStorage.getItem(storage.profile) || 'null');
if (storedProfile) Object.values(profileKeys).forEach(key => { if (Array.isArray(storedProfile[key])) profile[key] = storedProfile[key]; });
let removedKeywords = JSON.parse(localStorage.getItem(storage.removed) || '[]');
let searchHistory = JSON.parse(localStorage.getItem(storage.history) || '[]');
let savedItemIds = JSON.parse(localStorage.getItem(storage.saved) || '[]');
let aiSearchMode = false;
let activeSearch = null;

function saveProfile() { localStorage.setItem(storage.profile, JSON.stringify(profile)); }
function classifyKeywords(query) {
  const q = query.toLowerCase();
  const candidates = [];
  if (/대학|대학교|교양|수업/.test(q)) candidates.push({ keyword: '대학교 수업', category: 'lifestyle' });
  if (/자취/.test(q)) candidates.push({ keyword: '자취 생활', category: 'lifestyle' });
  if (/대중교통|출퇴근/.test(q)) candidates.push({ keyword: '대중교통 이동', category: 'lifestyle' });
  if (/가성비|저렴|5만원|오만원/.test(q)) candidates.push({ keyword: '합리적 가격', category: 'price' });
  if (/미니멀|깔끔|심플/.test(q)) candidates.push({ keyword: '미니멀', category: 'taste' });
  if (/밝은 색|밝은색/.test(q)) candidates.push({ keyword: '밝고 깔끔한 디자인', category: 'taste' });
  if (/테니스|라켓/.test(q)) candidates.push({ keyword: '테니스', category: 'interest' });
  if (/캠핑/.test(q)) candidates.push({ keyword: '캠핑', category: 'interest' });
  if (/게임/.test(q)) candidates.push({ keyword: '게임', category: 'interest' });
  return candidates.filter(({ keyword, category }) => profileKeys[category] && !removedKeywords.includes(keyword));
}
function updateProfileFromSearch(query) {
  classifyKeywords(query).forEach(({ keyword, category }) => {
    const group = profile[profileKeys[category]];
    if (!group.includes(keyword)) group.push(keyword);
  });
  saveProfile();
}
function normalizeKeyword(value) { return value.trim().replace(/\s+/g, ' ').toLowerCase(); }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]); }
function classifyDirectKeyword(keyword) {
  const q = keyword.toLowerCase();
  if (/대학|대학교|교양|수업|자취|대중교통|출퇴근|직장/.test(q)) return 'lifestyle';
  if (/가성비|저렴|가격|만원|오래\s*쓸/.test(q)) return 'price';
  if (/미니멀|깔끔|심플|밝은\s*색|디자인/.test(q)) return 'taste';
  return 'interest';
}
function addDirectKeyword(rawKeyword) {
  const keyword = rawKeyword.trim().replace(/\s+/g, ' ');
  if (!keyword) return { ok: false, message: '추가할 키워드를 입력해 주세요.' };
  const category = classifyDirectKeyword(keyword);
  const group = profile[profileKeys[category]];
  if (group.some(item => normalizeKeyword(item) === normalizeKeyword(keyword))) return { ok: false, message: '이미 등록된 키워드예요.' };
  const removedIndex = removedKeywords.findIndex(item => normalizeKeyword(item) === normalizeKeyword(keyword));
  if (removedIndex >= 0) removedKeywords.splice(removedIndex, 1);
  group.push(keyword);
  localStorage.setItem(storage.removed, JSON.stringify(removedKeywords));
  saveProfile();
  return { ok: true, category };
}

const won = value => `${value.toLocaleString('ko-KR')}원`;
// 모든 관심상품 UI에서 동일한 외곽선과 비율을 유지하는 공통 하트 SVG입니다.
const heartIcon = () => '<svg class="heart-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.6c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.8 4.8 0 0 1 12 5.4a4.8 4.8 0 0 1 8.8 3.2Z"/></svg>';
const detailInfoIcon = type => {
  if (type === 'photo') return '<svg class="detail-info-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7.5"/><path d="M7.5 12.5 10.3 15l6.2-6"/></svg>';
  if (type === 'check') return '<svg class="detail-info-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6.5 12.5 3.5 3.5 7.5-8"/></svg>';
  return '<svg class="detail-info-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.5 20 19H4L12 4.5Z"/><path d="M12 9v4.5M12 16.5h.01"/></svg>';
};
const imageSource = image => typeof image === 'string' ? image : image.src;
const imagePosition = image => typeof image === 'string' ? '50% 50%' : image.position || '50% 50%';
const productTemplate = document.querySelector('#product-template');
const resultView = document.querySelector('#search-results');
const homeView = document.querySelector('#home');
const headerSearchForm = document.querySelector('#header-search-form');
const homeSearchSlot = document.querySelector('#home-search-slot');
let isSearched = false;

// 검색 결과는 홈 안에서 상품 목록 위에 표시해 기존 상품 컬렉션을 유지합니다.
homeView.insertBefore(resultView, homeView.querySelector('.home-collection'));
resultView.classList.remove('view');
resultView.hidden = true;

function setSearchLayout(searched) {
  isSearched = searched;
  const topbar = document.querySelector('.topbar');
  document.querySelector('#home-search-hero').hidden = searched;
  document.querySelector('#search-condition-summary').hidden = !searched;
  topbar.classList.toggle('search-active', searched);
  if (searched) topbar.insertBefore(headerSearchForm, document.querySelector('.market-actions'));
  else homeSearchSlot.append(headerSearchForm);
}
setSearchLayout(false);

function showView(view) {
  document.querySelectorAll('.view').forEach(section => section.classList.toggle('active', section.id === view));
  document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.view === view));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderProducts(target, items, ranked = false) {
  const root = document.querySelector(target);
  root.replaceChildren(...items.map((item, index) => {
    const node = productTemplate.content.cloneNode(true);
    const primaryImage = Array.isArray(item.images) && item.images.length ? item.images[0] : item.image;
    node.querySelector('.product-image').src = imageSource(primaryImage);
    node.querySelector('.product-image').style.objectPosition = imagePosition(primaryImage);
    node.querySelector('.product-image').alt = item.name;
    const decisions = [
      { key: 'recommend', label: '🟢 추천', reasons: ['✓ 예산 조건 충족', '✓ 초보자에게 적합한 스펙', '⚠ 그립 상태 추가 확인'] },
      { key: 'check', label: '🟡 확인 필요', reasons: ['✓ 예산 조건 충족', '✓ 수업용으로 적합', '⚠ 실제 사용 기간 확인'] },
      { key: 'wait', label: '🔵 기다리기', reasons: ['✓ 가격은 합리적', '○ 기본 구성 확인', '⚠ 더 좋은 상태의 매물을 기다릴 가치'] }
    ];
    const decision = decisions[index % decisions.length];
    const card = node.querySelector('.product-card');
    card.dataset.productId = item.id;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${item.name} 구매 판단 상세 보기`);
    node.querySelector('.rank').innerHTML = `<span class="judgment-badge ${decision.key}">${decision.label}</span>`;
    node.querySelector('.match').remove();
    node.querySelector('.category').remove();
    node.querySelector('.location').textContent = `${item.location} · ${item.uploadedAt}`;
    node.querySelector('.name').textContent = item.name;
    node.querySelector('.price').textContent = won(item.price);
    node.querySelector('.description').textContent = item.description;
    node.querySelector('.condition').textContent = item.condition;
    node.querySelector('.reason').textContent = item.reason;
    node.querySelector('.image-analysis').innerHTML = item.imageTags.map(tag => `<span>${tag}</span>`).join('');
    node.querySelector('.price').insertAdjacentElement('afterend', node.querySelector('.location'));
    const saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.className = 'card-save';
    const renderCardSave = () => {
      const isSaved = savedItemIds.includes(item.id);
      saveButton.classList.toggle('saved', isSaved);
      saveButton.setAttribute('aria-label', `${item.name} ${isSaved ? '저장됨' : '저장'}`);
      saveButton.innerHTML = heartIcon();
    };
    renderCardSave();
    saveButton.addEventListener('click', event => {
      event.stopPropagation();
      if (savedItemIds.includes(item.id)) savedItemIds = savedItemIds.filter(id => id !== item.id);
      else savedItemIds = [item.id, ...savedItemIds].slice(0, 4);
      localStorage.setItem(storage.saved, JSON.stringify(savedItemIds));
      renderHomeCollections();
      renderCardSave();
      showToast(savedItemIds.includes(item.id) ? '저장한 물품에 추가했어요.' : '저장을 취소했어요.');
    });
    card.querySelector('.product-image-wrap').append(saveButton);
    return node;
  }));
}

function openDetail(productId) {
  const item = products.find(product => product.id === productId);
  if (!item) return;
  const seller = sellerProfiles[item.id] || { name: '이웃 판매자', location: item.location, temperature: '40.0°C', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80' };
  const modal = document.createElement('div');
  modal.className = 'detail-modal';
  modal.innerHTML = `<article class="detail-dialog" role="dialog" aria-modal="true" aria-label="구매 판단 상세"><button class="modal-close" aria-label="상세 닫기">×</button><div class="eyebrow">PURCHASE DECISION</div><span class="judgment-badge recommend">🟢 추천</span><h2>${item.name}</h2><p class="decision-lead">초보자용 수업 라켓으로 적합한 편이에요. 다만 구매 전 몇 가지를 판매자에게 확인해 보세요.</p><div class="detail-grid"><section class="detail-section"><h3>추천 이유</h3><ul><li>예산 범위 안의 가격</li><li>초보자에게 적합한 구성</li><li>사진상 큰 외관 손상 없음</li></ul></section><section class="detail-section"><h3>확인할 점</h3><ul><li>그립 마모 정도</li><li>실제 사용 기간</li><li>프레임 내부 손상 여부</li></ul></section><section class="detail-section"><h3>EVIDENCE · 확인한 정보</h3><p>✓ 판매글: ${item.condition}<br>◐ 사진: ${item.imageTags.join(' · ')}<br>○ 판매자 주장: 수업용으로 사용 가능</p></section><section class="detail-section"><h3>UNCERTAINTY · 아직 모르는 정보</h3><p>사진과 판매글만으로는 내부 손상 여부와 정확한 사용 기간을 확인할 수 없습니다.</p></section><section class="detail-section question-box"><h3>판매자에게 물어볼 점</h3><button class="question-copy" type="button">안녕하세요. 라켓 구매를 고려하고 있는데, 실제 사용 기간과 그립의 마모 정도를 알 수 있을까요? 프레임에 금이 가거나 손상된 부분이 없는지도 궁금합니다.</button></section></div><div class="detail-actions"><button class="primary-action save-candidate" type="button">구매 후보로 저장</button><button class="secondary-action hold-item" type="button">보류하기</button></div></article>`;
  document.body.append(modal);
  const dialog = modal.querySelector('.detail-dialog');
  dialog.classList.add('detail-agent-layout');
  const closeButton = dialog.querySelector('.modal-close');
  const detailContent = document.createElement('div');
  detailContent.className = 'detail-agent-content';
  [...dialog.children].forEach(child => { if (child !== closeButton) detailContent.append(child); });
  const media = document.createElement('div');
  media.className = 'detail-agent-media';
  const images = Array.isArray(item.images) && item.images.length ? item.images : [item.image];
  let imageIndex = 0;
  media.innerHTML = `<div class="detail-breadcrumb">홈 › 중고거래 › ${item.category}</div><div class="product-carousel"><img src="${imageSource(images[imageIndex])}" style="object-position:${imagePosition(images[imageIndex])}" alt="${item.name}" />${images.length > 1 ? `<button class="carousel-arrow previous" type="button" aria-label="이전 이미지">←</button><button class="carousel-arrow next" type="button" aria-label="다음 이미지">→</button><div class="carousel-indicators" aria-label="상품 이미지 순서">${images.map((_, index) => `<span class="${index === 0 ? 'active' : ''}"></span>`).join('')}</div>` : ''}</div>`;
  dialog.append(media, detailContent, closeButton);
  if (images.length > 1) {
    const carouselImage = media.querySelector('.product-carousel img');
    const indicators = [...media.querySelectorAll('.carousel-indicators span')];
    const updateCarousel = () => {
      carouselImage.src = imageSource(images[imageIndex]);
      carouselImage.style.objectPosition = imagePosition(images[imageIndex]);
      indicators.forEach((indicator, index) => indicator.classList.toggle('active', index === imageIndex));
    };
    media.querySelector('.carousel-arrow.previous').addEventListener('click', () => { if (imageIndex > 0) { imageIndex -= 1; updateCarousel(); } });
    media.querySelector('.carousel-arrow.next').addEventListener('click', () => { if (imageIndex < images.length - 1) { imageIndex += 1; updateCarousel(); } });
    indicators.forEach((indicator, index) => indicator.addEventListener('click', () => { imageIndex = index; updateCarousel(); }));
  }
  media.insertAdjacentHTML('beforeend', `<section class="seller-profile" aria-label="판매자 정보"><img class="seller-avatar" src="${seller.image}" alt="${seller.name} 프로필" /><div class="seller-identity"><b>${seller.name}</b><span>${seller.location}</span></div><div class="seller-temperature"><b>${seller.temperature}</b><span>매너온도</span></div></section>`);
  detailContent.querySelector('.eyebrow').remove();
  detailContent.querySelector('.decision-lead').insertAdjacentHTML('beforebegin', `<div class="detail-basic-meta">${item.category} · ${item.location}</div>`);
  const sellerDescription = detailContent.querySelector('.decision-lead');
  sellerDescription.className = 'seller-description';
  sellerDescription.textContent = `${item.description} ${item.condition}`;
  detailContent.querySelectorAll('.detail-section').forEach(section => {
    const heading = section.querySelector('h3')?.textContent || '';
    if (/^(EVIDENCE|UNCERTAINTY)/.test(heading)) section.remove();
  });
  const [recommendationSection, checkSection] = detailContent.querySelectorAll('.detail-grid > .detail-section');
  recommendationSection.querySelectorAll('li').forEach((item, index) => {
    const text = item.textContent;
    item.className = 'detail-reason-item';
    item.innerHTML = `${detailInfoIcon(index === 2 ? 'photo' : 'check')}<span>${escapeHtml(text)}</span>`;
  });
  checkSection.querySelectorAll('li').forEach(item => {
    const text = item.textContent;
    item.className = 'detail-check-item';
    item.innerHTML = `${detailInfoIcon('warning')}<span>${escapeHtml(text)}</span>`;
  });
  const questionButton = modal.querySelector('.question-copy');
  const questionMessage = document.createElement('textarea');
  questionMessage.className = 'question-message';
  questionMessage.value = questionButton.textContent.trim();
  questionMessage.setAttribute('aria-label', '판매자에게 보낼 문자 내용');
  questionMessage.style.cssText = 'width:100%;min-height:72px;resize:vertical;border:1px solid #ff6f32;border-radius:8px;padding:10px;font:12px/1.6 Noto Sans KR;color:#555;background:#fff';
  questionButton.replaceWith(questionMessage);
  const questionBox = modal.querySelector('.question-box');
  questionBox.querySelector('h3').textContent = '판매자에게 물어보기';
  modal.querySelector('.hold-item').remove();
  modal.querySelector('.save-candidate').remove();
  modal.querySelector('.detail-actions').remove();
  const messageButton = document.createElement('button');
  messageButton.type = 'button';
  messageButton.className = 'secondary-action send-message';
  messageButton.textContent = '판매자에게 문자 보내기';
  const saveButton = document.createElement('button');
  saveButton.type = 'button';
  saveButton.className = 'detail-save-button';
  const renderDetailSave = () => {
    const isSaved = savedItemIds.includes(item.id);
    saveButton.classList.toggle('saved', isSaved);
    saveButton.innerHTML = heartIcon();
    saveButton.setAttribute('aria-label', isSaved ? '저장됨' : '저장');
  };
  renderDetailSave();
  const aiChatButton = document.createElement('button');
  aiChatButton.type = 'button';
  aiChatButton.className = 'detail-chat-button';
  aiChatButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5c-1.2 0-2.4-.3-3.4-.8L4 20l1.8-4.4A7.5 7.5 0 1 1 20 11.5Z"/><circle cx="9" cy="11.5" r=".8"/><circle cx="12.5" cy="11.5" r=".8"/><circle cx="16" cy="11.5" r=".8"/></svg>';
  aiChatButton.setAttribute('aria-label', 'AI와 채팅');
  const shareButton = document.createElement('button');
  shareButton.type = 'button';
  shareButton.className = 'detail-share-button';
  shareButton.setAttribute('aria-label', '상품 공유');
  shareButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V3m0 0-4 4m4-4 4 4M5 12v7h14v-7"/></svg>';
  const questionActions = document.createElement('div');
  questionActions.className = 'question-actions';
  questionActions.append(shareButton, saveButton, aiChatButton);
  const messageFooter = document.createElement('div');
  messageFooter.className = 'message-footer';
  messageFooter.append(questionActions, messageButton);
  detailContent.querySelector('.detail-grid').insertAdjacentElement('afterend', questionBox);
  questionBox.insertAdjacentElement('afterend', messageFooter);
  const closeModal = () => { modal.remove(); };
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  messageButton.addEventListener('click', () => {
    const message = questionMessage.value.trim();
    if (!message) { showToast('판매자에게 보낼 메시지를 입력해 주세요.'); return; }
    messageButton.textContent = '메시지 보냄';
    messageButton.disabled = true;
    showToast('Demo MVP: 메시지 전송 완료로 표시했어요.');
  });
  saveButton.addEventListener('click', () => {
    if (savedItemIds.includes(item.id)) savedItemIds = savedItemIds.filter(id => id !== item.id);
    else savedItemIds = [item.id, ...savedItemIds].slice(0, 4);
    localStorage.setItem(storage.saved, JSON.stringify(savedItemIds));
    renderHomeCollections();
    renderDetailSave();
    showToast(savedItemIds.includes(item.id) ? '저장한 상품에 추가했어요.' : '저장을 취소했어요.');
  });
  aiChatButton.addEventListener('click', () => showToast('추천 도우미에서 이 상품에 대해 질문해 보세요.'));
  shareButton.addEventListener('click', () => showToast('상품 링크를 공유할 수 있어요.'));
  modal.querySelectorAll('.feedback-row button').forEach(button => button.addEventListener('click', () => { modal.querySelector('.feedback-note').style.display = 'block'; }));
}

function showToast(message) {
  document.querySelector('.toast')?.remove();
  const toast = document.createElement('div'); toast.className = 'toast'; toast.textContent = message; document.body.append(toast);
  setTimeout(() => toast.remove(), 2200);
}

function detectSearch(query) {
  const q = query.toLowerCase();
  if (/라켓|테니스/.test(q)) return { label: '테니스 입문 라켓', chips: [['용도', '대학교 테니스 수업'], ['예산', '5만원 이하'], ['사용자', '초보자'], ['우선순위', '가벼움 · 상태']], items: products.filter(p => p.id.startsWith('racket')) };
  if (/테이블|가구/.test(q)) return { label: '작은 공간용 테이블', chips: [['용도', '자취방'], ['공간', '작은 크기'], ['디자인', '밝고 깔끔함'], ['우선순위', '접이식']], items: [products.find(p => p.id === 'table-1'), products.find(p => p.id === 'lamp-1'), products.find(p => p.id === 'bag-1')] };
  if (/가방|노트북|백팩/.test(q)) return { label: '노트북 수납 가방', chips: [['용도', '출퇴근'], ['수납', '노트북 가능'], ['스타일', '성별 구분 없는 디자인'], ['우선순위', '실용성']], items: [products.find(p => p.id === 'bag-1'), products.find(p => p.id === 'racket-2'), products.find(p => p.id === 'table-1')] };
  return { label: '맞춤 중고 상품', chips: [['검색 의도', '자연어 조건 분석'], ['예산', '합리적 가격'], ['상태', '오래 쓸 수 있음'], ['우선순위', '생활 목적']], items: products.slice(0, 3) };
}

function searchByKeyword(query) {
  const keywords = (normalizeKeyword(query).match(/[가-힣a-z0-9]+/g) || []).filter(keyword => keyword.length >= 2);
  return products.filter(item => {
    const text = normalizeKeyword([item.name, item.category, item.description, item.condition, ...(item.tags || [])].join(' '));
    return keywords.some(keyword => text.includes(keyword));
  });
}

function filteredSearchItems() {
  if (!activeSearch) return [];
  return activeSearch.baseItems.filter(item => activeSearch.chips.every(([key, value]) => {
    if (key === '예산') {
      const amount = Number(value.replace(/[^0-9]/g, ''));
      return !amount || item.price <= (amount < 1000 ? amount * 10000 : amount);
    }
    if (key === '상태') return !/좋음/.test(value) || /좋음|새상품급/.test(item.condition);
    return true;
  }));
}

function renderSearchExperience() {
  if (!activeSearch) return;
  const { query, result, useAi, chips } = activeSearch;
  const analysisCard = document.querySelector('#analysis-card');
  const aiChatbot = document.querySelector('#ai-chatbot');
  const resultSummary = document.querySelector('#result-summary');
  if (resultSummary) resultSummary.textContent = result.label;
  const resultTitle = document.querySelector('.result-title h2');
  if (resultTitle) resultTitle.textContent = useAi ? '이 조건에 잘 맞는 상품' : `“${query}” 검색 결과`;
  const resultDescription = document.querySelector('.result-title p');
  if (resultDescription) resultDescription.textContent = useAi ? '조건을 더 추가하거나 바꾸면 결과가 바로 업데이트됩니다.' : '검색어와 관련된 상품을 보여드려요.';
  analysisCard.innerHTML = `<div class="analysis-intro"><b>검색 의도를<br>이해했어요</b><p>기본 목적, 핵심 조건을 함께 반영했습니다.</p></div><div class="condition-list editable-conditions">${chips.map(([key, value], index) => `<button type="button" class="condition-chip" data-condition-index="${index}"><b>${key}</b>${value} <span aria-label="조건 삭제">×</span></button>`).join('')}</div>${useAi ? '<div class="refinement-actions"><button type="button" data-refine="가격 낮춰줘">가격 낮춰줘</button><button type="button" data-refine="상태 좋은 것만">상태 좋은 것만</button><button type="button" data-refine="더 많이 보여줘">더 많이 보여줘</button></div>' : ''}`;
  if (useAi) {
    aiChatbot.hidden = false;
    aiChatbot.style.cssText = 'position:static;right:auto;bottom:auto;z-index:auto;width:100%;font-family:Noto Sans KR,sans-serif;margin-top:14px';
    document.querySelector('#chat-panel').hidden = false;
    document.querySelector('#chat-panel').style.width = '100%';
    document.querySelector('#chat-toggle').hidden = true;
    analysisCard.append(aiChatbot);
  } else {
    aiChatbot.hidden = true;
  }
  const items = filteredSearchItems();
  const matchedItems = items.length ? items : activeSearch.baseItems;
  if (!matchedItems.length) {
    document.querySelector('#search-product-grid').innerHTML = '<p class="search-empty">검색 결과가 없어요. 다른 검색어로 다시 찾아보세요.</p>';
    return;
  }
  const searchItems = matchedItems.length >= 8
    ? matchedItems
    : Array.from({ length: 8 }, (_, index) => matchedItems[index % matchedItems.length]);
  renderProducts('#search-product-grid', searchItems);
}

function applySearchRefinement(message) {
  if (!activeSearch || !activeSearch.useAi) return;
  const price = message.match(/(\d+)\s*만\s*원/);
  if (price) {
    activeSearch.chips = activeSearch.chips.filter(([key]) => key !== '예산');
    activeSearch.chips.push(['예산', `${price[1]}만원 이하`]);
  }
  if (/상태.*좋|좋은.*상태/.test(message)) {
    activeSearch.chips = activeSearch.chips.filter(([key]) => key !== '상태');
    activeSearch.chips.push(['상태', '좋은 제품']);
  }
  if (/더 많이/.test(message)) activeSearch.baseItems = products;
  renderSearchExperience();
}

function runSearch(query, showResults = true, useAi = true) {
  const result = useAi ? detectSearch(query) : { label: query, chips: [], items: searchByKeyword(query) };
  activeSearch = { query, result, useAi, chips: result.chips.map(([key, value]) => [key, value]), baseItems: result.items };
  if (showResults) {
    if (useAi) updateProfileFromSearch(query);
    searchHistory = [{ query, itemIds: result.items.map(item => item.id) }, ...searchHistory.filter(entry => entry.query !== query)].slice(0, 8);
    localStorage.setItem(storage.history, JSON.stringify(searchHistory));
    renderProfile();
    renderHomeCollections();
  }
  renderSearchExperience();
  if (showResults) {
    resultView.hidden = false;
    resultView.classList.toggle('ai-search-active', useAi);
    setSearchLayout(true);
    showView('home');
  }
}

function renderProfile() {
  document.querySelector('#profile-summary').innerHTML = `<div class="profile-icon">선</div><div><h3>김선규님의 컨텍스트가 추천에 반영되고 있어요</h3><p>${Object.values(profile).flat().slice(0, 4).join(' · ')} 외 ${Object.values(profile).flat().length - 4}가지</p></div>`;
  const editor = document.querySelector('#profile-form');
  editor.innerHTML = `<section class="profile-keyword-entry"><h3>직접 키워드 입력하기</h3><div class="keyword-input-row"><span aria-hidden="true">⌕</span><input id="profile-keyword-input" autocomplete="off" placeholder="예) 테니스 라켓, 자취방 가구, 아이패드, 캠핑용품 등 관심 키워드를 입력해 주세요." aria-label="관심 키워드 직접 입력" /><button id="profile-keyword-add" type="button">추가</button></div><p class="keyword-help">입력한 키워드는 자동으로 분류되어 개인화 추천에 반영됩니다.</p><p id="keyword-error" class="keyword-error" role="alert"></p></section>` + Object.entries(profile).map(([title, tags]) => `<section class="profile-group"><h3>${title}</h3><div class="tag-editor">${tags.map(tag => `<button type="button" class="editable-tag selected" data-category="${title}" data-keyword="${escapeHtml(tag)}" aria-label="${escapeHtml(tag)} 삭제">${escapeHtml(tag)} <b aria-hidden="true">×</b></button>`).join('') || '<span class="empty-tags">검색 또는 직접 입력으로 키워드를 추가해 주세요.</span>'}</div></section>`).join('') + '<button class="profile-save" type="submit">변경 사항 저장하기</button><p class="save-note">저장했어요. 다음 추천부터 반영됩니다.</p>';
}

function renderEmpty(target, text) {
  document.querySelector(target).innerHTML = `<article class="product-card" style="grid-column:1/-1;padding:24px;color:#72766f;font:13px 'Noto Sans KR'">${text}</article>`;
}
function renderHomeCollections() {
  const picks = Array.from({ length: 12 }, (_, index) => products[index % products.length]);
  renderProducts('#recent-product-grid', picks);
  if (savedItemIds.length) renderProducts('#saved-product-grid', savedItemIds.slice(0, 4).map(id => products.find(item => item.id === id)).filter(Boolean));
  else renderEmpty('#saved-product-grid', '아직 저장한 상품이 없어요.');
  renderSavedPage();
}
function renderSavedPage() {
  const items = savedItemIds.map(id => products.find(item => item.id === id)).filter(Boolean);
  if (items.length) renderProducts('#saved-page-grid', items);
  else renderEmpty('#saved-page-grid', '아직 저장한 상품이 없어요. 상품 카드의 저장 버튼으로 관심상품을 저장해 보세요.');
}

document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
  if (button.dataset.view === 'home') {
    resultView.hidden = true;
    setSearchLayout(false);
  }
  showView(button.dataset.view);
}));
document.querySelector('.brand').addEventListener('click', event => {
  event.preventDefault();
  history.replaceState(null, '', '#home');
  resultView.hidden = true;
  setSearchLayout(false);
  showView('home');
});
document.querySelectorAll('.category-nav button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.category-nav button').forEach(item => item.classList.toggle('active', item === button));
  showToast(`${button.textContent} 카테고리를 보고 있어요.`);
}));
document.querySelectorAll('.location-action').forEach(button => button.addEventListener('click', () => showToast('현재 지역은 중구 필동이에요.')));
document.querySelectorAll('.filter-bar button:not(.location-action)').forEach(button => button.addEventListener('click', () => showToast(`${button.textContent.replace(' ▾', '')} 필터는 MVP 화면입니다.`)));

function submitCurrentSearch() {
  const input = document.querySelector('#header-search-input');
  if (!input.value.trim()) { input.focus(); return; }
  runSearch(input.value.trim(), true, aiSearchMode);
  document.querySelector('#search-history').classList.remove('visible');
}
document.querySelector('#header-search-form').addEventListener('submit', event => {
  event.preventDefault();
  submitCurrentSearch();
});
document.querySelector('#header-search-form button[type="submit"]').addEventListener('click', event => {
  event.preventDefault();
  submitCurrentSearch();
});
function renderSearchHistory() {
  const panel = document.querySelector('#search-history');
  panel.innerHTML = searchHistory.map(entry => `<div class="history-row"><button class="history-item" type="button" data-query="${escapeHtml(entry.query)}"><span class="history-arrow" aria-hidden="true">↻</span><span>${escapeHtml(entry.query)}</span></button><button class="history-remove" type="button" data-query="${escapeHtml(entry.query)}" aria-label="${escapeHtml(entry.query)} 삭제">×</button></div>`).join('');
}
const headerSearchInput = document.querySelector('#header-search-input');
const searchHistoryPanel = document.querySelector('#search-history');
headerSearchInput.addEventListener('focus', () => { renderSearchHistory(); searchHistoryPanel.classList.add('visible'); });
headerSearchInput.addEventListener('keydown', event => { if (event.key === 'Escape') searchHistoryPanel.classList.remove('visible'); });
searchHistoryPanel.addEventListener('click', event => {
  const removeButton = event.target.closest('.history-remove');
  if (removeButton) {
    event.preventDefault();
    event.stopPropagation();
    searchHistory = searchHistory.filter(entry => entry.query !== removeButton.dataset.query);
    localStorage.setItem(storage.history, JSON.stringify(searchHistory));
    renderSearchHistory();
    return;
  }
  const historyItem = event.target.closest('.history-item');
  if (historyItem) { headerSearchInput.value = historyItem.dataset.query; runSearch(historyItem.dataset.query, true, aiSearchMode); searchHistoryPanel.classList.remove('visible'); }
});
document.querySelector('#search-mode-toggle').addEventListener('click', event => {
  aiSearchMode = !aiSearchMode;
  event.currentTarget.textContent = aiSearchMode ? 'ON' : 'OFF';
  event.currentTarget.classList.toggle('on', aiSearchMode);
  event.currentTarget.setAttribute('aria-pressed', String(aiSearchMode));
  headerSearchInput.placeholder = aiSearchMode ? '원하는 조건을 자연스럽게 말해보세요' : '찾고 싶은 물건을 검색해보세요';
});
document.addEventListener('click', event => { if (!event.target.closest('#header-search-form')) searchHistoryPanel.classList.remove('visible'); });
document.querySelectorAll('[data-query]').forEach(button => button.addEventListener('click', () => {
  headerSearchInput.value = button.dataset.query;
  runSearch(button.dataset.query, true, aiSearchMode);
}));
document.querySelector('#search-product-grid').addEventListener('click', event => {
  const card = event.target.closest('.product-card');
  if (card) openDetail(card.dataset.productId);
});
document.querySelector('#search-product-grid').addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') { const card = event.target.closest('.product-card'); if (card) { event.preventDefault(); openDetail(card.dataset.productId); } }
});
document.querySelector('#analysis-card').addEventListener('click', event => {
  const chip = event.target.closest('[data-condition-index]');
  if (chip && activeSearch) {
    activeSearch.chips.splice(Number(chip.dataset.conditionIndex), 1);
    renderSearchExperience();
    return;
  }
  const refine = event.target.closest('[data-refine]');
  if (refine) {
    applySearchRefinement(refine.dataset.refine);
    showToast('검색 조건을 반영했어요.');
  }
});
['#recent-product-grid', '#saved-product-grid', '#saved-page-grid', '#preview-product-grid', '#personal-product-grid'].forEach(selector => {
  const grid = document.querySelector(selector);
  if (!grid) return;
  grid.addEventListener('click', event => {
    const card = event.target.closest('.product-card[data-product-id]');
    if (card) openDetail(card.dataset.productId, ['#recent-product-grid', '#saved-product-grid', '#saved-page-grid'].includes(selector));
  });
  grid.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      const card = event.target.closest('.product-card[data-product-id]');
      if (card) { event.preventDefault(); openDetail(card.dataset.productId, ['#recent-product-grid', '#saved-product-grid', '#saved-page-grid'].includes(selector)); }
    }
  });
});
document.querySelector('#profile-form').addEventListener('click', event => {
  if (event.target.id === 'profile-keyword-add') {
    const input = document.querySelector('#profile-keyword-input');
    const outcome = addDirectKeyword(input.value);
    const message = document.querySelector('#keyword-error');
    if (!outcome.ok) { message.textContent = outcome.message; message.style.display = 'block'; return; }
    renderProfile();
    renderHomeCollections();
    showToast(`${profileKeys[outcome.category]}에 키워드를 추가했어요.`);
    return;
  }
  const chip = event.target.closest('.editable-tag');
  if (!chip) return;
  const category = chip.dataset.category;
  const keyword = chip.dataset.keyword;
  profile[category] = profile[category].filter(tag => tag !== keyword);
  if (!removedKeywords.includes(keyword)) removedKeywords.push(keyword);
  localStorage.setItem(storage.removed, JSON.stringify(removedKeywords));
  saveProfile();
  renderProfile();
  renderHomeCollections();
});
document.querySelector('#profile-form').addEventListener('keydown', event => {
  if (event.target.id !== 'profile-keyword-input' || event.key !== 'Enter') return;
  event.preventDefault();
  document.querySelector('#profile-keyword-add').click();
});
document.querySelector('#profile-form').addEventListener('submit', event => {
  event.preventDefault();
  saveProfile();
  document.querySelector('.save-note').style.display = 'block';
});

const chatPanel = document.querySelector('#chat-panel');
const chatToggle = document.querySelector('#chat-toggle');
const chatMessages = document.querySelector('#chat-messages');
function toggleChat(open) {
  chatPanel.hidden = !open;
  chatToggle.setAttribute('aria-expanded', String(open));
}
chatToggle.addEventListener('click', () => toggleChat(chatPanel.hidden));
document.querySelector('#chat-close').addEventListener('click', () => toggleChat(false));
document.querySelector('#chat-form').addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('#chat-input');
  const message = input.value.trim();
  if (!message) return;
  applySearchRefinement(message);
  chatMessages.insertAdjacentHTML('beforeend', `<p style="margin:0 0 10px 40px;padding:9px 11px;background:#fff0e9;border-radius:10px;text-align:right">${message.replace(/[<>&]/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[char])}</p><p style="margin:0 0 10px;padding:9px 11px;background:#f2f5f1;border-radius:10px">알겠어요. 말씀하신 조건을 우선으로 반영해 다시 살펴볼게요. 현재 추천 상품 중에서는 1위 상품이 가장 잘 맞습니다.</p>`);
  input.value = '';
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

renderProducts('#personal-product-grid', [products[3], products[4], products[0], products[5], products[1], products[2]]);
renderProfile();
renderHomeCollections();
runSearch('', false);
