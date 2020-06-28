module.exports = function (sequelize, DataTypes) {
  return sequelize.define("userInfo", {
    //birthdate, age, height,weight,goal
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isBefore: "2005-01-01",
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 110,
      },
    },
    heightInInches: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weightInPounds: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    goal: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};

// module.exports = (sequelize, DataTypes) => {
//   const UserInfo = sequelize.define("userinfo", {
//     dateOfBirth: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//       validate: {
//         isBefore: "2005-01-01",
//       },
//     },
//     age: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         max: 110,
//       },
//     },
//     heightInInches: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     weightInPounds: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     goal: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//   });
//   return UserInfo;
// };
