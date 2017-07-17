package com.cityquest;

import com.cityquest.persistence.dbo.Riddle;
import com.cityquest.persistence.dbo.RiddleGenre;
import com.cityquest.persistence.dbo.RiddleType;
import com.cityquest.persistence.repository.RiddleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * @author Dominik Schwarz
 */
@Component
public class DatabaseLoader implements CommandLineRunner {

	private final RiddleRepository repository;

	@Autowired
	public DatabaseLoader(RiddleRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		this.repository.save(new Riddle("Riddle #1",
				"What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
				"Noon", RiddleType.NORMAL, RiddleGenre.LOGIC));
		this.repository.save(new Riddle("Riddle #2",
				"Laughing Out?",
				"Loud", RiddleType.NORMAL, RiddleGenre.LOGIC));
		this.repository.save(new Riddle("Riddle #3",
				"What five-letter word becomes shorter when you add two letters to it?",
				"Short", RiddleType.NORMAL, RiddleGenre.LOGIC));
		this.repository.save(new Riddle("Riddle #4",
				"What starts with a 'P', ends with an 'E' and has thousands of letters?",
				"Post Office", RiddleType.NORMAL, RiddleGenre.LOGIC));
		this.repository.save(new Riddle("Riddle #5",
				"Where do fish keep their money?",
				"Riverbank", RiddleType.NORMAL, RiddleGenre.LOGIC));
	}
}
