/* Product detail modal redesign: this script intentionally owns only the modal UI. */
const geonjiniIcon = './codex-clipboard-24022a08-047b-4fdb-b8d0-ac529a01c779.png';
const verdictsByProduct = {
  'racket-1': { key: 'recommend', label: '추천', score: '4.8' },
  'racket-2': { key: 'info', label: '정보 부족', score: '3.8' },
  'racket-3': { key: 'low', label: '추천도 낮음', score: '3.1' },
  'racket-4': { key: 'reject', label: '비추천', score: '2.4' },
  'racket-5': { key: 'recommend', label: '추천', score: '4.6' },
  'racket-6': { key: 'info', label: '정보 부족', score: '3.7' },
  'racket-7': { key: 'low', label: '추천도 낮음', score: '3.0' },
  'racket-8': { key: 'reject', label: '비추천', score: '2.2' }
};
products.forEach((product, index) => {
  if (!product.verdict) product.verdict = verdictsByProduct[product.id] || [
    { key: 'recommend', label: '추천', score: '4.5' },
    { key: 'info', label: '정보 부족', score: '3.8' },
    { key: 'low', label: '추천도 낮음', score: '3.1' },
    { key: 'reject', label: '비추천', score: '2.5' }
  ][index % 4];
});

const detailModalStyles = document.createElement('style');
detailModalStyles.textContent = [
  '.detail-modal { position:fixed; inset:0; z-index:100; display:grid; place-items:center; padding:28px; overflow:auto; background:rgba(25,31,42,.42); backdrop-filter:blur(3px); }',
  '.geonjini-detail { position:relative; width:min(1240px,100%); display:grid; grid-template-columns:minmax(0,46%) minmax(0,54%); overflow:hidden; border-radius:22px; background:#fff; box-shadow:0 28px 80px rgba(16,24,40,.26); color:#101828; }',
  '.geonjini-detail .modal-close { position:absolute; z-index:3; top:18px; right:20px; width:36px; height:36px; border:0; border-radius:50%; background:transparent; color:#111827; font-size:31px; line-height:1; cursor:pointer; }',
  '.detail-left { padding:40px 26px 26px; background:#fff; }',
  '.detail-right { padding:40px 28px 28px; border-left:1px solid #e5e7eb; }',
  '.detail-carousel { position:relative; overflow:hidden; border-radius:14px; background:#f3f4f6; aspect-ratio:1/1; }',
  '.detail-carousel img { display:block; width:100%; height:100%; object-fit:cover; }',
  '.detail-carousel .carousel-arrow { position:absolute; top:50%; transform:translateY(-50%); display:grid; place-items:center; width:44px; height:44px; border:0; border-radius:50%; background:#fffffff0; color:#1f2937; font-size:30px; cursor:pointer; box-shadow:0 3px 12px #0002; }',
  '.detail-carousel .carousel-arrow:disabled { opacity:.45; cursor:default; }',
  '.detail-carousel .previous { left:16px; } .detail-carousel .next { right:16px; }',
  '.photo-counter { position:absolute; right:16px; bottom:16px; border-radius:999px; padding:7px 11px; background:#111827c9; color:#fff; font:700 12px/1 system-ui; }',
  '.detail-seller { display:flex; align-items:center; gap:12px; margin-top:20px; padding:18px 0; border-top:1px solid #edf0f2; border-bottom:1px solid #edf0f2; }',
  '.detail-seller img { width:54px; height:54px; flex:0 0 auto; border-radius:50%; object-fit:cover; background:#f3f4f6; }',
  '.detail-seller strong { display:block; margin-bottom:4px; font-size:16px; } .detail-seller span { color:#6b7280; font-size:13px; }',
  '.detail-temp { margin-left:auto; text-align:right; } .detail-temp b { display:block; color:#18b76a; font-size:20px; } .detail-temp small { color:#6b7280; font-size:12px; }',
  '.ai-disclaimer { display:flex; gap:12px; margin-top:20px; border-radius:13px; padding:17px; background:#fff7ed; color:#6b7280; font-size:13px; line-height:1.65; }',
  '.ai-disclaimer b { display:block; margin-bottom:4px; color:#f05a24; font-size:14px; } .ai-disclaimer .shield { color:#f05a24; font-size:21px; }',
  '.status-badge { display:inline-flex; align-items:center; border:1px solid currentColor; border-radius:7px; padding:4px 8px; background:#fff; font-size:12px; font-weight:800; line-height:1; }',
  '.status-badge.recommend { color:#22C55E; } .status-badge.low { color:#FBBF24; } .status-badge.reject { color:#EF4444; } .status-badge.info { color:#3B82F6; }',
  '.detail-header h2 { margin:14px 0 7px; font-size:28px; line-height:1.28; letter-spacing:-.8px; }',
  '.detail-price { display:flex; align-items:center; gap:10px; margin:0; color:#ff5a1f; font-size:32px; font-weight:850; letter-spacing:-.8px; } .detail-score { color:#f59e0b; font-size:14px; letter-spacing:0; }',
  '.detail-meta { margin:10px 0 19px; padding-bottom:19px; border-bottom:1px solid #e5e7eb; color:#6b7280; font-size:13px; }',
  '.detail-section { margin-top:23px; } .detail-section-title { display:flex; align-items:center; gap:9px; margin:0 0 11px; font-size:19px; letter-spacing:-.35px; }',
  '.geonjini-mini { width:30px; height:30px; object-fit:contain; }',
  '.verdict-box { border-radius:13px; padding:15px 16px; background:#f3f4f6; color:#4b5563; font-size:14px; line-height:1.65; }',
  '.checkpoint-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; } .checkpoint { min-height:104px; border:1px solid #fed7aa; border-radius:12px; padding:14px; background:#fff7ed; } .checkpoint b { display:block; margin-bottom:7px; font-size:14px; } .checkpoint p { margin:0; color:#6b7280; font-size:12px; line-height:1.55; }',
  '.info-warning { display:flex; align-items:center; gap:7px; margin:-4px 0 10px; color:#6b7280; font-size:13px; } .info-warning strong { color:#EF4444; font-size:17px; }',
  '.seller-question { width:100%; min-height:78px; box-sizing:border-box; resize:vertical; border:1px solid #e5e7eb; border-radius:11px; padding:13px; color:#374151; font:13px/1.55 Noto Sans KR,system-ui,sans-serif; }',
  '.detail-actions-row { display:grid; grid-template-columns:1fr 1.25fr; gap:12px; margin-top:25px; padding-top:17px; border-top:1px solid #e5e7eb; } .detail-actions-row button { min-height:52px; border-radius:10px; padding:0 16px; font:800 15px Noto Sans KR,system-ui,sans-serif; cursor:pointer; }',
  '.detail-save { border:1px solid #9ca3af; background:#fff; color:#1f2937; } .detail-save.saved { border-color:#ff5a1f; color:#ff5a1f; } .detail-send { border:0; background:#ff5a1f; color:#fff; } .detail-send:disabled { opacity:.68; cursor:default; }',
  '@media (max-width:860px) { .detail-modal { padding:12px; align-items:start; } .geonjini-detail { grid-template-columns:1fr; } .detail-right { border-left:0; border-top:1px solid #e5e7eb; } .detail-left,.detail-right { padding:28px 20px; } .checkpoint-grid { grid-template-columns:1fr; } .detail-carousel { max-height:440px; } }'
].join('\\n');
document.head.append(detailModalStyles);

