module FactoryGirl
  module Syntax
    module Methods
      # Find or build parent objects to ensure consistent use across children
      # Note: incident and account are implicitly used
      #   assign: additional properties that will be assigned on obj after they are found/created. incident, account, and all subjects are implicitly assigned
      def ensure_parents(obj, ev, assign: nil, subjects:)
        assign = (assign || []) + [:incident, :account]
        subjects = subjects.map { |subject, opts|
          opts[:factory] ||= subject
          opts[:traits] ||= [:valid]
          opts[:attributes] ||= {}
          opts[:use] = (opts[:use] || []) + [:incident, :account]
          [subject, opts]
        }.to_h
        # add default subjects: incident and account
        subjects[:incident] = {
          traits: [:valid],
          use: [:account],
        }
        subjects[:account] = {
          traits: [:valid],
        }

        assigns = gather_assigns(obj, ev, nil, subjects)

        # With precedence of assigns handled, build missing subjects and save them
        subjects.each do |subject, opts|
          use = opts[:use]
          traits = opts[:traits]
          attributes = opts[:attributes] || {}

          subject_obj = assigns[subject]
          unless subject_obj
            final_attributes = attributes.merge(assigns.slice(*use))

            subject_obj = create(opts[:factory] || subject, *traits, final_attributes)
          end

          # save found/created subject on obj and gather assigns for next loop
          obj.send(subject).nil? && obj.send("#{subject}=", subject_obj)
          assigns[subject] ||= subject_obj
          assigns = gather_assigns(obj, ev, assigns, subjects)
        end

        assign.each{ |a| obj.send(a).nil? && obj.send("#{a}=", assigns[a]) }
        nil
      end

      # Currently only used for ensure_parents, should be considered private
      def gather_assigns(obj, ev, assigns, subjects)
        assigns ||= {}

        # establish the attributes that are needed for any of the ensured subjects
        needs = (subjects.map{|subject, opts| opts[:use] || []} + subjects.keys).flatten.uniq

        # check the subjects themselves for the properties that are needed
        # e.g. model1 and model2 both use period, and model1 has it
        subjects.each do |subject, opts|
          subject_obj = assigns[subject] || ev.send(subject)
          needs.each do |need|
            assigns[need] ||= subject_obj.try(need)
          end
        end

        # check the evaluator for the properties that are needed
        # e.g. document uses period, and period is in ev
        needs.each do |need|
          assigns[need] ||= ev.try(need)
        end

        # check the object for the properties that are needed
        # e.g. document uses period, period was not transient and is not in ev, but was on obj
        needs.each do |need|
          assigns[need] ||= obj.try(need)
        end

        assigns
      end
    end
  end
end
