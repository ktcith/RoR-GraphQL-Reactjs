# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170423145100) do

  create_table "accounts", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "incident_users", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "incident_id"
    t.string   "role"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["incident_id"], name: "index_incident_users_on_incident_id"
    t.index ["user_id"], name: "index_incident_users_on_user_id"
  end

  create_table "incidents", force: :cascade do |t|
    t.integer  "account_id",                                    null: false
    t.string   "name",                                          null: false
    t.date     "started_on"
    t.date     "ended_on"
    t.string   "city"
    t.string   "state"
    t.text     "description"
    t.string   "status"
    t.integer  "operational_period_hours"
    t.string   "incident_type",            default: "incident", null: false
    t.string   "time_zone",                                     null: false
    t.boolean  "archived",                 default: false,      null: false
    t.float    "lat"
    t.float    "lng"
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
    t.integer  "created_by_id"
    t.string   "incident_classification"
    t.index ["account_id"], name: "index_incidents_on_account_id"
    t.index ["created_by_id"], name: "index_incidents_on_created_by_id"
  end

  create_table "memberships", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "account_id"
    t.string   "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.index ["account_id"], name: "index_memberships_on_account_id"
    t.index ["deleted_at"], name: "index_memberships_on_deleted_at"
    t.index ["user_id"], name: "index_memberships_on_user_id"
  end

  create_table "resource_categories", force: :cascade do |t|
    t.integer  "account_id"
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["account_id"], name: "index_resource_categories_on_account_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.boolean  "is_super"
    t.string   "access_token"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.integer  "failed_attempts",        default: 0,  null: false
    t.string   "unlock_token"
    t.datetime "locked_at"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "company_or_agency"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

end
