import { sequelize } from '../database.js';
import { DataTypes } from 'sequelize';
import User from './userModal.js';
import Mess from './messModel.js';
const Feedback = sequelize.define(
  'Feedback',
  {
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    messId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Mess,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Feedback',
    tableName: 'Feedbacks',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'messId'], // Define unique index here
      },
    ],
  }
);

// Set up associations
Feedback.belongsTo(User, { foreignKey: 'userId' });
Feedback.belongsTo(Mess, { foreignKey: 'messId' });

// Helper function to calculate average ratings
const updateRatingsAverage = async (messId) => {
  try {
    const feedbacks = await Feedback.findAll({
      where: { messId },
      attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']],
    });

    const averageRating = feedbacks[0]?.dataValues.averageRating || 0;

    // Update the ratingsAverage and ratingsQuantity in Mess table
    await Mess.update(
      {
        ratingsAverage: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
        ratingsQuantity: await Feedback.count({ where: { messId } }),
      },
      { where: { id: messId } }
    );
  } catch (error) {
    console.error('Error updating ratingsAverage:', error);
  }
};

// Hooks for updating ratingsAverage
Feedback.afterCreate(async (feedback, options) => {
  await updateRatingsAverage(feedback.messId);
});

Feedback.afterUpdate(async (feedback, options) => {
  await updateRatingsAverage(feedback.messId);
});

Feedback.afterDestroy(async (feedback, options) => {
  await updateRatingsAverage(feedback.messId);
});

export default Feedback;
