package com.cityquest;

import com.cityquest.persistence.dbo.Riddle;
import com.cityquest.persistence.dbo.RiddleCategory;
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
				"Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #2",
				"Laughing Out?",
				"Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #3",
				"What five-letter word becomes shorter when you add two letters to it?",
				"Short", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #4",
				"What starts with a 'P', ends with an 'E' and has thousands of letters?",
				"Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #5",
				"Where do fish keep their money?",
				"Riverbank", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #6",
				"What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
				"Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #7",
				"Laughing Out?",
				"Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #8",
				"What five-letter word becomes shorter when you add two letters to it?",
				"Short", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #9",
				"What starts with a 'P', ends with an 'E' and has thousands of letters?",
				"Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #10",
				"Where do fish keep their money?",
				"Riverbank", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #11",
				"What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
				"Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #12",
				"Laughing Out?",
				"Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #13",
				"What five-letter word becomes shorter when you add two letters to it?",
				"Short", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #14",
				"What starts with a 'P', ends with an 'E' and has thousands of letters?",
				"Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #15",
				"Where do fish keep their money?",
				"Riverbank", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #21",
				"What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
				"Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #22",
				"Laughing Out?",
				"Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #23",
				"What five-letter word becomes shorter when you add two letters to it?",
				"Short", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #24",
				"What starts with a 'P', ends with an 'E' and has thousands of letters?",
				"Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #25",
				"Where do fish keep their money?",
				"Riverbank", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #26",
				"What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
				"Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #27",
				"Laughing Out?",
				"Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #28",
				"What five-letter word becomes shorter when you add two letters to it?",
				"Short", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #29",
				"What starts with a 'P', ends with an 'E' and has thousands of letters?",
				"Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #30",
				"Where do fish keep their money?",
				"Riverbank", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #31",
				"What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
				"Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #32",
				"Laughing Out?",
				"Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #33",
				"What five-letter word becomes shorter when you add two letters to it?",
				"Short", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #34",
				"What starts with a 'P', ends with an 'E' and has thousands of letters?",
				"Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #35",
				"Where do fish keep their money?",
				"Riverbank", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #41",
				"What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
				"Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #42",
				"Laughing Out?",
				"Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #43",
				"What five-letter word becomes shorter when you add two letters to it?",
				"Short", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #44",
				"What starts with a 'P', ends with an 'E' and has thousands of letters?",
				"Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #45",
				"Where do fish keep their money?",
				"Riverbank", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #46",
				"What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
				"Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #47",
				"Laughing Out?",
				"Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #48",
				"What five-letter word becomes shorter when you add two letters to it?",
				"Short", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #49",
				"What starts with a 'P', ends with an 'E' and has thousands of letters?",
				"Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #50",
				"Where do fish keep their money?",
				"Riverbank", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #51",
				"What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
				"Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #52",
				"Laughing Out?",
				"Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #53",
				"What five-letter word becomes shorter when you add two letters to it?",
				"Short", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #54",
				"What starts with a 'P', ends with an 'E' and has thousands of letters?",
				"Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #55",
				"Where do fish keep their money?",
				"Riverbank", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #61",
				"What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
				"Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #62",
				"Laughing Out?",
				"Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #63",
				"What five-letter word becomes shorter when you add two letters to it?",
				"Short", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #64",
				"What starts with a 'P', ends with an 'E' and has thousands of letters?",
				"Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #65",
				"Where do fish keep their money?",
				"Riverbank", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #66",
				"What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
				"Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #67",
				"Laughing Out?",
				"Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #68",
				"What five-letter word becomes shorter when you add two letters to it?",
				"Short", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #69",
				"What starts with a 'P', ends with an 'E' and has thousands of letters?",
				"Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #70",
				"Where do fish keep their money?",
				"Riverbank", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #71",
				"What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
				"Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #72",
				"Laughing Out?",
				"Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #73",
				"What five-letter word becomes shorter when you add two letters to it?",
				"Short", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #74",
				"What starts with a 'P', ends with an 'E' and has thousands of letters?",
				"Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
		this.repository.save(new Riddle("Riddle #75",
				"Where do fish keep their money?",
				"Riverbank", RiddleType.NORMAL, RiddleCategory.LOGIC));
	}
}
