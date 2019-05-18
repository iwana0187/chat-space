module ControllerMacros
  def login(user)
    @request.evn["devise.mapping"] = Devise.mappings[:user]
    sign_in user
  end
end
