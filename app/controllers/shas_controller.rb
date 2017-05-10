class ShasController < ApplicationController
  def show
    render plain: `git rev-parse HEAD`
  end
end
