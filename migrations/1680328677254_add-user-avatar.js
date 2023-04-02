/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.alterTable("users", {
    levelSecurity: "ENABLE",
  });

  pgm.addColumn("users", {
    avatar: { type: "varchar(1000)", notNull: true },
  });
};

exports.down = (pgm) => {};
