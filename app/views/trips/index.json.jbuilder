json.array!(@trips) do |trip|
  json.extract! trip, :id, :group_id_id, :location, :title, :description, :duration
  json.url trip_url(trip, format: :json)
end
