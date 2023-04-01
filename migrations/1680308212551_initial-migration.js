/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    "messages",
    {
      message_id: "id",
      user_id: { type: "int", notNull: true },
      created_at: {
        type: "timestamp",
        notNull: true,
      },
      text: { type: "varchar(1000)", notNull: true },
    },
    {
      ifNotExists: true,
    }
  );
  pgm.createIndex("messages", "message_id");

  pgm.createTable(
    "users",
    {
      user_id: { type: "int", notNull: true },
      user_name: { type: "varchar(1000)", notNull: true },
    },
    {
      ifNotExists: true,
    }
  );

  pgm.createIndex("users", "user_id");
};

exports.down = (pgm) => {
  pgm.dropTable("messages", {
    ifExists: true,
  });
  pgm.dropTable("users", {
    ifExists: true,
  });
};
