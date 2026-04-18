class Telegram::WebhookController < Telegram::Bot::UpdatesController
  # use callbacks like in any other controller
  around_action :with_locale

  ACTIONS = {
    objects: '📍 Абьекты'
  }

  OBJECTS_ACTIONS = {
    list: '📍 Спіс абьектаў',
    next: '▶️ Наступны',
    previous: '◀️ Папярэдні'
  }

  CLEAR_SEARCH_COMMAND = 'Пачысьціць пошук'

  def message(message, *params)
    if Rails.cache.read("user:#{message['from']['id']}:awaiting_page")
      page = message[:text].to_i

      if page <= 0 || page > (Area.count / PER_PAGE.to_f).ceil
        respond_with :message, text: "Няправільны нумар"
        return
      end

      Rails.cache.write("user:#{message['from']['id']}:awaiting_page", false)

      send_page(page)
    elsif Rails.cache.read("user:#{message['from']['id']}:search_mode")
      search = message[:text] == CLEAR_SEARCH_COMMAND ? nil : message[:text]

      Rails.cache.write("user:#{message['from']['id']}:search", search)
      Rails.cache.write("user:#{message['from']['id']}:search_mode", false)

      send_page(1)
    else
      case message[:text]
      when ACTIONS[:objects]
        handle_areas
      else
        respond_with :message, text: "Не разумею каманду 🤔"
      end
    end
  end

  def start!(word = nil, *other_words)
    respond_with :message, text: "Выберы дзеянне:", reply_markup: {
      keyboard: [
        [ACTIONS[:objects]]
      ],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  end

  def update(*params)
    puts("update #{params}")

    if params&.dig(0, "message")
      handle_message(params&.dig(0, "message"))
    elsif params&.dig(0, "callback_query")
      handle_callback_query(params&.dig(0, "callback_query"))
    end

    nil
  end

  def callback_query(data)
    puts("callback_query #{data}")

    case data
    when /areas:page:(\d+)/
      page = $1.to_i
      handle_areas_page(page)
    when "areas:goto"
      Rails.cache.write("user:#{from[:id]}:awaiting_page", true)

      respond_with :message, text: "Напішы нумар старонкі (1–#{(all_areas.count / PER_PAGE.to_f).ceil}):", reply_markup: { force_reply: true }
    when "areas:search"
      Rails.cache.write("user:#{from[:id]}:search_mode", true)

      respond_with :message, text: "Напішы, што шукаеш:", reply_markup: { keyboard: [[CLEAR_SEARCH_COMMAND]], resize_keyboard: true, one_time_keyboard: true }
    when /areas:show:(\d+)/
      area_id = $1.to_i

      puts("area_id: #{area_id}")
      handle_area_show(area_id)
    end

    answer_callback_query(nil)
  end

  def handle_areas_page(page)
    Rails.cache.write("user:#{from[:id]}:page", page)

    areas = areas_page(page)
    total_pages = (all_areas.count / PER_PAGE.to_f).ceil

    text = page_text(areas, page, total_pages)
    markup = {
      inline_keyboard: page_buttons(areas, page, total_pages) + [pagination_keyboard(page, total_pages)]
    }

    edit_message(:text, text: text, reply_markup: markup)
  end

  def handle_area_show(area_id)
    area = Area.find(area_id)

    text = "🗺️ #{area.title}\n\n#{area.description}"

    markup = {
      inline_keyboard: [
        [{ text: "✏️", callback_data: "areas:edit:#{area_id}" }],
        # [{ text: "🗑️", callback_data: "areas:delete:#{area_id}" }],
        [{ text: "🔙", callback_data: "areas:page:#{get_page(from[:id])}" }]
      ]
    }

    edit_message(:text, text: text, reply_markup: markup)
  end

  private

  def with_locale(&block)
    puts("with_locale")
    I18n.with_locale(locale_for_update, &block)
  end

  def locale_for_update
    puts("locale_for_update #{from}; #{chat}")
    if from
      # locale for user
    elsif chat
      # locale for chat
    end
  end

  def handle_areas
    send_page(1)
  end

  PER_PAGE = 10

  def all_areas
    search = Rails.cache.read("user:#{from[:id]}:search")

    puts("search: #{search}")

    areas = Area.where(hidden: false)

    if (search.present?)
      areas = areas.left_joins(:company, tags: [:key, :value])
        .where("concat_ws(' ', areas.title, areas.description, companies.name, tag_keys.name, tag_values.name) ILIKE ?", "%#{search}%")
    end

    areas.order(:created_at)
  end

  def areas_page(page)
    all_areas
      .limit(PER_PAGE)
      .offset((page - 1) * PER_PAGE)
  end

  def pagination_keyboard(page, total_pages)
    buttons = []

    buttons << { text: "⬅️", callback_data: "areas:page:#{page - 1}" } if page > 1
    buttons << { text: "🔢 Go to page", callback_data: "areas:goto" }
    buttons << { text: "🔍 Search", callback_data: "areas:search" }
    buttons << { text: "➡️", callback_data: "areas:page:#{page + 1}" } if page < total_pages

    buttons
  end

  def page_text(areas, page, total_pages)
    # list = areas.map.with_index(1) do |p, i|
    #   "#{(page - 1) * PER_PAGE + i}. #{p.title}"
    # end.join("\n")

    "🗺️ Areas (page #{page}/#{total_pages})"#\n\n#{list}"
  end

  def page_buttons(areas, page, total_pages)
    areas.map.with_index(1) do |p, i|
      [
        { text: "#{(page - 1) * PER_PAGE + i}. #{p.title}", callback_data: "areas:show:#{p.id}" },
        # { text: "✏️", callback_data: "areas:edit:#{p.id}" },
        # { text: "🗑️", callback_data: "areas:delete:#{p.id}" }
      ]
    end
  end

  def send_page(page)
    Rails.cache.write("user:#{from[:id]}:page", page)

    areas = areas_page(page)
    total_pages = (all_areas.count / PER_PAGE.to_f).ceil

    text = page_text(areas, page, total_pages)
    markup = {
      inline_keyboard: page_buttons(areas, page, total_pages) + [pagination_keyboard(page, total_pages)]
    }

    respond_with :message, text: text, reply_markup: markup
  end

  def handle_callback_query(callback)
    data = callback["data"]
    chat_id = callback["message"]["chat"]["id"]

    case data
    when "page:2"
      # logic
    end
  end

  def set_page(user_id, page)
    Rails.cache.write("user:#{user_id}:page", page)
  end

  def get_page(user_id)
    Rails.cache.read("user:#{user_id}:page") || 1
  end
end
