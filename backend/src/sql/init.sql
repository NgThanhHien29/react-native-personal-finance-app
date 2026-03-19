-- create database
create database if not exists personal_finance_db;
use personal_finance_db;

-- Users table
create table if not exists users(
	id int auto_increment primary key,
    username varchar(50) unique not null,
    email varchar(100) unique not null,
    password varchar(255) not null,
    created_at timestamp default current_timestamp
);

-- Categories table
create table if not exists categories (
	id int auto_increment primary key,
    user_id int not null,
    category_name varchar(50) not null,
    icon varchar(50),
    color varchar(7) default '#FF6B6B',
    created_at timestamp default current_timestamp,
    foreign key (user_id) references users(id),
    unique key unique_category (user_id, category_name)
);

-- transactions table
create table if not exists transactions (
	id int auto_increment primary key,
    user_id int not null,
    category_id int not null,
    amount decimal(10, 2) not null,
    description varchar(255),
    date date not null,
    type enum('income', 'expense') default 'expense',
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    foreign key (user_id) references users(id) on delete cascade,
    foreign key (category_id) references categories(id) on delete cascade
);

-- Budgets table
create table if not exists bubgets (
	id int auto_increment primary key,
    user_id int not null,
    category_id int not null,
    amount decimal(10, 2) not null,
    month int not null,
    year int not null,
    created_at timestamp default current_timestamp,
    foreign key (user_id) references users(id) on delete cascade,
    foreign key (category_id) references categories(id) on delete cascade,
    unique key unique_budget (user_id, category_id, month, year)
);

-- indexes for performance
create index idx_user_transactions on transactions(user_id);
create index idx_category_transactions on transactions(category_id);
create index idx_transaction_date on transactions(date);
create index idx_user_categories on categories(user_id);

drop database personal_finance_db;
use personal_finance_db;
select * from users where id = 1;
select * from categories where user_id = 1; 
select * from transactions where user_id = 1;

use personal_finance_db;
SELECT SUM(amount) as total_income FROM transactions WHERE user_id = 1 AND type = 'income';

select * from transactions;

select * from categories;

ALTER TABLE categories CHANGE name category_name VARCHAR(50);
DESCRIBE categories;


