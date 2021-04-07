use master
go

create database punktator
GO

use punktator
GO

create table users
(
    id       int identity
        constraint users_pk
            primary key nonclustered,
    username varchar(200)  not null,
    password varchar(200)  not null,
    is_admin bit default 0 not null
)
go

create unique index users_id_uindex
    on users (id)
go

INSERT INTO punktator.dbo.users (username, password, is_admin) VALUES ('admin', 'admin', 1)
go

create table clients
(
    id            int identity
        constraint clients_pk
            primary key nonclustered,
    name          varchar(100)     not null,
    surname       varchar(100)     not null,
    postal_code   varchar(6),
    city          varchar(100),
    street        varchar(100),
    street_number varchar(100),
    phone_number  varchar(20),
    card_number   varchar(200)     not null,
    points        bigint default 0 not null
)
go

create unique index clients_id_uindex
    on clients (id)
go

create table log
(
    id          int identity
        constraint log_pk
            primary key nonclustered,
    user_id     int          not null
        constraint log_users_id_fk
            references users,
    action_name varchar(254) not null,
    value       varchar(max) not null,
    date        date
)
go

create unique index log_id_uindex
    on log (id)
go