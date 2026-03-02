-- Seed data from prototype mock data

-- Topics
INSERT INTO topics (name, icon, sort_order) VALUES
('수유/이유식', '🍼', 1),
('수면/밤잠', '😴', 2),
('육아템 추천', '🎁', 3),
('발달/성장', '📊', 4),
('건강/병원', '🏥', 5),
('놀이/교육', '🧸', 6),
('산후조리', '🌸', 7),
('자유수다', '💬', 8);

-- Month groups
INSERT INTO month_groups (name, min_months, max_months, sort_order) VALUES
('신생아 (0~2개월)', 0, 2, 1),
('3~6개월', 3, 6, 2),
('7~12개월', 7, 12, 3),
('13~24개월', 13, 24, 4),
('25~36개월', 25, 36, 5),
('37개월 이상', 37, 999, 6);

-- Demo users (password: test1234 = bcrypt hash)
INSERT INTO users (email, password_hash, nickname, avatar, avatar_gradient, tier, star_chips) VALUES
('haeun@test.com', '$2a$10$xVqYLGQhHw3UDODqxOfxCu6FKCzCRRSHftWYpWaIzHGvHgGqK8W5G', '하은맘', '🐥', 'g1', '별맘', 1250),
('seoyeon@test.com', '$2a$10$xVqYLGQhHw3UDODqxOfxCu6FKCzCRRSHftWYpWaIzHGvHgGqK8W5G', '서연맘', '👶', 'g2', '별똥별맘', 3200),
('minjun@test.com', '$2a$10$xVqYLGQhHw3UDODqxOfxCu6FKCzCRRSHftWYpWaIzHGvHgGqK8W5G', '민준맘', '🦊', 'g3', '인증단', 5100),
('sua@test.com', '$2a$10$xVqYLGQhHw3UDODqxOfxCu6FKCzCRRSHftWYpWaIzHGvHgGqK8W5G', '수아맘', '🐰', 'g1', '새싹맘', 450),
('hayun@test.com', '$2a$10$xVqYLGQhHw3UDODqxOfxCu6FKCzCRRSHftWYpWaIzHGvHgGqK8W5G', '하윤맘', '🌸', 'g4', '별맘', 980),
('jiwoo@test.com', '$2a$10$xVqYLGQhHw3UDODqxOfxCu6FKCzCRRSHftWYpWaIzHGvHgGqK8W5G', '지우맘', '🌱', 'g2', '새싹맘', 320);

-- Children
INSERT INTO children (user_id, name, birth_date, gender) VALUES
(1, '하은', '2025-04-01', 'F'),
(2, '서연', '2025-07-15', 'F'),
(3, '민준', '2025-01-20', 'M'),
(4, '수아', '2025-06-10', 'F'),
(5, '하윤', '2025-09-05', 'F'),
(6, '지우', '2024-12-01', 'M');

