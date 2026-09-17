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
  { id: 'lamp-1', name: '무드등 겸용 스탠드', price: 18000, category: '디지털', location: '관악구 봉천동', uploadedAt: '2일 전', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85', description: '지난 겨울 전자제품 매장에서 구매한 LED 스탠드입니다. 화이트·실버 색상의 슬림한 디자인이며, 높이 약 40cm라 책상 위에 두기 좋습니다. 터치 버튼으로 밝기 단계와 주광색·전구색을 조절할 수 있어 공부할 때와 잠들기 전 모두 유용했어요. 사용 기간은 약 6개월이고 불빛 깜빡임이나 버튼 이상 없이 정상 작동 확인했습니다. 봉천역·서울대입구역 근처에서 거래 희망하며, 어댑터 함께 드립니다.', condition: '좋음 · 작동 확인', tags: ['자취방', '공간 절약', '밝기 조절'], imageTags: ['밝기 조절 버튼', '슬림한 받침'], reason: '작은 공간에서도 쓰기 좋고, 공부할 때 필요한 밝기를 조절할 수 있어요.' },
  { id: 'ipad-1', name: '아이패드 10세대 64GB', price: 325000, category: '디지털', location: '천안시 불당동', uploadedAt: '2시간 전', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1024&h=1024&q=85', description: '필기와 영상 시청용으로 깨끗하게 사용한 아이패드입니다.', condition: '사용감 적음 · 충전 정상', tags: ['태블릿', '공부용'], imageTags: ['화면 이상 없음'], reason: '학업과 일상 용도로 활용하기 좋아요.' },
  { id: 'laptop-1', name: '그램 15인치 노트북', price: 490000, category: '디지털', location: '아산시 배방읍', uploadedAt: '4시간 전', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1024&h=1024&q=85', description: '문서 작업과 온라인 수업에 사용한 가벼운 노트북입니다.', condition: '생활기스 있음 · 기능 정상', tags: ['노트북', '재택근무'], imageTags: ['키보드 상태 양호'], reason: '기본 작업용으로 알맞습니다.' },
  { id: 'monitor-1', name: '27인치 IPS 모니터', price: 98000, category: '디지털', location: '청주시 흥덕구', uploadedAt: '6시간 전', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1024&h=1024&q=85', description: '재택근무용으로 쓰던 모니터이며 화면 이상 없습니다.', condition: '사용감 적음 · 케이블 포함', tags: ['모니터', '사무용'], imageTags: ['화면 점검 완료'], reason: '넓은 화면으로 작업하기 좋아요.' },
  { id: 'keyboard-1', name: '블루투스 기계식 키보드', price: 42000, category: '디지털', location: '서울 성북구', uploadedAt: '8시간 전', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1024&h=1024&q=85', description: '무선 연결이 가능한 컴팩트 키보드입니다.', condition: '깨끗하게 사용 · 키 정상', tags: ['키보드', '무선'], imageTags: ['키캡 상태 양호'], reason: '책상 공간을 아낄 수 있어요.' },
  { id: 'mouse-1', name: '무선 마우스', price: 15000, category: '디지털', location: '서울 마포구', uploadedAt: '10시간 전', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1024&h=1024&q=85', description: '노트북과 함께 쓰던 무선 마우스입니다.', condition: '사용감 적음 · 동작 정상', tags: ['마우스', '사무용'], imageTags: ['휠 정상'], reason: '간편한 보조 기기입니다.' },
  { id: 'airpods-1', name: '에어팟 프로 2세대', price: 145000, category: '디지털', location: '서울 송파구', uploadedAt: '12시간 전', image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?auto=format&fit=crop&w=1024&h=1024&q=85', description: '케이스와 함께 보관한 무선 이어폰입니다.', condition: '사용감 있음 · 충전 정상', tags: ['이어폰', '블루투스'], imageTags: ['케이스 포함'], reason: '통화와 음악 감상에 좋아요.' },
  { id: 'camera-1', name: '미러리스 디지털 카메라', price: 185000, category: '취미/게임', location: '수원시 영통구', uploadedAt: '어제', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1024&h=1024&q=85', description: '여행 때 사용하던 입문용 카메라입니다.', condition: '사용감 적음 · 렌즈캡 포함', tags: ['카메라', '취미'], imageTags: ['렌즈 상태 양호'], reason: '가볍게 사진을 시작하기 좋아요.' },
  { id: 'chair-1', name: '패브릭 식탁 의자', price: 27000, category: '가구/생활', location: '서울 용산구', uploadedAt: '어제', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1024&h=1024&q=85', description: '식탁에서 쓰던 편안한 패브릭 의자입니다.', condition: '생활기스 있음', tags: ['의자', '가구'], imageTags: ['다리 흔들림 없음'], reason: '집 안 포인트 가구로 좋아요.' },
  { id: 'bookshelf-1', name: '원목 3단 책장', price: 35000, category: '가구/생활', location: '서울 은평구', uploadedAt: '어제', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1024&h=1024&q=85', description: '작은 방에서 쓰기 좋은 원목 책장입니다.', condition: '깨끗하게 사용', tags: ['책장', '수납'], imageTags: ['선반 상태 양호'], reason: '공간 정리에 유용합니다.' },
  { id: 'mirror-1', name: '전신 거울', price: 22000, category: '가구/생활', location: '고양시 일산동구', uploadedAt: '1일 전', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1024&h=1024&q=85', description: '현관에 세워 두던 전신 거울입니다.', condition: '모서리 약간 까짐', tags: ['거울', '인테리어'], imageTags: ['거울면 깨끗함'], reason: '현관이나 방에 두기 좋아요.' },
  { id: 'hoodie-1', name: '오버핏 후드집업', price: 18000, category: '의류/패션', location: '서울 강동구', uploadedAt: '1일 전', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1024&h=1024&q=85', description: '봄가을에 가볍게 입던 후드집업입니다.', condition: '사용감 적음', tags: ['후드', '캐주얼'], imageTags: ['오염 없음'], reason: '데일리로 편하게 입기 좋아요.' },
  { id: 'shoes-1', name: '러닝화 245mm', price: 39000, category: '의류/패션', location: '대전 유성구', uploadedAt: '1일 전', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1024&h=1024&q=85', description: '러닝머신에서 몇 번 신은 러닝화입니다.', condition: '밑창 마모 적음', tags: ['운동화', '러닝'], imageTags: ['끈 포함'], reason: '가볍게 운동 시작하기 좋아요.' },
  { id: 'crossbag-1', name: '미니 크로스백', price: 12000, category: '의류/패션', location: '인천 연수구', uploadedAt: '1일 전', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1024&h=1024&q=85', description: '외출할 때 쓰기 좋은 작은 가방입니다.', condition: '사용감 있음 · 지퍼 정상', tags: ['가방', '패션'], imageTags: ['끈 상태 양호'], reason: '가볍게 들기 좋아요.' },
  { id: 'camp-chair-1', name: '접이식 캠핑 의자', price: 24000, category: '스포츠', location: '용인시 수지구', uploadedAt: '2일 전', image: '', description: '캠핑 때 두 번 사용한 접이식 의자입니다.', condition: '사용감 적음 · 수납가방 포함', tags: ['캠핑', '의자'], imageTags: ['프레임 상태 양호'], reason: '가볍게 들고 다니기 좋아요.' },
  { id: 'bicycle-1', name: '생활 자전거 26인치', price: 85000, category: '스포츠', location: '성남시 분당구', uploadedAt: '2일 전', image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=1024&h=1024&q=85', description: '동네 이동용으로 관리하며 타던 자전거입니다.', condition: '사용감 있음 · 브레이크 점검', tags: ['자전거', '운동'], imageTags: ['타이어 상태 보통'], reason: '가까운 거리 이동에 좋아요.' },
  { id: 'yoga-1', name: '두꺼운 요가 매트', price: 9000, category: '스포츠', location: '부천시 중동', uploadedAt: '2일 전', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=1024&h=1024&q=85', description: '홈트레이닝에 쓰던 미끄럼 방지 매트입니다.', condition: '세척 완료 · 사용감 있음', tags: ['요가', '홈트'], imageTags: ['찢김 없음'], reason: '집에서 운동하기 좋아요.' },
  { id: 'switch-1', name: '닌텐도 스위치 라이트', price: 128000, category: '취미/게임', location: '서울 관악구', uploadedAt: '3일 전', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1024&h=1024&q=85', description: '가끔 게임할 때 사용한 휴대용 게임기입니다.', condition: '기능 정상 · 충전기 포함', tags: ['닌텐도', '게임'], imageTags: ['버튼 정상'], reason: '가볍게 즐기기 좋아요.' },
  { id: 'boardgame-1', name: '보드게임 스플렌더', price: 16000, category: '취미/게임', location: '서울 서대문구', uploadedAt: '3일 전', image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1024&h=1024&q=85', description: '구성품 확인 후 보관한 보드게임입니다.', condition: '구성품 모두 있음', tags: ['보드게임', '취미'], imageTags: ['카드 상태 양호'], reason: '친구들과 즐기기 좋아요.' },
  { id: 'textbook-1', name: '대학교 전공책 세트', price: 28000, category: '도서', location: '천안시 서북구', uploadedAt: '3일 전', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1024&h=1024&q=85', description: '수업 때 사용한 전공책 세 권입니다.', condition: '필기 일부 있음', tags: ['전공책', '대학교'], imageTags: ['표지 상태 보통'], reason: '학기 준비에 실용적입니다.' },
  { id: 'novel-1', name: '소설책 5권 묶음', price: 11000, category: '도서', location: '서울 종로구', uploadedAt: '4일 전', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1024&h=1024&q=85', description: '읽고 난 소설책을 묶어서 판매합니다.', condition: '책등 사용감 있음', tags: ['소설', '책'], imageTags: ['낙서 없음'], reason: '부담 없이 읽기 좋아요.' }
];

products.push(
  { id: 'racket-4', name: '던롭 입문용 테니스 라켓', price: 28000, category: '스포츠', location: '천안시 서북구', uploadedAt: '2시간 전', image: '', description: '대학교 교양 수업 때 몇 번 사용한 던롭 입문용 라켓입니다. 벽에 세워 보관해 프레임에 작은 생활기스만 있고, 스트링과 그립은 바로 사용 가능한 상태예요.', condition: '사용감 적음 · 프레임 작은 스크래치', tags: ['초보자용', '수업용', '가벼움'], imageTags: ['헤드 프레임 상태 양호'], reason: '가벼운 무게와 낮은 가격으로 입문 수업에 잘 맞아요.' },
  { id: 'racket-5', name: 'HEAD 테니스 라켓', price: 45000, category: '스포츠', location: '수원시 팔달구', uploadedAt: '4시간 전', image: '', description: '실내 코트에서 가끔 사용한 헤드 라켓입니다. 그립 부분에는 사용감이 조금 있지만 프레임 균열은 없고, 처음 테니스를 배우는 분도 편하게 쓰실 수 있어요.', condition: '그립 사용감 있음 · 기능 정상', tags: ['입문용', '가벼운 편', '실내 코트'], imageTags: ['프레임 균열 없음'], reason: '상태를 확인하면 오래 쓰기 좋은 입문 라켓이에요.' },
  { id: 'racket-6', name: '윌슨 테니스 라켓 + 커버', price: 39000, category: '스포츠', location: '서울 동대문구', uploadedAt: '6시간 전', image: '', description: '동호회 수업에서 쓰던 윌슨 라켓과 커버를 함께 드립니다. 그립 테이프는 최근 교체했고, 헤드 가장자리에 미세한 흔적 외에는 전체적으로 깨끗합니다.', condition: '깨끗하게 사용 · 커버 포함', tags: ['초보자 추천', '라켓 커버', '수업용'], imageTags: ['그립 테이프 교체'], reason: '구성품까지 갖춰 처음 시작하는 분께 실용적입니다.' },
  { id: 'racket-7', name: '요넥스 초보자용 테니스 라켓', price: 47000, category: '스포츠', location: '서울 광진구', uploadedAt: '어제', image: '', description: '대학 수업용으로 구입한 요넥스 라켓입니다. 넓은 헤드라 공을 맞히기 편했고, 책상 옆에 보관해 상태가 좋은 편입니다. 연습용 공도 같이 드립니다.', condition: '사용감 적음 · 공 포함', tags: ['초보자용', '넓은 헤드', '수업용'], imageTags: ['프레임 생활기스 미미'], reason: '초보자가 공을 맞히기 편한 구성입니다.' },
  { id: 'racket-8', name: '가벼운 테니스 라켓 + 공', price: 32000, category: '스포츠', location: '고양시 덕양구', uploadedAt: '1일 전', image: '', description: '가볍게 연습하려고 구매한 테니스 라켓입니다. 소파 옆에 두고 보관했고, 사용 횟수가 많지 않아 그립과 스트링 상태가 양호합니다. 공 두 개 함께 드려요.', condition: '거의 새것 · 공 2개 포함', tags: ['입문용', '가벼움', '공 포함'], imageTags: ['그립 상태 양호'], reason: '가벼운 무게와 구성품으로 첫 연습에 적합합니다.' }
);

// 카드는 가로 contact sheet가 아닌, 독립된 1:1 생활사진 자산만 사용합니다.
const squarePhotoNames = {
  'racket-1': ['market-square.png', 'market-square-02.png', 'market-square-03.png', 'market-square-04.png'],
  'racket-2': ['market-square.png', 'market-square-02.png'],
  'racket-3': ['market-square.png'],
  'camp-chair-1': ['market-square.png'],
  'racket-4': ['market-square.png'],
  'racket-5': ['market-square.png'],
  'racket-6': ['market-square.png'],
  'racket-7': ['market-square.png'],
  'racket-8': ['market-square.png']
};
// 첫 행 featured 상품은 기존 사진을 유지하고, 그 뒤 Home 매물만 생활공간 사진으로 교체합니다.
const homeLifestylePhotoIds = new Set([
  'table-1', 'bag-1', 'lamp-1', 'ipad-1', 'laptop-1', 'monitor-1', 'airpods-1',
  'camera-1', 'chair-1', 'bookshelf-1', 'mirror-1', 'hoodie-1', 'shoes-1',
  'crossbag-1', 'bicycle-1', 'yoga-1', 'boardgame-1', 'textbook-1', 'novel-1'
]);
const createProductPhotoSet = (id, fallbackImage) => {
  if (squarePhotoNames[id]) return squarePhotoNames[id].map(fileName => `assets/products/${id}/${fileName}`);
  if (homeLifestylePhotoIds.has(id)) return [`assets/products/${id}/market-home-v2.png`];
  return [fallbackImage];
};
products.forEach(item => {
  // Keep the original product image so a missing repository asset can recover
  // without replacing every product with an unrelated image.
  item.fallbackImage = item.image;
  item.images = createProductPhotoSet(item.id, item.fallbackImage);
  item.image = item.images[0] || item.fallbackImage;
});

const demoSellerNames = ['민정', '준호', '서연', '현우', '소연', '도윤', '하늘', '지수', '민수', '유진', '채원', '은지', '태훈', '수빈', '지민', '예린', '건우', '다은', '윤서', '지후', '경민', '나래', '우진', '보라', '시온'];
Object.assign(sellerProfiles, Object.fromEntries(products.slice(6).map((item, index) => [item.id, {
  name: demoSellerNames[index], location: item.location, temperature: `${39 + (index % 5)}.${index + 2}°C`,
  image: `https://images.unsplash.com/photo-${['1534528741775-53994a69daeb', '1500648767791-00dcc994a43e', '1494790108377-be9c29b29330', '1544005313-94ddf0286df2', '1506794778202-cad84cf45f1d', '1517841905240-472988babdf9'][index % 6]}?auto=format&fit=crop&w=160&q=80`
}])))

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

function setSearchLayout(searched, useAi = false) {
  isSearched = searched;
  const topbar = document.querySelector('.topbar');
  document.querySelector('#home-search-hero').hidden = searched;
  document.querySelector('#search-condition-summary').hidden = !searched || !useAi;
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

// `verdict` 데이터가 연결되기 전까지는 검색 결과의 순서로 데모 배지를 표시합니다.
function renderProducts(target, items, { showVerdict = false } = {}) {
  const root = document.querySelector(target);
  root.replaceChildren(...items.map((item, index) => {
    const node = productTemplate.content.cloneNode(true);
    const primaryImage = Array.isArray(item.images) && item.images.length ? item.images[0] : item.image;
    const productImage = node.querySelector('.product-image');
    productImage.src = imageSource(primaryImage);
    productImage.style.objectPosition = imagePosition(primaryImage);
    productImage.alt = item.name;
    if (item.fallbackImage && item.fallbackImage !== imageSource(primaryImage)) {
      productImage.addEventListener('error', () => {
        if (productImage.dataset.fallbackApplied === 'true') return;
        productImage.dataset.fallbackApplied = 'true';
        productImage.src = item.fallbackImage;
      });
    }
    const decision = getProductVerdict(item);
    const card = node.querySelector('.product-card');
    card.dataset.productId = item.id;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${item.name} 구매 판단 상세 보기`);
    if (showVerdict) node.querySelector('.rank').innerHTML = `<span class="judgment-badge ${decision.key}">${decision.label}</span>`;
    else node.querySelector('.rank').remove();
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

const verdicts = [
  { key: 'recommend', label: '추천' },
  { key: 'info', label: '정보 부족' },
  { key: 'low', label: '추천도 낮음' },
  { key: 'reject', label: '비추천' }
];

function getProductVerdict(item) {
  return item.verdict || verdicts[Math.max(0, products.findIndex(product => product.id === item.id)) % verdicts.length];
}

function openDetail(productId) {
  const item = products.find(product => product.id === productId);
  if (!item) return;

  const seller = sellerProfiles[item.id] || { name: '이웃 판매자', location: item.location, temperature: '40.0°C', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80' };
  const verdict = getProductVerdict(item);
  const images = Array.isArray(item.images) && item.images.length ? item.images : [item.image];
  const imageNotes = item.imageTags?.length ? item.imageTags.join(' · ') : '사진으로 상태를 확인해 보세요.';
  const questionText = `안녕하세요. ${item.name} 구매를 고려하고 있습니다. 판매글에 적어주신 “${item.condition}” 상태와 ${imageNotes} 부분을 조금 더 확인할 수 있을까요?`;
  const modal = document.createElement('div');
  modal.className = 'detail-modal';
  modal.innerHTML = `<article class="detail-dialog detail-agent-layout" role="dialog" aria-modal="true" aria-label="상품 상세"><button class="modal-close" type="button" aria-label="상세 닫기">×</button><div class="detail-agent-media"><div class="product-carousel"><img src="${imageSource(images[0])}" style="object-position:${imagePosition(images[0])}" alt="${escapeHtml(item.name)}" />${images.length > 1 ? `<button class="carousel-arrow previous" type="button" aria-label="이전 이미지">←</button><button class="carousel-arrow next" type="button" aria-label="다음 이미지">→</button><div class="carousel-count" aria-label="상품 이미지 순서">1 / ${images.length}</div>` : ''}</div><section class="seller-profile" aria-label="판매자 정보"><img class="seller-avatar" src="${seller.image}" alt="${escapeHtml(seller.name)} 프로필" /><div class="seller-identity"><b>${escapeHtml(seller.name)}</b><span>${escapeHtml(seller.location)}</span></div><div class="seller-temperature"><b>${escapeHtml(seller.temperature)}</b><span>매너온도</span></div></section><aside class="detail-ai-notice"><b>건지니가 분석한 상품이에요</b><p>AI 분석 결과는 참고용이며, 최종 구매 결정은 소비자 본인의 판단에 따라 이루어집니다.</p></aside></div><div class="detail-agent-content"><span class="judgment-badge ${verdict.key}">${verdict.label}</span><h2>${escapeHtml(item.name)}</h2><strong class="detail-price">${won(item.price)}</strong><p class="detail-basic-meta">${escapeHtml(item.location)} · ${escapeHtml(item.uploadedAt)} · 조회 234</p><section class="detail-section decision-section"><h3><span class="detail-ai-mark" aria-hidden="true">✦</span>건지니 판단</h3><p class="decision-summary">${escapeHtml(item.reason)}</p></section><section class="detail-section checkpoint-section"><h3>구매 전 체크포인트</h3><div class="checkpoint-list"><article><b>판매글 상태</b><p>${escapeHtml(item.condition)}</p></article><article><b>사진 확인</b><p>${escapeHtml(imageNotes)}</p></article><article><b>거래 전 확인</b><p>판매자에게 실제 사용 상태를 한 번 더 확인해 보세요.</p></article></div></section><section class="detail-section question-box"><h3>판매자에게 물어보기</h3>${verdict.key === 'info' ? '<p class="info-warning"><b>❗</b><span>정보 부족 상품이에요!</span></p>' : ''}<textarea class="question-message" aria-label="판매자에게 보낼 문자 내용">${escapeHtml(questionText)}</textarea></section><div class="message-footer"><button class="detail-save-button" type="button">저장하기</button><button class="send-message" type="button">판매자에게 질문하기</button></div></div></article>`;
  document.body.append(modal);

  const dialog = modal.querySelector('.detail-dialog');
  const carouselImage = modal.querySelector('.product-carousel img');
  let imageIndex = 0;
  const updateCarousel = () => {
    carouselImage.src = imageSource(images[imageIndex]);
    carouselImage.style.objectPosition = imagePosition(images[imageIndex]);
    const count = modal.querySelector('.carousel-count');
    if (count) count.textContent = `${imageIndex + 1} / ${images.length}`;
  };
  modal.querySelector('.carousel-arrow.previous')?.addEventListener('click', () => { if (imageIndex > 0) { imageIndex -= 1; updateCarousel(); } });
  modal.querySelector('.carousel-arrow.next')?.addEventListener('click', () => { if (imageIndex < images.length - 1) { imageIndex += 1; updateCarousel(); } });

  const saveButton = modal.querySelector('.detail-save-button');
  const renderDetailSave = () => {
    const isSaved = savedItemIds.includes(item.id);
    saveButton.classList.toggle('saved', isSaved);
    saveButton.textContent = isSaved ? '저장됨' : '저장하기';
  };
  renderDetailSave();

  const closeModal = () => modal.remove();
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  modal.querySelector('.send-message').addEventListener('click', event => {
    const message = modal.querySelector('.question-message').value.trim();
    if (!message) { showToast('판매자에게 보낼 메시지를 입력해 주세요.'); return; }
    event.currentTarget.textContent = '질문 보냄';
    event.currentTarget.disabled = true;
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
}

function showToast(message) {
  document.querySelector('.toast')?.remove();
  const toast = document.createElement('div'); toast.className = 'toast'; toast.textContent = message; document.body.append(toast);
  setTimeout(() => toast.remove(), 2200);
}

function parseNaturalLanguageQuery(query) {
  const q = normalizeKeyword(query);
  const keywordRules = [
    { keyword: '라켓', terms: ['라켓', '테니스'], category: '스포츠' },
    { keyword: '책상', terms: ['책상', '테이블'], category: '가구' },
    { keyword: '가방', terms: ['가방', '백팩', '노트북'], category: '패션잡화' },
    { keyword: '스탠드', terms: ['스탠드', '조명', '무드등'], category: '디지털' },
    { keyword: '캠핑 의자', terms: ['캠핑', '의자'], category: '생활' },
    { keyword: '아이패드', terms: ['아이패드'], category: '디지털' },
    { keyword: '카메라', terms: ['카메라'], category: '디지털' }
  ];
  const matchedRule = keywordRules.find(rule => rule.terms.some(term => q.includes(term)));
  const priceMatch = q.match(/(\d+(?:\.\d+)?)\s*만\s*원?(?:\s*(이하|미만|정도|대))?|([\d,]+)\s*원\s*(이하|미만|정도|대)?/);
  const maxPrice = priceMatch
    ? (priceMatch[1] ? Math.round(Number(priceMatch[1]) * 10000) : Number(priceMatch[3].replace(/,/g, '')))
    : null;
  const experience = /초보|입문|처음/.test(q) ? '초보자' : /중급/.test(q) ? '중급자' : /상급/.test(q) ? '상급자' : null;
  const purpose = /대학|대학교|교양|수업/.test(q) ? '대학교 테니스 수업' : /자취/.test(q) ? '자취방 사용' : /캠핑/.test(q) ? '캠핑' : null;
  return { keyword: matchedRule?.keyword || null, terms: matchedRule?.terms || [], category: matchedRule?.category || null, maxPrice, experience, purpose };
}

function detectSearch(query) {
  const conditions = parseNaturalLanguageQuery(query);
  const scoredItems = products
    .map(item => {
      const text = normalizeKeyword([item.name, item.category, item.description, item.condition, ...(item.tags || [])].join(' '));
      const keywordMatched = !conditions.terms.length || conditions.terms.some(term => text.includes(term));
      if (!keywordMatched) return null;
      let score = conditions.terms.filter(term => text.includes(term)).length * 5;
      if (conditions.category === item.category) score += 3;
      if (conditions.maxPrice && item.price <= conditions.maxPrice) score += 3;
      if (conditions.experience === '초보자' && /초보|입문|수업/.test(text)) score += 2;
      if (conditions.purpose && conditions.purpose.split(' ').some(term => text.includes(term))) score += 2;
      return { item, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
  const chips = [];
  if (conditions.keyword) chips.push(['상품', conditions.keyword]);
  if (conditions.maxPrice) chips.push(['예산', `${Math.round(conditions.maxPrice / 10000)}만원 이하`]);
  if (conditions.experience) chips.push(['사용자', conditions.experience]);
  if (conditions.purpose) chips.push(['용도', conditions.purpose]);
  if (!chips.length) chips.push(['검색 의도', '자연어 조건 분석']);
  return { label: conditions.keyword || '맞춤 중고 상품', chips, items: scoredItems };
}

function searchByKeyword(query) {
  const keywords = (normalizeKeyword(query).match(/[가-힣a-z0-9]+/g) || []).filter(keyword => keyword.length >= 2);
  return products.filter(item => {
    const text = normalizeKeyword([item.name, item.category, item.description, item.condition, ...(item.tags || [])].join(' '));
    return keywords.some(keyword => text.includes(keyword));
  });
}

// 해커톤 시연에서는 어떤 입력에도 기존 테니스 라켓 상품을 안정적으로 보여줍니다.
const getDemoTennisRacketProducts = () => products.filter(item => /테니스\s*라켓/.test(item.name));
const demoConditionChips = () => [
  ['용도', '대학교 테니스 수업'],
  ['예산', '5만원 이하'],
  ['사용자', '초보자'],
  ['우선순위', '가벼움 · 상태']
];

function filteredSearchItems() {
  if (!activeSearch) return [];
  if (activeSearch.forcedDemo) return activeSearch.baseItems;
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
  const plainSearchHeading = document.querySelector('#plain-search-heading');
  plainSearchHeading.hidden = useAi;
  plainSearchHeading.querySelector('.plain-result-query').textContent = `“${query}”`;
  analysisCard.innerHTML = useAi ? `<div class="analysis-intro"><b>반영된 조건</b><p>기본 목적, 핵심 조건을 함께 반영했습니다.</p></div><div class="condition-list editable-conditions">${chips.map(([key, value], index) => `<button type="button" class="condition-chip" data-condition-index="${index}"><b>${key}</b>${value} <span aria-label="조건 삭제">×</span></button>`).join('')}</div>` : '';
  aiChatbot.hidden = true;
  // MVP 시연: 입력 문장과 무관하게 저장된 테니스 라켓 8개만 바로 보여줍니다.
  const searchItems = getDemoTennisRacketProducts();
  const arrangedItems = useAi ? searchItems : [...searchItems].sort(() => Math.random() - 0.5);
  renderProducts('#search-product-grid', arrangedItems, { showVerdict: useAi });
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
  const demoItems = getDemoTennisRacketProducts();
  const result = { label: '테니스 라켓', chips: demoConditionChips(), items: demoItems };
  activeSearch = { query, result, useAi, chips: result.chips.map(([key, value]) => [key, value]), baseItems: demoItems, forcedDemo: true };
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
    resultView.classList.toggle('basic-search-active', !useAi);
    setSearchLayout(true, useAi);
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
  const homeMarketProducts = products.filter(item => !/테니스\s*라켓/.test(item.name));
  const featuredIds = ['camp-chair-1', 'switch-1', 'keyboard-1', 'mouse-1'];
  const featuredProducts = featuredIds.map(id => homeMarketProducts.find(item => item.id === id)).filter(Boolean);
  const remainingProducts = homeMarketProducts.filter(item => !featuredIds.includes(item.id));
  renderProducts('#recent-product-grid', [...featuredProducts, ...remainingProducts]);
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
  const query = input.value.trim();
  if (!query) {
    input.focus();
    showToast('검색어를 입력해 주세요.');
    return;
  }
  runSearch(query, true, aiSearchMode);
  document.querySelector('#search-history').classList.remove('visible');
}
document.querySelector('#header-search-form').addEventListener('submit', event => {
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
  headerSearchInput.placeholder = aiSearchMode ? '우리 동네에서 5천원 이하의 돼지인형 찾아줘' : '찾고 싶은 물건을 검색해보세요';
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
