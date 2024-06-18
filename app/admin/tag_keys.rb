ActiveAdmin.register TagKey do
  permit_params :name, :label

  index do
    id_column
    column :name
    column :label
    column :created_at
    column :updated_at
    actions
  end

  form do |f|
    f.inputs "TagKey" do
      f.input :name
      f.input :label
    end

    f.actions
  end
end