-- Posts (community)
INSERT INTO posts (user_id, topic_id, month_group_id, body, tags, created_at) VALUES
(1, 1, 3, '11개월 아기 이유식 메뉴 추천 받아요! 요즘 편식이 심해져서 고민이에요. 특히 채소를 너무 싫어하는데 다른 맘들은 어떻게 하고 계세요?', '#이유식 #편식 #채소거부', NOW() - INTERVAL '2 hours'),
(2, 2, 2, '8개월 아기 밤잠 수면교육 시작했어요! 첫날은 45분 울었는데 둘째날은 20분으로 줄었어요. 힘들지만 해볼만 해요 맘들 화이팅!', '#수면교육 #밤잠 #8개월', NOW() - INTERVAL '5 hours'),
(3, 3, 3, '돌 전 아기 장난감 추천합니다! 몬테소리 교구가 진짜 좋아요. 특히 쌓기놀이 세트는 소근육 발달에 효과가 눈에 보여요.', '#장난감추천 #몬테소리 #돌전아기', NOW() - INTERVAL '1 day'),
(4, 4, 2, '6개월 아기 뒤집기 아직인데 괜찮을까요? 주변에서 빠르다 느리다 다양하게 얘기하는데 발달 속도가 다 다르다고는 하지만 살짝 걱정돼요.', '#발달 #뒤집기 #6개월', NOW() - INTERVAL '1 day'),
(5, 5, 3, '소아과 다녀왔어요. 요즘 RS바이러스 유행이라 조심하라고 하시네요. 외출 후 손씻기 필수! 다들 감기 조심하세요~', '#소아과 #RS바이러스 #감기조심', NOW() - INTERVAL '3 hours'),
(1, 6, 3, '집에서 하는 촉감놀이 공유해요! 삶은 국수, 젤리, 쌀 등으로 촉감놀이 하면 아기가 정말 좋아해요. 단, 입에 넣지 않게 조심!', '#촉감놀이 #홈놀이 #감각발달', NOW() - INTERVAL '6 hours'),
(2, 7, 1, '산후조리 2주차인데 모유수유가 너무 힘들어요. 유두 갈라짐에 젖몸살까지... 그래도 아기 먹는 모습 보면 뿌듯해요. 같은 맘 계세요?', '#산후조리 #모유수유 #신생아', NOW() - INTERVAL '2 days'),
(3, 8, 4, '육아하면서 자기계발 하시는 맘 계세요? 저는 아기 낮잠 시간에 온라인 강의 듣고 있는데 쉽지 않네요 ㅠㅠ 다들 화이팅!', '#자기계발 #워킹맘 #육아일상', NOW() - INTERVAL '4 hours'),
(5, 1, 3, '이유식 초기에 사과 알레르기 반응 있었는데 11개월 된 지금은 괜찮아졌어요! 알레르기도 시간이 지나면 좋아질 수 있대요.', '#알레르기 #이유식 #사과', NOW() - INTERVAL '8 hours'),
(4, 3, 2, '아기띠 추천해요! 에르고베이비 옴니 브리즈 쓰고 있는데 허리 안 아프고 너무 좋아요. 가격이 좀 있지만 가성비 최고!', '#아기띠 #에르고베이비 #육아템', NOW() - INTERVAL '12 hours');

-- Reactions
INSERT INTO reactions (post_id, user_id, type) VALUES
(1, 2, 'empathy'), (1, 3, 'empathy'), (1, 4, 'helpful'), (1, 5, 'cheer'),
(2, 1, 'cheer'), (2, 3, 'empathy'), (2, 4, 'cheer'), (2, 5, 'empathy'), (2, 6, 'cheer'),
(3, 1, 'helpful'), (3, 2, 'helpful'), (3, 4, 'empathy'), (3, 5, 'helpful'),
(4, 1, 'empathy'), (4, 2, 'empathy'), (4, 3, 'cheer'),
(5, 1, 'helpful'), (5, 2, 'helpful'), (5, 4, 'helpful'), (5, 6, 'helpful'),
(6, 2, 'empathy'), (6, 3, 'helpful'), (6, 5, 'empathy'),
(7, 1, 'cheer'), (7, 3, 'empathy'), (7, 4, 'cheer'), (7, 5, 'empathy'), (7, 6, 'cheer');

-- Comments
INSERT INTO comments (post_id, user_id, body, created_at) VALUES
(1, 2, '저도 채소 거부 심해서 과일이랑 섞어서 줬더니 잘 먹어요!', NOW() - INTERVAL '1 hour'),
(1, 3, '채소 스틱으로 만들어서 직접 잡고 먹게 하면 재미있어 하더라고요~', NOW() - INTERVAL '30 minutes'),
(2, 1, '수면교육 화이팅이에요! 저도 2주 만에 성공했어요!', NOW() - INTERVAL '4 hours'),
(2, 4, '어떤 방법으로 하셨어요? 저도 시작하려고요', NOW() - INTERVAL '3 hours'),
(3, 5, '저도 몬테소리 교구 좋아해요! 어디서 구매하셨어요?', NOW() - INTERVAL '20 hours'),
(5, 1, 'RS바이러스 정보 감사해요! 요즘 진짜 조심해야겠어요', NOW() - INTERVAL '2 hours');

