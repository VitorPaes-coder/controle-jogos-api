create database if not exists db_controle_jogos_bb_vitor;

use db_controle_jogos_bb_vitor;

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
    descricao text null,
    logo varchar(250)
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

create table tbl_jogo_genero (
    id int not null primary key auto_increment,
    id_jogo int not null,
    id_genero int not null,
    constraint FK_JOGO_JOGO_GENERO
    foreign key (id_jogo) 
    references tbl_jogo(id),
    
    constraint FK_GENERO_JOGO_GENERO
    foreign key (id_genero) 
    references tbl_genero(id_genero)
);

create table tbl_usuario (
    id_usuario int not null primary key auto_increment,
    nome varchar(20) not null,
    email varchar(80) not null,
    senha varchar(20) not null,
    data_nascimento date not null,
    telefone varchar(20),
    biografia text,
    foto_perfil varchar(250),
    id_sexo int not null,
    id_pais int not null,
    constraint FK_SEXO_USUARIO
    foreign key (id_sexo) 
    references tbl_sexo(id_sexo),
    
    constraint FK_PAIS_USUARIO
    foreign key (id_pais) 
    references tbl_pais(id_pais)
);

create table tbl_avaliacao (
    id_avaliacao int not null primary key auto_increment,
    data date not null,
    comentario text,
    nota int not null,
    id_usuario int not null,
    id_jogo int not null,
    
    constraint FK_USUARIO_AVALIACAO
    foreign key (id_usuario) 
    references tbl_usuario(id_usuario),
    
    constraint FK_JOGO_AVALIACAO
    foreign key (id_jogo) 
    references tbl_jogo(id)
);

create table tbl_jogo_plataforma (
    id int not null primary key auto_increment,
    id_jogo int not null,
    id_plataforma int not null,
    constraint FK_JOGO_JOGO_PLATAFORMA
    foreign key (id_jogo) 
    references tbl_jogo(id),
    
    constraint FK_PLATAFORMA_JOGO_PLATAFORMA
    foreign key (id_plataforma) 
    references tbl_plataforma(id_plataforma)
);

create table tbl_jogo_desenvolvedora (
    id int not null primary key auto_increment,
    id_jogo int not null,
    id_desenvolvedora int not null,
    constraint FK_JOGO_JOGO_DESENVOLVEDORA
    foreign key (id_jogo) 
    references tbl_jogo(id),
    
    constraint FK_DESENVOLVEDORA_JOGO_DESENVOLVEDORA
    foreign key (id_desenvolvedora) 
    references tbl_desenvolvedora(id_desenvolvedora)
);

create table tbl_pais_desenvolvedora (
    id int not null primary key auto_increment,
    id_desenvolvedora int not null,
    id_pais int not null,
    constraint FK_DESENVOLVEDORA_PAIS_DESENVOLVEDORA
    foreign key (id_desenvolvedora) 
    references tbl_desenvolvedora(id_desenvolvedora),
    
    constraint FK_PAIS_PAIS_DESENVOLVEDORA
    foreign key (id_pais) 
    references tbl_pais(id_pais)
);

-- desc tbl_pais;
-- show tables;
-- alter table tbl_desenvolvedora add logo varchar(250);
-- alter table tbl_avaliacao add nota INT NOT NULL;