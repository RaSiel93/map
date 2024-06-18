ActiveAdmin.register TagValue do
  permit_params :name, :label, :tag_key_id

  index do
    id_column
    column :name
    column :label
    column :tag_key
    column :created_at
    column :updated_at
    actions
  end

  form do |f|
    f.inputs "TagValue" do
      f.input :name
      f.input :label
      f.input :tag_key
    end

    f.actions
  end
end
