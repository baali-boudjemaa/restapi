module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {

    id:{
      type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
    }
,
  title:  {
    type: Sequelize.STRING
  },
    short_description: {
      type: Sequelize.STRING
    },
    description:  {
      type: Sequelize.STRING
    },
    outcomes:  {
      type: Sequelize.STRING
    },
    language: {
      type: Sequelize.STRING
    },
    category_id:  {
      type: Sequelize.STRING
    },
    sub_category_id: {
      type: Sequelize.STRING
    },
    section: {
      type: Sequelize.STRING
    },
    requirements:  {
      type: Sequelize.STRING
    },
    price:  {
      type: Sequelize.STRING
    },
    discount_flag: {
      type: Sequelize.STRING
    },
    discounted_price: {
      type: Sequelize.STRING
    },
    level: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.STRING
    },
    thumbnail: {
      type: Sequelize.STRING
    },
    video_url: {
      type: Sequelize.STRING
    },
    date_added: {
      type: Sequelize.STRING
    },
    last_modified: {
      type: Sequelize.STRING
    },
    course_type: {
      type: Sequelize.STRING
    },
    is_top_course: {
      type: Sequelize.STRING
    },
    is_admin: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    course_overview_provider: {
      type: Sequelize.STRING
    },
    meta_keywords: {
      type: Sequelize.STRING
    },
    meta_description: {
      type: Sequelize.STRING
    },
    is_free_course: {
      type: Sequelize.STRING
    },
    multi_instructor: {
      type: Sequelize.STRING
    },
    creator: {
      type: Sequelize.STRING
    },
    rating: {
      type: Sequelize.STRING
    },
    number_of_ratings: {
      type: Sequelize.STRING
    },
    instructor_name: {
      type: Sequelize.STRING
    },
    total_enrollment: {
      type: Sequelize.STRING
    },
    shareable_link: {
      type: Sequelize.STRING
    }
});
  return Tutorial;
};

