-- 소행성 DB Schema

-- Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nickname VARCHAR(50) UNIQUE NOT NULL,
  avatar VARCHAR(20) DEFAULT '🐥',
  avatar_gradient VARCHAR(10) DEFAULT 'g1',
  bio TEXT,
  tier VARCHAR(20) DEFAULT '새싹맘',
  star_chips INT DEFAULT 0,
  member_since DATE DEFAULT CURRENT_DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Children
CREATE TABLE IF NOT EXISTS children (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(50),
  birth_date DATE NOT NULL,
  gender VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User blocks
CREATE TABLE IF NOT EXISTS user_blocks (
  id SERIAL PRIMARY KEY,
  blocker_id INT REFERENCES users(id) ON DELETE CASCADE,
  blocked_id INT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(blocker_id, blocked_id)
);

-- Topics
CREATE TABLE IF NOT EXISTS topics (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(20),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Month groups
CREATE TABLE IF NOT EXISTS month_groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  min_months INT,
  max_months INT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Posts
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  topic_id INT REFERENCES topics(id),
  month_group_id INT REFERENCES month_groups(id),
  body TEXT NOT NULL,
  tags VARCHAR(500),
  image_url VARCHAR(500),
  is_popular BOOLEAN DEFAULT FALSE,
  view_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Reactions (6 types)
CREATE TABLE IF NOT EXISTS reactions (
  id SERIAL PRIMARY KEY,
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(post_id, user_id, type)
);

-- Comments
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  parent_id INT REFERENCES comments(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Empathy polls
CREATE TABLE IF NOT EXISTS empathy_polls (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  option_a VARCHAR(200) NOT NULL,
  option_b VARCHAR(200) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS empathy_votes (
  id SERIAL PRIMARY KEY,
  poll_id INT REFERENCES empathy_polls(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  choice VARCHAR(1) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(poll_id, user_id)
);

-- Daily questions
CREATE TABLE IF NOT EXISTS daily_questions (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  active_date DATE UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS daily_answers (
  id SERIAL PRIMARY KEY,
  question_id INT REFERENCES daily_questions(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  likes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(question_id, user_id)
);

-- Articles (information)
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  body TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  tags VARCHAR(500),
  thumbnail_url VARCHAR(500),
  view_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Vote campaigns (standard)
CREATE TABLE IF NOT EXISTS vote_campaigns (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  icon VARCHAR(20),
  bg_gradient VARCHAR(100),
  status VARCHAR(20) DEFAULT 'live',
  participant_count INT DEFAULT 0,
  criteria_count INT DEFAULT 0,
  days_remaining INT DEFAULT 30,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vote_criteria (
  id SERIAL PRIMARY KEY,
  campaign_id INT REFERENCES vote_campaigns(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_votes (
  id SERIAL PRIMARY KEY,
  campaign_id INT REFERENCES vote_campaigns(id) ON DELETE CASCADE,
  criteria_id INT REFERENCES vote_criteria(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  score INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(campaign_id, criteria_id, user_id)
);

-- Approved products
CREATE TABLE IF NOT EXISTS approved_products (
  id SERIAL PRIMARY KEY,
  campaign_id INT REFERENCES vote_campaigns(id),
  name VARCHAR(200) NOT NULL,
  brand VARCHAR(100),
  price VARCHAR(50),
  emoji VARCHAR(20),
  bg_gradient VARCHAR(100),
  safety_grade VARCHAR(5) DEFAULT 'A',
  ewg_grade VARCHAR(20),
  criteria_met VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ingredient_tags (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES approved_products(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  is_safe BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS product_reviews (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES approved_products(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  rating INT DEFAULT 5,
  body TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS expert_tips (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES approved_products(id),
  campaign_id INT REFERENCES vote_campaigns(id),
  expert_name VARCHAR(100),
  tip_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Co-parenting groups
CREATE TABLE IF NOT EXISTS coparenting_groups (
  id SERIAL PRIMARY KEY,
  creator_id INT REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  location VARCHAR(200),
  schedule VARCHAR(200),
  max_members INT DEFAULT 12,
  status VARCHAR(20) DEFAULT 'open',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS group_tags (
  id SERIAL PRIMARY KEY,
  group_id INT REFERENCES coparenting_groups(id) ON DELETE CASCADE,
  tag VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS group_members (
  id SERIAL PRIMARY KEY,
  group_id INT REFERENCES coparenting_groups(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

CREATE TABLE IF NOT EXISTS meetup_verifications (
  id SERIAL PRIMARY KEY,
  group_id INT REFERENCES coparenting_groups(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  meeting_date DATE NOT NULL,
  place VARCHAR(200),
  member_count INT,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS verification_photos (
  id SERIAL PRIMARY KEY,
  verification_id INT REFERENCES meetup_verifications(id) ON DELETE CASCADE,
  photo_url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Review campaigns (market)
CREATE TABLE IF NOT EXISTS review_campaigns (
  id SERIAL PRIMARY KEY,
  brand VARCHAR(100),
  product_name VARCHAR(200) NOT NULL,
  emoji VARCHAR(20),
  bg_gradient VARCHAR(100),
  period VARCHAR(100),
  slots INT DEFAULT 5,
  star_reward INT DEFAULT 10,
  review_dest VARCHAR(100),
  info TEXT,
  status VARCHAR(20) DEFAULT 'live',
  applicant_count INT DEFAULT 0,
  ends_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS review_conditions (
  id SERIAL PRIMARY KEY,
  campaign_id INT REFERENCES review_campaigns(id) ON DELETE CASCADE,
  condition_text VARCHAR(500) NOT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS review_applications (
  id SERIAL PRIMARY KEY,
  campaign_id INT REFERENCES review_campaigns(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(campaign_id, user_id)
);

-- Raffles
CREATE TABLE IF NOT EXISTS raffle_campaigns (
  id SERIAL PRIMARY KEY,
  brand VARCHAR(100),
  product_name VARCHAR(200) NOT NULL,
  emoji VARCHAR(20),
  bg_gradient VARCHAR(100),
  period VARCHAR(100),
  announce_date VARCHAR(100),
  quantity INT DEFAULT 1,
  star_cost INT DEFAULT 50,
  status VARCHAR(20) DEFAULT 'live',
  applicant_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS raffle_entries (
  id SERIAL PRIMARY KEY,
  raffle_id INT REFERENCES raffle_campaigns(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(raffle_id, user_id)
);

-- Exchange items
CREATE TABLE IF NOT EXISTS exchange_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  emoji VARCHAR(20),
  bg_gradient VARCHAR(100),
  star_price INT NOT NULL,
  stock INT DEFAULT 10,
  is_limited BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Star transactions
CREATE TABLE IF NOT EXISTS star_transactions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  amount INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  description VARCHAR(300),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(300) NOT NULL,
  body TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notification_settings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  community BOOLEAN DEFAULT TRUE,
  votes BOOLEAN DEFAULT TRUE,
  reviews BOOLEAN DEFAULT TRUE,
  groups BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Lounge messages
CREATE TABLE IF NOT EXISTS lounge_messages (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  month_group_id INT REFERENCES month_groups(id),
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_posts_user ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_topic ON posts(topic_id);
CREATE INDEX IF NOT EXISTS idx_posts_month ON posts(month_group_id);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_popular ON posts(is_popular, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reactions_post ON reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_lounge_month ON lounge_messages(month_group_id, created_at DESC);
