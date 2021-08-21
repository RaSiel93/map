ActiveAdmin.register Person do
  permit_params :first_name, :last_name, :middle_name, :birth_at, :notice, :area_id, :company_id

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  #
  # or
  #
  # permit_params do
  #   permitted = [:notice]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  filter :first_name
  filter :last_name
  filter :middle_name
  filter :birth_at
  filter :notice

  filter :company_name_cont, label: 'Праца'
  filter :area_title_cont, label: 'Месца жыхарства'
  filter :area_area_title_cont, label: 'Месца жыхарства (раён)'
end
