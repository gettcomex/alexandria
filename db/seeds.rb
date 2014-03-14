Rails.root.join('db/seeds').children.each do |child|
  begin
    puts "** Importing #{child.basename}" 
    
    # Pega o nome do arquivo
	namefile = File.basename(child).split('.')[0].capitalize

	# Transforma numa string com o nome da classe.
	str_class =  namefile[0..(namefile.size - 2)]

	# Carrega o json da child
	json = ActiveSupport::JSON.decode(File.read(child))

	json.each do |data|
		# Transforma em classe e cria um novo registro
	    eval(str_class).create(data, without_protection: true)
	end

  rescue NameError => e
  end
end