-- Empathy polls
INSERT INTO empathy_polls (question, option_a, option_b) VALUES
('아기 울 때 바로 안아주는 편 vs 잠시 기다려보는 편?', '바로 안아줘요', '잠시 기다려봐요'),
('이유식 직접 만드는 편 vs 시판 이유식 활용하는 편?', '직접 만들어요', '시판 활용해요'),
('육아 정보 검색 vs 경험맘 조언, 더 신뢰하는 것은?', '검색/전문가 정보', '경험맘 조언');

-- Daily questions
INSERT INTO daily_questions (question, active_date) VALUES
('오늘 아기와 가장 행복했던 순간은 언제였나요?', CURRENT_DATE),
('육아하면서 가장 뿌듯했던 경험을 공유해주세요!', CURRENT_DATE - INTERVAL '1 day'),
('밤잠 재우기 꿀팁이 있다면 공유해주세요!', CURRENT_DATE - INTERVAL '2 days');

-- Articles
INSERT INTO articles (title, body, category, tags) VALUES
('11개월 아기 발달 체크리스트', '11개월 아기의 대근육, 소근육, 언어, 인지 발달 단계별 체크리스트를 안내합니다. 이 시기의 아기는 혼자 서기를 시도하고, 엄마 아빠를 부르기 시작합니다.', 'dev', '#발달 #11개월 #체크리스트'),
('이유식 시기별 완벽 가이드', '초기(4~6개월), 중기(7~9개월), 후기(10~12개월) 이유식 진행 방법과 주의사항을 정리했습니다.', 'nutrition', '#이유식 #가이드 #월령별'),
('예방접종 스케줄 총정리', '국가 필수 예방접종부터 선택 접종까지, 월령별 접종 스케줄과 주의사항을 정리했습니다.', 'health', '#예방접종 #스케줄 #건강'),
('수면교육, 언제 어떻게 시작할까?', '수면교육의 적절한 시작 시기와 다양한 방법(퍼버법, 체어메서드 등)을 소개합니다.', 'dev', '#수면교육 #밤잠 #퍼버법'),
('알레르기 유발 식품 안전 가이드', '영유아 식품 알레르기의 원인, 증상, 대처법을 상세히 안내합니다.', 'health', '#알레르기 #식품 #안전'),
('월령별 대근육 발달 이정표', '목가누기부터 걷기까지, 월령별 대근육 발달 이정표와 도움되는 놀이를 소개합니다.', 'dev', '#대근육 #발달 #이정표');

-- Vote campaigns
INSERT INTO vote_campaigns (title, description, icon, bg_gradient, status, participant_count, criteria_count, days_remaining) VALUES
('아기 로션 기준 세우기', '우리 아기 피부에 안전한 로션의 기준을 함께 만들어요', '🧴', 'linear-gradient(135deg,#FFB6C1,#FF69B4)', 'live', 234, 4, 12),
('아기 물티슈 기준', '안전한 물티슈 성분 기준을 함께 정해요', '🧻', 'linear-gradient(135deg,#87CEEB,#4169E1)', 'live', 189, 3, 8),
('유모차 기준 세우기', '활동성과 안전성을 고려한 유모차 기준', '🧸', 'linear-gradient(135deg,#98FB98,#2E8B57)', 'ended', 312, 5, 0),
('이유식 도구 기준', '안전한 이유식 도구의 기준을 만들어요', '🍽️', 'linear-gradient(135deg,#DDA0DD,#8B008B)', 'live', 156, 3, 20);

-- Vote criteria
INSERT INTO vote_criteria (campaign_id, name, description, sort_order) VALUES
(1, 'EWG 그린 등급 성분', '미국 환경단체 EWG 기준 안전 등급', 1),
(1, '무향료/무색소', '인공 향료와 색소가 첨가되지 않은 제품', 2),
(1, '피부과 테스트 완료', '피부과 전문의 임상 테스트를 통과한 제품', 3),
(1, '국내 안전인증 획득', 'KC 인증 등 국내 안전 기준을 충족한 제품', 4),
(2, '성분 안전성', '유해 성분이 포함되지 않은 제품', 1),
(2, 'pH 밸런스', '아기 피부에 적합한 pH 수준', 2),
(2, '생분해성', '환경 친화적인 생분해 가능 소재', 3);

