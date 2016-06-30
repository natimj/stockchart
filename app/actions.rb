# Homepage (Root path)
get '/' do
  erb :index
end

post '/' do
  erb :index
end

# get '/contacts' do
#   content_type :json
#   contacts = Contact.all
#   contacts.to_json
# end

# post '/search' do

#   search = params[:stock_ticker], 
#                         last_name: params[:last_name], 
#                         telephone: params[:telephone], 
#                         email: params[:email])
#   if contact.save
#     status 201
#     contact.to_json
#   else
#     status 500
#     json contact.errors.full_messages
#   end

#   #"contact[name]=Hello&contact[text]=World"
# end