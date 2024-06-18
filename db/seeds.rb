# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?

tag_key = TagKey.create({ name: 'admin_level' })
tag_key.tag_values.new(%w[2 4 6 8 9].map { |value| { name: value } })
tag_key.save

tag_key = TagKey.create({ name: 'place' })
tag_key.tag_values.new(%w[city].map { |value| { name: value } })
tag_key.save

Tag.all.each do |tag|
  tag.update(key: TagKey.find_by(name: tag.draft_key), value: TagValue.find_by(name: tag.draft_value))
end
