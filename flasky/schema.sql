drop table if exists entries;
create table entries (
  id integer primary key autoincrement,
  title text not null,
  'text' text not null
);
create table beer (
  id integer primary key autoincrement,
  name text not null,
  url text not null,
  description text,
);
create table user (
  id integer primary key autoincrement,
  name text not null,
  password text not null,
  email text,
)