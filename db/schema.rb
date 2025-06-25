# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2025_06_25_075134) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

# Could not dump table "areas" because of following StandardError
#   Unknown type 'geography' for column 'location'

  create_table "cars", force: :cascade do |t|
    t.string "number"
    t.string "notice"
    t.string "longitude"
    t.string "latitude"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.string "number"
    t.text "notice"
    t.bigint "area_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "logo_uid"
    t.string "logo_name"
    t.index ["area_id"], name: "index_companies_on_area_id"
  end

  create_table "notes", force: :cascade do |t|
    t.string "text"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "area_id"
    t.index ["area_id"], name: "index_notes_on_area_id"
  end

  create_table "people", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "middle_name"
    t.bigint "father_id"
    t.bigint "mother_id"
    t.datetime "birth_at"
    t.text "notice"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "company_id"
    t.bigint "area_id"
    t.index ["area_id"], name: "index_people_on_area_id"
    t.index ["company_id"], name: "index_people_on_company_id"
    t.index ["father_id"], name: "index_people_on_father_id"
    t.index ["mother_id"], name: "index_people_on_mother_id"
  end

  create_table "spatial_ref_sys", primary_key: "srid", id: :integer, default: nil, force: :cascade do |t|
    t.string "auth_name", limit: 256
    t.integer "auth_srid"
    t.string "srtext", limit: 2048
    t.string "proj4text", limit: 2048
    t.check_constraint "(srid > 0) AND (srid <= 998999)", name: "spatial_ref_sys_srid_check"
  end

  create_table "tag_keys", force: :cascade do |t|
    t.string "name"
    t.string "label"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tag_values", force: :cascade do |t|
    t.string "name"
    t.string "label"
    t.bigint "tag_key_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tag_key_id"], name: "index_tag_values_on_tag_key_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "draft_key"
    t.string "draft_value"
    t.bigint "area_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "tag_key_id", null: false
    t.bigint "tag_value_id", null: false
    t.index ["area_id"], name: "index_tags_on_area_id"
    t.index ["tag_key_id"], name: "index_tags_on_tag_key_id"
    t.index ["tag_value_id"], name: "index_tags_on_tag_value_id"
  end

  add_foreign_key "areas", "companies"
  add_foreign_key "notes", "areas"
  add_foreign_key "tag_values", "tag_keys"
  add_foreign_key "tags", "tag_keys"
  add_foreign_key "tags", "tag_values"
end
