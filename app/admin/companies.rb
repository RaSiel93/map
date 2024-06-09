ActiveAdmin.register Company do
  permit_params :name, :number, :notice, :area_id, :logo

  index do
    id_column
    column :name
    column :number
    column :notice
    column :area
    column :created_at
    column :updated_at
    actions
  end

  form do |f|
    f.inputs "Trip" do
      f.input :name
      f.input :number
      f.input :notice
      f.input :area_id
      f.input :logo, as: :file
    end

    f.actions
  end
end
