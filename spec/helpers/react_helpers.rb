module ReactHelpers

  def react_visit(path, pause_on_failure=false)
    visit "/##{path}"
    visit "/##{path}" # IT IS BEYOND ME WHY VISITING TWICE HELPS?
    begin
      page.find_by_id("application")
    rescue
      if pause_on_failure
        $stderr.write "\nVisited path #{path.inspect} did not render the application."
        $stderr.write "\nNOTE: Use react_visit_debug to pause testing and use inspector tools.\n"
      end
    end
  end

  def react_visit_debug(path)
    visit "/##{path}"
    visit "/##{path}" # IT IS BEYOND ME WHY VISITING TWICE HELPS?
    begin
      page.find_by_id("application")
    rescue
      $stderr.write "\nVisited path #{path.inspect} did not render the application."
      $stderr.write "\nDEBUG: Testing haulted.  Use browser insector to check javascript console errors.\n"
      pause
    end
  end

  def wait_for_react
    page.find_by_id("application")
  end
end
