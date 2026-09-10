const products = [
  { id: 'racket-1', name: '윌슨 초보용 테니스 라켓', price: 42000, category: '스포츠', location: '중구 필동', image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=85', description: '가볍고 다루기 편한 입문용 라켓입니다.', condition: '사용감 적음 · 그립 새것', tags: ['초보자 추천', '가벼움', '수업용'], imageTags: ['라켓 프레임 깨끗함', '그립 상태 양호'], reason: '예산 안에서 구매 가능하고, 가벼운 무게로 수업을 막 시작한 분에게 잘 맞아요.' },
  { id: 'racket-2', name: '요넥스 EZone 테니스 라켓', price: 48000, category: '스포츠', location: '성동구 성수동', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=85', description: '헤드가 넓어 공을 맞히기 쉬운 모델이에요.', condition: '좋음 · 케이스 포함', tags: ['초보자 추천', '넓은 헤드', '케이스 포함'], imageTags: ['프레임 스크래치 미미', '정품 케이스'], reason: '넓은 스윗스팟과 케이스 포함 구성이 첫 수업용으로 실용적이에요.' },
  { id: 'racket-3', name: '바볼랏 테니스 라켓 + 공', price: 35000, category: '스포츠', location: '마포구 연남동', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=85', description: '연습용 공과 함께 드립니다.', condition: '보통 · 사용에는 문제 없음', tags: ['가성비', '연습 공 포함'], imageTags: ['프레임 사용감', '공 3개 포함'], reason: '가장 낮은 가격에 바로 연습을 시작할 수 있는 구성입니다.' },
  { id: 'table-1', name: '밝은 원목 접이식 테이블', price: 28000, category: '가구', location: '서대문구 연희동', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=85', description: '작은 방에도 잘 어울리는 컴팩트한 테이블.', condition: '좋음 · 접이식', tags: ['밝은 색', '소형', '접이식'], imageTags: ['밝은 원목 상판', '접이식 다리'], reason: '공간을 아끼면서도 밝고 깔끔한 분위기를 만들기 좋아요.' },
  { id: 'bag-1', name: '심플 노트북 백팩 15인치', price: 38000, category: '패션잡화', location: '동작구 상도동', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85', description: '노트북 전용 수납과 넉넉한 내부 공간.', condition: '새상품급 · 수납칸 많음', tags: ['노트북 수납', '미니멀', '출퇴근용'], imageTags: ['15인치 수납칸', '블랙 무광 소재'], reason: '노트북 보호 수납과 절제된 디자인이 출퇴근 용도에 잘 맞아요.' },
  { id: 'lamp-1', name: '무드등 겸용 스탠드', price: 18000, category: '디지털', location: '관악구 봉천동', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85', description: '밝기와 색온도 조절이 가능한 LED 조명.', condition: '좋음 · 작동 확인', tags: ['자취방', '공간 절약', '밝기 조절'], imageTags: ['밝기 조절 버튼', '슬림한 받침'], reason: '작은 공간에서도 쓰기 좋고, 공부할 때 필요한 밝기를 조절할 수 있어요.' }
];

const profile = {
  '생활 패턴': ['대학교 수업', '자취 생활', '대중교통 이동'],
  '가격 선호': ['합리적 가격', '5만원 이하 선호', '오래 쓸 수 있는 상태'],
  '취향': ['밝고 깔끔한 디자인', '미니멀', '실용적인 수납'],
  '관심사': ['테니스 입문', '공부', '공간 정리']
};

const won = value => `${value.toLocaleString('ko-KR')}원`;
const productTemplate = document.querySelector('#product-template');
const resultView = document.querySelector('#search-results');
const homeView = document.querySelector('#home');
const missionView = document.createElement('section');
missionView.id = 'mission';
missionView.className = 'view mission-view';
let activeQuery = '';

// 검색 결과를 홈과 분리된 독립 화면으로 이동합니다.
homeView.insertAdjacentElement('afterend', resultView);
resultView.id = 'search';
resultView.classList.add('view');
homeView.insertAdjacentElement('afterend', missionView);

function showView(view) {
  document.querySelectorAll('.view').forEach(section => section.classList.toggle('active', section.id === view));
  document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.view === view));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderProducts(target, items, ranked = false) {
  const root = document.querySelector(target);
  root.replaceChildren(...items.map((item, index) => {
    const node = productTemplate.content.cloneNode(true);
    node.querySelector('.product-image').src = item.image;
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
    node.querySelector('.rank').innerHTML = ranked ? `<span class="judgment-badge ${decision.key}">${decision.label}</span>` : item.category;
    node.querySelector('.match').textContent = ranked ? `${96 - index * 6}% 일치` : '추천';
    node.querySelector('.category').textContent = item.category;
    node.querySelector('.location').textContent = item.location;
    node.querySelector('.name').textContent = item.name;
    node.querySelector('.price').textContent = won(item.price);
    node.querySelector('.description').textContent = item.description;
    node.querySelector('.condition').textContent = item.condition;
    node.querySelector('.reason').textContent = item.reason;
    if (ranked) card.querySelector('.product-content').insertAdjacentHTML('afterbegin', `<div class="decision-reasons"><strong>구매 판단</strong>${decision.reasons.join('<br>')}</div>`);
    node.querySelector('.image-analysis').innerHTML = item.imageTags.map(tag => `<span>${tag}</span>`).join('');
    return node;
  }));
}

function startMission(query) {
  const result = detectSearch(query);
  activeQuery = query;
  missionView.innerHTML = `<article class="mission-card"><div class="eyebrow">PURCHASE MISSION</div><h1>구매 조건을 정리했어요</h1><p>제안된 조건을 확인하거나 직접 바꾼 후 후보 매물을 찾아보세요.</p><div class="mission-grid">${result.chips.map(([key, value]) => `<label class="mission-item"><b>${key}</b><input value="${value}" aria-label="${key} 조건" /></label>`).join('')}</div><div class="mission-list"><b>필수 조건</b><br>✓ 구매 목적에 적합 &nbsp; ✓ 예산 범위 충족<br><br><b>선호 조건</b><br>○ 상태가 좋은 제품 &nbsp; ○ 가까운 매물 우선</div><div class="mission-actions"><button id="mission-edit" class="secondary-action" type="button">조건 수정 완료</button><button id="mission-search" class="primary-action" type="button">이 조건으로 검색 →</button></div></article>`;
  showView('mission');
}

function openDetail(productId) {
  const item = products.find(product => product.id === productId);
  if (!item) return;
  const modal = document.createElement('div');
  modal.className = 'detail-modal';
  modal.innerHTML = `<article class="detail-dialog" role="dialog" aria-modal="true" aria-label="구매 판단 상세"><button class="modal-close" aria-label="상세 닫기">×</button><div class="eyebrow">PURCHASE DECISION</div><span class="judgment-badge recommend">🟢 추천</span><h2>${item.name}</h2><p class="decision-lead">초보자용 수업 라켓으로 적합한 편이에요. 다만 구매 전 몇 가지를 판매자에게 확인해 보세요.</p><div class="detail-grid"><section class="detail-section"><h3>WHY · 추천하는 이유</h3><ul><li>✓ 예산 범위 안의 가격</li><li>✓ 초보자에게 적합한 구성</li><li>◐ 사진상 큰 외관 손상 없음</li></ul></section><section class="detail-section"><h3>CHECK · 구매 전 확인할 것</h3><ul><li>⚠ 그립 마모 정도</li><li>⚠ 실제 사용 기간</li><li>⚠ 프레임 내부 손상 여부</li></ul></section><section class="detail-section"><h3>EVIDENCE · 확인한 정보</h3><p>✓ 판매글: ${item.condition}<br>◐ 사진: ${item.imageTags.join(' · ')}<br>○ 판매자 주장: 수업용으로 사용 가능</p></section><section class="detail-section"><h3>UNCERTAINTY · 아직 모르는 정보</h3><p>사진과 판매글만으로는 내부 손상 여부와 정확한 사용 기간을 확인할 수 없습니다.</p></section><section class="detail-section question-box"><h3>판매자에게 물어보기</h3><button class="question-copy" type="button">안녕하세요. 라켓 구매를 고려하고 있는데, 실제 사용 기간과 그립의 마모 정도를 알 수 있을까요? 프레임에 금이 가거나 손상된 부분이 없는지도 궁금합니다.</button></section></div><div class="detail-actions"><button class="primary-action save-candidate" type="button">구매 후보로 저장</button><button class="secondary-action hold-item" type="button">보류하기</button></div><div><p style="font-size:13px;margin:19px 0 8px"><b>이 추천이 나에게 맞았나요?</b></p><div class="feedback-row"><button>너무 비싸요</button><button>조건이 달라요</button><button>상태가 아쉬워요</button><button>너무 무거워요</button><button>좋아요</button><button>관심 있어요</button></div><p class="feedback-note">다음 추천에 반영할게요.</p></div></article>`;
  document.body.append(modal);
  modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', event => { if (event.target === modal) modal.remove(); });
  modal.querySelector('.question-copy').addEventListener('click', event => { navigator.clipboard?.writeText(event.currentTarget.textContent.trim()); showToast('판매자 질문을 복사했어요.'); });
  modal.querySelector('.save-candidate').addEventListener('click', () => showToast('구매 후보로 저장했어요.'));
  modal.querySelector('.hold-item').addEventListener('click', () => showToast('보류 목록에 담았어요.'));
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

function runSearch(query, showResults = true) {
  const result = detectSearch(query);
  document.querySelector('#result-summary').textContent = result.label;
  let summary = resultView.querySelector('.purchase-summary');
  if (!summary) { summary = document.createElement('div'); summary.className = 'purchase-summary'; resultView.querySelector('.result-navigation').insertAdjacentElement('afterend', summary); }
  summary.innerHTML = result.chips.map(([key, value]) => `<span>${key}: ${value}</span>`).join('') + '<span>개인화: ON</span>';
  document.querySelector('#analysis-card').innerHTML = `<div class="analysis-intro"><b>검색 의도를<br>이해했어요</b><p>가격, 목적, 취향을 함께 반영했습니다.</p></div><div class="condition-list">${result.chips.map(([key, value]) => `<div class="condition-chip"><b>${key}</b>${value}</div>`).join('')}</div>`;
  renderProducts('#search-product-grid', result.items, true);
  if (showResults) showView('search');
}

function renderProfile() {
  document.querySelector('#profile-summary').innerHTML = `<div class="profile-icon">선</div><div><h3>김선규님의 컨텍스트가 추천에 반영되고 있어요</h3><p>${Object.values(profile).flat().slice(0, 4).join(' · ')} 외 ${Object.values(profile).flat().length - 4}가지</p></div>`;
  const editor = document.querySelector('#profile-form');
  editor.innerHTML = Object.entries(profile).map(([title, tags]) => `<section class="profile-group"><h3>${title}</h3><div class="tag-editor">${tags.map(tag => `<button type="button" class="editable-tag selected">${tag}</button>`).join('')}</div></section>`).join('') + '<button class="profile-save" type="submit">변경 사항 저장하기</button><p class="save-note">저장했어요. 다음 추천부터 반영됩니다.</p>';
}

document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
  showView(button.dataset.view);
}));

document.querySelector('#search-form').addEventListener('submit', event => {
  event.preventDefault();
  startMission(document.querySelector('#search-input').value.trim());
});
document.querySelectorAll('[data-query]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#search-input').value = button.dataset.query;
  startMission(button.dataset.query);
}));
missionView.addEventListener('click', event => {
  if (event.target.id === 'mission-edit') showToast('조건을 수정했어요. 검색하면 반영됩니다.');
  if (event.target.id === 'mission-search') runSearch(activeQuery);
});
document.querySelector('#search-product-grid').addEventListener('click', event => {
  const card = event.target.closest('.product-card');
  if (card) openDetail(card.dataset.productId);
});
document.querySelector('#search-product-grid').addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') { const card = event.target.closest('.product-card'); if (card) { event.preventDefault(); openDetail(card.dataset.productId); } }
});
document.querySelector('#profile-form').addEventListener('click', event => {
  if (event.target.matches('.editable-tag')) event.target.classList.toggle('selected');
});
document.querySelector('#profile-form').addEventListener('submit', event => {
  event.preventDefault();
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
  chatMessages.insertAdjacentHTML('beforeend', `<p style="margin:0 0 10px 40px;padding:9px 11px;background:#fff0e9;border-radius:10px;text-align:right">${message.replace(/[<>&]/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[char])}</p><p style="margin:0 0 10px;padding:9px 11px;background:#f2f5f1;border-radius:10px">알겠어요. 말씀하신 조건을 우선으로 반영해 다시 살펴볼게요. 현재 추천 상품 중에서는 1위 상품이 가장 잘 맞습니다.</p>`);
  input.value = '';
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

renderProducts('#preview-product-grid', [products[3], products[4], products[5]]);
renderProducts('#personal-product-grid', [products[3], products[4], products[0], products[5], products[1], products[2]]);
renderProfile();
runSearch(document.querySelector('#search-input').value, false);
