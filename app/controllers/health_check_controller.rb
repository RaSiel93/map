class HealthCheckController < ApplicationController
  rescue_from(Exception) { render body: nil, head: 503 }

  def show
    if ActiveRecord::Base.connection.exec_query('SELECT 1').rows.first == [1]
      render body: 'OK', head: 200
    else
      raise 'Unhealth'
    end
  end
end
