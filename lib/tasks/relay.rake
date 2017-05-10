namespace :relay do
  desc "Tasks helpful for React Relay Client"
  task :dump_schema => :environment do
    begin
      Schema.dump_schema
    rescue => detail
      print detail.backtrace.join("\n")
      1.upto(2) {
        if !system('say "Schema Dump Failed"')
          print "\a"
        end
        sleep 2
      }
    end
  end
  task :ds => :dump_schema
end
