class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :set_headers
  before_action :set_session
  before_action :set_raven_context

  skip_before_action :authenticate_user!, if: :devise_controller?
  layout ->{devise_controller? ? 'devise' : 'application'}

  rescue_from CanCan::AccessDenied do |exception|
    render file: "#{Rails.root}/public/403.html", status: 403, layout: false
  end

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  protected

  def authenticate_user!
    if current_user
      super
    else
      redirect_to root_path(redirect_to: request.fullpath)
    end
  end

  def authenticate_user_from_token!
    auth_token = request.headers['Authorization']
    # return authentication_error unless auth_token
    authenticate_with_auth_token auth_token if auth_token.present? && auth_token != "null"
  end

  def authenticate_with_auth_token(auth_token)
    # return if the token does not have the right format
    return unless auth_token.include?(':')

    # Find the user by splitting the token and finding by id
    # Again, not the most secure way to do it, but works as an example.
    user_id = auth_token.split(':').first
    user = User.where(id: user_id).first

    # Use secure_compare to mitigate timing attacks
    if user && Devise.secure_compare(user.access_token, auth_token)
      sign_in user, store: true
    else
      # authentication_error
    end
  end

  def authentication_error
    render json: {error: 'unauthorized'}, status: :unauthorized
  end

  def set_session
    # need session to be created on first page hit to ensure saving of logged-in state from graph
    # there just needs to be something here.
    session[:dummy] = 1
  end

  def set_headers
    # Causing invalid header error only when downloading files
    # response.set_header('X-Frame-Options', 'ALLOW-FROM https://data.cteh.com')
  end

  def handle_paperclip_download(fields, default_field, model_class)
    field = params[:field].presence || default_field.presence || :photo
    raise "invalid field" unless fields.include?(field.to_sym)
    model = model_class.find(params[:id])
    begin
      # first check catch-all download ability, then individual field
      unless can? "download_file".to_sym, model
        authorize! "download_file_#{field}".to_sym, model
      end
    rescue CanCan::AccessDenied => ex
      if current_user.nil? # && params[:api_key].blank? # not using api_key yet, may do in the future -JEF
        # don't notify in this case
        render file: "#{Rails.root}/public/403.html", status: 403, layout: false
      end
      raise ex
    end

    file = model.send(field)
    return render(plain: "File not found.", status: :not_found) unless model && file.exists?
    send_file file.path(params[:style]), type: file.content_type, disposition: :inline
  end

  def self.handles_paperclip_downloads(fields, default_field = nil, model_class = nil)
    model_class = Object.const_get(model_class || self.to_s.gsub(/Controller$/, '').singularize)
    define_method :download_file do
      handle_paperclip_download fields, default_field, model_class
    end
  end

  def set_raven_context
    if current_user
      Raven.user_context(id: current_user.id, email: current_user.email, to_s: current_user.to_s)
    end
    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end
end
