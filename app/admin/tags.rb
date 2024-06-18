ActiveAdmin.register Tag do
  permit_params :tag_key_id, :tag_value_id, :area_id

  index do
    id_column
    column :key
    column :value
    column :area
    column :created_at
    column :updated_at
    actions
  end

  form do |f|
    f.inputs "Tag" do
      f.input :key
      f.input :value
      f.input :area
    end

    f.actions
  end
end
