use db_controle_jogos_bb;

create table tbl_jogo (
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    data_lancamento date not null,
    versao varchar(10) not null,
    tamanho varchar(10),
    descricao text,
    foto_capa varchar(200), 
    link varchar(200) 
);

create table tbl_genero (
    id_genero int not null primary key auto_increment,
    nome varchar(50) unique not null
);

create table tbl_plataforma (
    id_plataforma int primary key not null auto_increment,
    nome varchar(100) unique not null
);

create table tbl_desenvolvedora (
    id_desenvolvedora int primary key not null auto_increment,
    nome varchar(100) unique not null,
    descricao text null   
);

create table tbl_sexo (
    id_sexo int primary key not null auto_increment,
    nome varchar(20) unique not null,
    sigla varchar(1) unique not null
);

create table tbl_pais (
    id_pais int primary key not null auto_increment,
    nome varchar(60) unique not null,
    sigla varchar(2) unique not null,
    bandeira_pais varchar(200) not null
);

create table tbl_pontuacao (
    id_pontuacao int primary key not null auto_increment,
    nota int not null
);

-- alter table tbl_pais add bandeira_pais varchar(200) not null;
-- show tables;
-- desc tbl_pais;
-- drop table tbl_teste;