# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル
<!-- モデルファイル名は、 userモデル -->

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false, unique: true|
|encrypted_password|string|null: false|

### Association
- has_many :users_groups
- has_many :groups, through: :users_groups
- has_many :messages


## groupsテーブル
<!-- モデルファイル名は、 groupモデル -->
|Column|Type|Options|
|------|----|-------|
|name|strung|null: false, unique: true;|
<!-- unique: true;追加 -->

### Association
- has_many :users_groups
- has_many :users, through: :users_groups
- has_many :messages

## group_usersテーブル
<!-- モデルファイル名は、 group_userモデル -->
|Column|Type|Options|
|------|----|-------|
|user|references|foreign_key: true|
|group|references|foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
<!-- モデル名は、messageモデル -->
|Column|Type|Options|
|------|----|-------|
|comment|text|------|
|image|text|--------|
|user|references|foreign_key: true|
|group|references|foreign_key: true|
|------|timestamps|null: false|

### Association
- belong_to :user
- belong_to :group
