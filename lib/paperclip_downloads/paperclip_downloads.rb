module ActionDispatch::Routing
  class Mapper
    module Resources
      def paperclip_downloads
        member do
          get 'download_file'
        end
      end
    end
  end
end