-- Approved products
INSERT INTO approved_products (campaign_id, name, brand, price, emoji, bg_gradient, safety_grade, ewg_grade, criteria_met) VALUES
(1, '베이비 수딩 로션', '아토팜', '18,900원', '🧴', 'linear-gradient(135deg,#FFB6C1,#FF69B4)', 'A', 'EWG 그린', '기준 4/4 충족'),
(1, '더마 베이비 로션', '세타필', '22,000원', '🧴', 'linear-gradient(135deg,#E6E6FA,#9370DB)', 'A', 'EWG 그린', '기준 4/4 충족'),
(1, '센시티브 베이비 로션', '아벤느', '25,500원', '🧴', 'linear-gradient(135deg,#FFE4B5,#DEB887)', 'B', 'EWG 옐로', '기준 3/4 충족'),
(2, '순수 물티슈', '마더케이', '12,900원', '🧻', 'linear-gradient(135deg,#87CEEB,#4169E1)', 'A', 'EWG 그린', '기준 3/3 충족'),
(2, '아기 물티슈 100매', '베베숲', '9,900원', '🧻', 'linear-gradient(135deg,#B0E0E6,#5F9EA0)', 'A', 'EWG 그린', '기준 3/3 충족');

-- Ingredient tags
INSERT INTO ingredient_tags (product_id, name, is_safe) VALUES
(1, '세라마이드', TRUE), (1, '히알루론산', TRUE), (1, '시어버터', TRUE),
(2, '판테놀', TRUE), (2, '세라마이드', TRUE), (2, '글리세린', TRUE),
(3, '열천수', TRUE), (3, '글리세린', TRUE), (3, '향료', FALSE);

-- Co-parenting groups
INSERT INTO coparenting_groups (creator_id, title, description, location, schedule, max_members, status) VALUES
(1, '🌳 강남 놀이터 탐험대', '매주 토요일 강남 지역 다양한 놀이터를 탐험해요', '📍 강남구 · 1.2km', '📅 매주 토요일 10:00', 12, 'open'),
(2, '🍚 이유식 같이 만들기', '함께 이유식 만들고 나눠요', '📍 서초구 · 2.0km', '📅 격주 수요일 14:00', 8, 'open'),
(3, '📖 그림책 읽기 모임', '아이에게 그림책 읽어주는 모임', '📍 송파구 · 0.8km', '📅 매주 금요일 11:00', 10, 'full'),
(5, '🧘 산후 요가 맘모임', '산후 회복을 위한 요가 모임', '📍 강동구 · 3.5km', '📅 매주 화요일 10:30', 6, 'open');

-- Group tags
INSERT INTO group_tags (group_id, tag) VALUES
(1, '야외활동'), (1, '놀이터'), (1, '주말'),
(2, '이유식'), (2, '요리'), (2, '평일'),
(3, '그림책'), (3, '독서'), (3, '교육'),
(4, '요가'), (4, '건강'), (4, '산후');

-- Group members
INSERT INTO group_members (group_id, user_id, role) VALUES
(1, 1, 'leader'), (1, 2, 'member'), (1, 3, 'member'), (1, 4, 'member'),
(1, 5, 'member'), (1, 6, 'member'),
(2, 2, 'leader'), (2, 1, 'member'), (2, 4, 'member'), (2, 5, 'member'),
(3, 3, 'leader'), (3, 1, 'member'), (3, 2, 'member'), (3, 4, 'member'),
(3, 5, 'member'), (3, 6, 'member'),
(4, 5, 'leader'), (4, 1, 'member'), (4, 6, 'member');

