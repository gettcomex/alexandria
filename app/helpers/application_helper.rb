module ApplicationHelper

  # def body_css_id
  #   controller_path.gsub('/', '_').camelize(:lower) + "Body"
  # end

  def flash_messages
    flash.collect do |key, msg|
      content_tag :p, msg, id: key, class: "flash_message"
    end.join.html_safe
  end

  # def error_messages_for(resource)
  #   render partial: "shared/error_messages", locals: { resource: resource }
  # end

  # def textilize(text)
  #   RedCloth.new(text).to_html.html_safe
  # end

end