const escapeDetail = value => String(value || '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
const productImageUrl = image => typeof image === 'string' ? image : (image && image.src) || '';
const checkpointData = item => [
  { title: '실제 상태', body: (item.imageTags || ['사진 상태']).slice(0, 1).join('') + '을 직접 확인해 보세요.' },
  { title: '사용 기간', body: '구매 시점과 사용 빈도를 판매자에게 물어보세요.' },
  { title: '거래 전 확인', body: item.condition + ' 내용을 거래 전에 다시 확인해 보세요.' }
];

function openGeonjiniDetail(productId) {
  const item = products.find(product => product.id === productId);
  if (!item) return;
  document.querySelectorAll('.detail-modal').forEach(modal => modal.remove());
  const seller = sellerProfiles[item.id] || { name:'이웃 판매자', location:item.location, temperature:'40.0°C', image:'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80' };
  const verdict = item.verdict || { key:'info', label:'정보 부족', score:'3.8' };
  const images = (Array.isArray(item.images) && item.images.length ? item.images : [item.image || item.fallbackImage]).filter(Boolean);
  let imageIndex = 0;
  const question = '안녕하세요. ' + item.name + ' 구매를 고려하고 있습니다. 실제 사용 기간과 사진에서 확인하기 어려운 상태를 알려주실 수 있을까요?';
  const modal = document.createElement('div');
  modal.className = 'detail-modal';
  modal.innerHTML = '<article class="geonjini-detail" role="dialog" aria-modal="true" aria-label="상품 상세">'
    + '<button class="modal-close" type="button" aria-label="상세 닫기">×</button>'
    + '<section class="detail-left">'
    + '<div class="detail-carousel"><img class="detail-main-image" src="' + escapeDetail(productImageUrl(images[0])) + '" alt="' + escapeDetail(item.name) + '"><button class="carousel-arrow previous" type="button" aria-label="이전 이미지">‹</button><button class="carousel-arrow next" type="button" aria-label="다음 이미지">›</button><span class="photo-counter">1 / ' + images.length + '</span></div>'
    + '<section class="detail-seller" aria-label="판매자 정보"><img src="' + escapeDetail(seller.image) + '" alt="' + escapeDetail(seller.name) + ' 프로필"><div><strong>' + escapeDetail(seller.name) + '</strong><span>' + escapeDetail(seller.location) + '</span></div><div class="detail-temp"><b>' + escapeDetail(seller.temperature) + '</b><small>매너온도</small></div></section>'
    + '<section class="ai-disclaimer"><span class="shield">◈</span><div><b>건지니가 분석한 상품이에요</b>AI 분석 결과는 참고용이며, 최종 구매 결정은 소비자 본인의 판단에 따라 이루어집니다.</div></section>'
    + '</section>'
    + '<section class="detail-right">'
    + '<header class="detail-header"><span class="status-badge ' + verdict.key + '">' + verdict.label + '</span><h2>' + escapeDetail(item.name) + '</h2><p class="detail-price">' + item.price.toLocaleString('ko-KR') + '원 <span class="detail-score">★ ' + verdict.score + '</span></p><p class="detail-meta">' + escapeDetail(item.location) + ' · ' + escapeDetail(item.uploadedAt) + '</p></header>'
    + '<section class="detail-section"><h3 class="detail-section-title"><img class="geonjini-mini" src="' + geonjiniIcon + '" alt="">건지니 판단</h3><div class="verdict-box">' + escapeDetail(item.reason) + '</div></section>'
    + '<section class="detail-section"><h3 class="detail-section-title">구매 전 체크포인트</h3><div class="checkpoint-grid">' + checkpointData(item).map(point => '<article class="checkpoint"><b>' + escapeDetail(point.title) + '</b><p>' + escapeDetail(point.body) + '</p></article>').join('') + '</div></section>'
    + '<section class="detail-section"><h3 class="detail-section-title">판매자에게 물어보기</h3>' + (verdict.key === 'info' ? '<p class="info-warning"><strong>❗</strong><span>정보 부족 상품이에요!</span></p>' : '') + '<textarea class="seller-question" aria-label="판매자에게 보낼 질문">' + escapeDetail(question) + '</textarea></section>'
    + '<footer class="detail-actions-row"><button class="detail-save" type="button">저장하기</button><button class="detail-send" type="button">판매자에게 질문하기</button></footer>'
    + '</section></article>';
  document.body.append(modal);
  const carousel = modal.querySelector('.detail-carousel');
  const mainImage = modal.querySelector('.detail-main-image');
  const counter = modal.querySelector('.photo-counter');
  const refreshCarousel = () => { mainImage.src = productImageUrl(images[imageIndex]); counter.textContent = (imageIndex + 1) + ' / ' + images.length; };
  const previous = modal.querySelector('.previous');
  const next = modal.querySelector('.next');
  previous.disabled = images.length < 2; next.disabled = images.length < 2;
  previous.addEventListener('click', () => { if (images.length > 1) { imageIndex = (imageIndex - 1 + images.length) % images.length; refreshCarousel(); } });
  next.addEventListener('click', () => { if (images.length > 1) { imageIndex = (imageIndex + 1) % images.length; refreshCarousel(); } });
  mainImage.addEventListener('error', () => { if (item.fallbackImage && mainImage.src !== item.fallbackImage) mainImage.src = item.fallbackImage; });
  const saveButton = modal.querySelector('.detail-save');
  const renderSaveState = () => { const saved = savedItemIds.includes(item.id); saveButton.classList.toggle('saved', saved); saveButton.textContent = saved ? '저장됨' : '저장하기'; };
  renderSaveState();
  saveButton.addEventListener('click', () => { savedItemIds = savedItemIds.includes(item.id) ? savedItemIds.filter(id => id !== item.id) : [item.id, ...savedItemIds].slice(0, 4); localStorage.setItem(storage.saved, JSON.stringify(savedItemIds)); renderHomeCollections(); renderSaveState(); showToast(savedItemIds.includes(item.id) ? '저장한 상품에 추가했어요.' : '저장을 취소했어요.'); });
  const sendButton = modal.querySelector('.detail-send');
  sendButton.addEventListener('click', () => { if (!modal.querySelector('.seller-question').value.trim()) { showToast('판매자에게 보낼 질문을 입력해 주세요.'); return; } sendButton.textContent = '질문 보냄'; sendButton.disabled = true; showToast('Demo MVP: 판매자에게 질문을 보냈어요.'); });
  const close = () => modal.remove();
  modal.querySelector('.modal-close').addEventListener('click', close);
  modal.addEventListener('click', event => { if (event.target === modal) close(); });
}

document.addEventListener('click', event => {
  if (event.target.closest('.card-save')) return;
  const card = event.target.closest('.product-card[data-product-id]');
  if (!card || event.target.closest('.detail-modal')) return;
  event.preventDefault(); event.stopImmediatePropagation();
  openGeonjiniDetail(card.dataset.productId);
}, true);
document.addEventListener('keydown', event => {
  if ((event.key !== 'Enter' && event.key !== ' ') || !event.target.closest('.product-card[data-product-id]')) return;
  event.preventDefault(); event.stopImmediatePropagation();
  openGeonjiniDetail(event.target.closest('.product-card[data-product-id]').dataset.productId);
}, true);
const productBadgeStyles = document.createElement('style');
productBadgeStyles.textContent = '.judgment-badge{display:inline-flex;align-items:center;border:1px solid currentColor;border-radius:7px;padding:4px 8px;background:#fff;font-size:12px;font-weight:800}.judgment-badge.recommend{color:#22C55E}.judgment-badge.low{color:#FBBF24}.judgment-badge.reject{color:#EF4444}.judgment-badge.info{color:#3B82F6}';
document.head.append(productBadgeStyles);