-- Review campaigns
INSERT INTO review_campaigns (brand, product_name, emoji, bg_gradient, period, slots, star_reward, review_dest, info, status, applicant_count, ends_at) VALUES
('베이비그로우', '스마트 키재기', '📏', 'linear-gradient(135deg,#FF9A9E,#FAD0C4)', '2026.03.01 ~ 2026.03.15', 5, 10, '네이버 블로그', '초음파 센서로 정확한 키 측정이 가능한 스마트 기기', 'live', 102, NOW() + INTERVAL '13 days'),
('아토팜', 'MLE 크림 로션', '🧴', 'linear-gradient(135deg,#A18CD1,#FBC2EB)', '2026.03.01 ~ 2026.03.20', 10, 15, '쿠팡 리뷰', '민감한 아기 피부를 위한 세라마이드 크림 로션', 'live', 87, NOW() + INTERVAL '18 days'),
('닥터브라운', '옵션스+ 젖병', '🍼', 'linear-gradient(135deg,#84FAB0,#8FD3F4)', '2026.02.15 ~ 2026.02.28', 3, 8, '인스타그램', '배앓이 방지 내부 기압 조절 젖병', 'ended', 156, NOW() - INTERVAL '2 days');

-- Review conditions
INSERT INTO review_conditions (campaign_id, condition_text, sort_order) VALUES
(1, '제품 수령 후 7일 이내 1차 사용기 작성', 1),
(1, '14일 이내 상세 리뷰 (사진 5장 이상 포함)', 2),
(1, '아기 실제 키 측정 비교 사진 필수', 3),
(1, '소행성 커뮤니티에 사용 후기 공유', 4),
(2, '제품 수령 후 7일 이내 언박싱 리뷰', 1),
(2, '14일 이상 사용 후 상세 리뷰 작성', 2),
(2, '아기 피부 변화 사진 비교 포함', 3),
(2, '쿠팡 구매평 500자 이상 작성', 4);

-- Raffle campaigns
INSERT INTO raffle_campaigns (brand, product_name, emoji, bg_gradient, period, announce_date, quantity, star_cost, status, applicant_count) VALUES
('아가드', '핸디 부스터', '🪑', 'linear-gradient(135deg,#FFC3A0,#FFAFBD)', '2026.03.01 ~ 2026.03.10', '2026.03.12', 1, 60, 'live', 45),
('젤리캣', '버니 인형', '🐰', 'linear-gradient(135deg,#C9FFBF,#FFAFBD)', '2026.03.05 ~ 2026.03.15', '2026.03.17', 2, 40, 'live', 32);

-- Exchange items
INSERT INTO exchange_items (name, emoji, bg_gradient, star_price, stock, is_limited) VALUES
('베이비스탠다드 수딩 로션', '🧴', 'linear-gradient(135deg,#FFB6C1,#FF69B4)', 3000, 5, TRUE),
('베이비스탠다드 물티슈 10팩', '🧻', 'linear-gradient(135deg,#87CEEB,#4169E1)', 3000, 8, TRUE),
('베이비스탠다드 기저귀 샘플팩', '👶', 'linear-gradient(135deg,#DDA0DD,#8B008B)', 5000, 3, TRUE),
('소행성 오리지널 턱받이 세트', '🎀', 'linear-gradient(135deg,#98FB98,#2E8B57)', 2000, 12, FALSE);

-- Star transactions for demo user
INSERT INTO star_transactions (user_id, amount, type, description) VALUES
(1, 100, 'signup', '회원가입 보너스'),
(1, 50, 'vote', '아기 로션 투표 참여'),
(1, 200, 'review', '제품 리뷰 작성'),
(1, 30, 'daily', '출석 체크'),
(1, -60, 'raffle', '래플 응모'),
(1, 50, 'vote', '물티슈 투표 참여');

-- Notifications for demo user
INSERT INTO notifications (user_id, type, title, body, is_read) VALUES
(1, 'community', '서연맘님이 회원님의 글에 공감했어요', '이유식 메뉴 추천 글에 공감 반응이 달렸습니다', FALSE),
(1, 'vote', '아기 로션 투표가 곧 마감됩니다', '12일 후 투표가 마감됩니다. 아직 참여하지 않으셨다면 지금 참여해보세요!', FALSE),
(1, 'review', '리뷰약속 신청이 접수되었습니다', '베이비그로우 스마트 키재기 리뷰약속 신청이 정상 접수되었습니다', TRUE),
(1, 'community', '민준맘님이 댓글을 남겼어요', '채소 스틱으로 만들어서 직접 잡고 먹게 하면 재미있어 하더라고요~', FALSE);
