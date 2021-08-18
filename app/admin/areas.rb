ActiveAdmin.register Area do
  permit_params :title, :description, :max_zoom, :hidden
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :number, :notice, :longitude, :latitude
  #
  # or
  #
  # permit_params do
  #   permitted = [:number, :notice, :longitude, :latitude]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  index do
    selectable_column
    id_column
    column :title
    column :description
    column :max_zoom
    column :created_at
    actions
  end

  form do |f|
    f.inputs do
      f.input :title
      f.input :description
      f.input :max_zoom
      f.input :hidden, as: :boolean
    end
    f.actions
  end

  show do
    attributes_table do
      row :title
      row :description
      row :max_zoom
      row :hidden
      row :created_at
    end
    active_admin_comments
  end
end
