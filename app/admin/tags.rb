ActiveAdmin.register Tag do
  permit_params :key, :value, :area_id

  index do
    id_column
    column :key
    column :value
    column :area_id
    column :created_at
    column :updated_at
    actions
  end

  form do |f|
    f.inputs "Tag" do
      f.input :key
      f.input :value
      f.input :area_id
    end

    f.actions
  end
end
