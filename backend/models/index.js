const { sequelize, Sequelize } = require('../config/database');

const User = require('./User');
const Child = require('./Child');
const UserBlock = require('./UserBlock');
const Topic = require('./Topic');
const MonthGroup = require('./MonthGroup');
const Post = require('./Post');
const Reaction = require('./Reaction');
const Comment = require('./Comment');
const EmpathyPoll = require('./EmpathyPoll');
const EmpathyVote = require('./EmpathyVote');
const DailyQuestion = require('./DailyQuestion');
const DailyAnswer = require('./DailyAnswer');
const Article = require('./Article');
const VoteCampaign = require('./VoteCampaign');
const VoteCriteria = require('./VoteCriteria');
const UserVote = require('./UserVote');
const ApprovedProduct = require('./ApprovedProduct');
const IngredientTag = require('./IngredientTag');
const ProductReview = require('./ProductReview');
const ExpertTip = require('./ExpertTip');
const CoparentingGroup = require('./CoparentingGroup');
const GroupTag = require('./GroupTag');
const GroupMember = require('./GroupMember');
const MeetupVerification = require('./MeetupVerification');
const VerificationPhoto = require('./VerificationPhoto');
const ReviewCampaign = require('./ReviewCampaign');
const ReviewCondition = require('./ReviewCondition');
const ReviewApplication = require('./ReviewApplication');
const RaffleCampaign = require('./RaffleCampaign');
const RaffleEntry = require('./RaffleEntry');
const ExchangeItem = require('./ExchangeItem');
const StarTransaction = require('./StarTransaction');
const Notification = require('./Notification');
const NotificationSetting = require('./NotificationSetting');
const LoungeMessage = require('./LoungeMessage');

// Associations
User.hasMany(Child, { foreignKey: 'user_id' });
Child.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });
Post.belongsTo(Topic, { foreignKey: 'topic_id' });
Post.belongsTo(MonthGroup, { foreignKey: 'month_group_id' });

Post.hasMany(Reaction, { foreignKey: 'post_id' });
Reaction.belongsTo(Post, { foreignKey: 'post_id' });
Reaction.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.hasMany(Comment, { as: 'replies', foreignKey: 'parent_id' });
Comment.belongsTo(Comment, { as: 'parent', foreignKey: 'parent_id' });

EmpathyPoll.hasMany(EmpathyVote, { foreignKey: 'poll_id' });
EmpathyVote.belongsTo(EmpathyPoll, { foreignKey: 'poll_id' });

DailyQuestion.hasMany(DailyAnswer, { foreignKey: 'question_id' });
DailyAnswer.belongsTo(DailyQuestion, { foreignKey: 'question_id' });
DailyAnswer.belongsTo(User, { foreignKey: 'user_id' });

VoteCampaign.hasMany(VoteCriteria, { foreignKey: 'campaign_id' });
VoteCriteria.belongsTo(VoteCampaign, { foreignKey: 'campaign_id' });

VoteCampaign.hasMany(ApprovedProduct, { foreignKey: 'campaign_id' });
ApprovedProduct.belongsTo(VoteCampaign, { foreignKey: 'campaign_id' });

ApprovedProduct.hasMany(IngredientTag, { foreignKey: 'product_id' });
IngredientTag.belongsTo(ApprovedProduct, { foreignKey: 'product_id' });

ApprovedProduct.hasMany(ProductReview, { foreignKey: 'product_id' });
ProductReview.belongsTo(ApprovedProduct, { foreignKey: 'product_id' });
ProductReview.belongsTo(User, { foreignKey: 'user_id' });

CoparentingGroup.hasMany(GroupTag, { foreignKey: 'group_id' });
GroupTag.belongsTo(CoparentingGroup, { foreignKey: 'group_id' });

CoparentingGroup.hasMany(GroupMember, { foreignKey: 'group_id' });
GroupMember.belongsTo(CoparentingGroup, { foreignKey: 'group_id' });
GroupMember.belongsTo(User, { foreignKey: 'user_id' });

CoparentingGroup.belongsTo(User, { as: 'creator', foreignKey: 'creator_id' });

MeetupVerification.hasMany(VerificationPhoto, { foreignKey: 'verification_id' });
VerificationPhoto.belongsTo(MeetupVerification, { foreignKey: 'verification_id' });

ReviewCampaign.hasMany(ReviewCondition, { foreignKey: 'campaign_id' });
ReviewCondition.belongsTo(ReviewCampaign, { foreignKey: 'campaign_id' });

ReviewCampaign.hasMany(ReviewApplication, { foreignKey: 'campaign_id' });
ReviewApplication.belongsTo(ReviewCampaign, { foreignKey: 'campaign_id' });
ReviewApplication.belongsTo(User, { foreignKey: 'user_id' });

RaffleCampaign.hasMany(RaffleEntry, { foreignKey: 'raffle_id' });
RaffleEntry.belongsTo(RaffleCampaign, { foreignKey: 'raffle_id' });

User.hasMany(StarTransaction, { foreignKey: 'user_id' });
User.hasMany(Notification, { foreignKey: 'user_id' });
User.hasOne(NotificationSetting, { foreignKey: 'user_id' });

LoungeMessage.belongsTo(User, { foreignKey: 'user_id' });
LoungeMessage.belongsTo(MonthGroup, { foreignKey: 'month_group_id' });

module.exports = {
  sequelize, Sequelize,
  User, Child, UserBlock, Topic, MonthGroup,
  Post, Reaction, Comment,
  EmpathyPoll, EmpathyVote, DailyQuestion, DailyAnswer,
  Article, VoteCampaign, VoteCriteria, UserVote,
  ApprovedProduct, IngredientTag, ProductReview, ExpertTip,
  CoparentingGroup, GroupTag, GroupMember,
  MeetupVerification, VerificationPhoto,
  ReviewCampaign, ReviewCondition, ReviewApplication,
  RaffleCampaign, RaffleEntry, ExchangeItem,
  StarTransaction, Notification, NotificationSetting, LoungeMessage
};
