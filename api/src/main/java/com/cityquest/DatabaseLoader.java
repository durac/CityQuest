package com.cityquest;

import com.cityquest.persistence.model.*;
import com.cityquest.persistence.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Dominik Schwarz
 */
@Component
public class DatabaseLoader implements CommandLineRunner {

    private final RiddleRepository riddleRepo;

    private final UserRepository userRepo;

    private final QuestStationRepository questStationRepo;

    private final FixedQuestRepository fixedQuestRepo;

    private final EventQuestRepository eventQuestRepo;

    private final SolvedQuestStationRepository solvedQuestStationRepo;

    private DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");

    @Autowired
    public DatabaseLoader(RiddleRepository riddleRepo, UserRepository userRepo, QuestStationRepository questStationRepo,
            FixedQuestRepository fixedQuestRepo, EventQuestRepository eventQuestRepo,
            SolvedQuestStationRepository solvedQuestStationRepo) {
        this.riddleRepo = riddleRepo;
        this.userRepo = userRepo;
        this.questStationRepo = questStationRepo;
        this.fixedQuestRepo = fixedQuestRepo;
        this.eventQuestRepo = eventQuestRepo;
        this.solvedQuestStationRepo = solvedQuestStationRepo;
    }

    @Override
    public void run(String... strings) throws Exception {
        /* Order is important */
        saveRiddles();
        saveFixedQuests();
        saveEventQuests();
        saveQuestStation();
        saveUsers();
    }

    private void saveUsers() throws Exception {
        List<FixedQuest> fixedQuests = new ArrayList<>();
        fixedQuestRepo.findAll().iterator().forEachRemaining(fixedQuests::add);
        List<EventQuest> eventQuests = new ArrayList<>();
        eventQuestRepo.findAll().iterator().forEachRemaining(eventQuests::add);
        List<QuestStation> questStations = new ArrayList<>();
        questStationRepo.findAll().iterator().forEachRemaining(questStations::add);

        User u1 = new User("109773705621073945970");
        User u2 = new User("59afc13fa47a0e4e554ce556");
        User u3 = new User("597897d0090f0405f833f00a");
        User u4 = new User("59639f8139ea28315124a316");
        User u5 = new User("59760241ef91cf39eab3fc51");
        User u6 = new User("59760bb5090f0405f833c780");

        u1.getQuests().add(fixedQuests.get(2));
        u1.getQuests().add(eventQuests.get(2));
        u2.getQuests().add(fixedQuests.get(2));
        u3.getQuests().add(fixedQuests.get(2));
        u5.getQuests().add(fixedQuests.get(2));

        u1 = this.userRepo.save(u1);
        u2 = this.userRepo.save(u2);
        u3 = this.userRepo.save(u3);
        u4 = this.userRepo.save(u4);
        u5 = this.userRepo.save(u5);
        u6 = this.userRepo.save(u6);

        QuestStation qs1 = questStations.get(7);
        QuestStation qs2 = questStations.get(8);
        QuestStation qs3 = questStations.get(9);
        QuestStation qs4 = questStations.get(10);
        QuestStation qs5 = questStations.get(11);

        QuestStation qs6 = questStations.get(34);
        QuestStation qs7 = questStations.get(35);
        QuestStation qs8 = questStations.get(36);
        QuestStation qs9 = questStations.get(37);

        this.solvedQuestStationRepo.save(
                new SolvedQuestStation(u1, qs1, dateFormat.parse("2017-09-02 17:00"), dateFormat.parse("2017-09-02 17:13")));
        this.solvedQuestStationRepo.save(
                new SolvedQuestStation(u1, qs2, dateFormat.parse("2017-09-02 17:14"), dateFormat.parse("2017-09-02 17:22")));
        this.solvedQuestStationRepo.save(
                new SolvedQuestStation(u1, qs3, dateFormat.parse("2017-09-02 17:23"), dateFormat.parse("2017-09-02 17:40")));
        this.solvedQuestStationRepo.save(
                new SolvedQuestStation(u1, qs4, dateFormat.parse("2017-09-02 17:41")));

        this.solvedQuestStationRepo.save(
                new SolvedQuestStation(u1, qs6, dateFormat.parse("2017-09-12 18:00"), dateFormat.parse("2017-09-12 18:23")));
        this.solvedQuestStationRepo.save(
                new SolvedQuestStation(u1, qs7, dateFormat.parse("2017-09-12 18:23"), dateFormat.parse("2017-09-12 18:45")));
        this.solvedQuestStationRepo.save(
                new SolvedQuestStation(u1, qs8, dateFormat.parse("2017-09-12 18:45"), dateFormat.parse("2017-09-12 18:59")));
        this.solvedQuestStationRepo.save(
                new SolvedQuestStation(u1, qs9, dateFormat.parse("2017-09-12 18:59"), dateFormat.parse("2017-09-12 19:22")));


        this.solvedQuestStationRepo.save(
                new SolvedQuestStation(u2, qs1, dateFormat.parse("2017-09-02 17:00"), dateFormat.parse("2017-09-02 17:16")));
        this.solvedQuestStationRepo.save(
                new SolvedQuestStation(u2, qs2, dateFormat.parse("2017-09-02 17:17"), dateFormat.parse("2017-09-02 17:31")));
        this.solvedQuestStationRepo.save(
                new SolvedQuestStation(u2, qs3, dateFormat.parse("2017-09-02 17:32"), dateFormat.parse("2017-09-02 17:45")));
        this.solvedQuestStationRepo.save(
                new SolvedQuestStation(u2, qs4, dateFormat.parse("2017-09-02 17:46"), dateFormat.parse("2017-09-02 17:58")));
        this.solvedQuestStationRepo.save(
                new SolvedQuestStation(u2, qs5, dateFormat.parse("2017-09-02 17:59"), dateFormat.parse("2017-09-02 18:13")));

        this.solvedQuestStationRepo.save(
                new SolvedQuestStation(u3, qs1, dateFormat.parse("2017-09-02 17:00"), dateFormat.parse("2017-09-02 17:22")));
        this.solvedQuestStationRepo.save(
                new SolvedQuestStation(u3, qs2, dateFormat.parse("2017-09-02 17:23"), dateFormat.parse("2017-09-02 17:45")));
        this.solvedQuestStationRepo.save(
                new SolvedQuestStation(u3, qs3, dateFormat.parse("2017-09-02 17:46")));

        this.solvedQuestStationRepo.save(
                new SolvedQuestStation(u5, qs1, dateFormat.parse("2017-09-02 17:00"), dateFormat.parse("2017-09-02 17:32")));
        this.solvedQuestStationRepo.save(
                new SolvedQuestStation(u5, qs2, dateFormat.parse("2017-09-02 17:33")));
    }

    private void saveFixedQuests() {
        this.fixedQuestRepo.save(new FixedQuest("History Walk", QuestStatus.ACTIVE,
                "Diese Schatzsuche führt euch durch den historischen 1. Wiener Gemeindebezirk. Viel Spaß beim History Walk.",
                QuestDifficulty.EASY, 120, 5.0,  "1. Bezirk", "https://i.imgur.com/qJHl9UO.png"));
        this.fixedQuestRepo.save(new FixedQuest("Draft Quest", QuestStatus.DRAFT,
                "Diese Schatzsuche führt euch durch den historischen 1. Wiener Gemeindebezirk. Viel Spaß beim History Walk.",
                QuestDifficulty.MEDIUM, 150, 4.5, "5. Bezirk", "https://i.imgur.com/qJHl9UO.png"));
        this.fixedQuestRepo.save(new FixedQuest("Already Closed", QuestStatus.CLOSED,
                "Diese Schatzsuche führt euch durch den historischen 1. Wiener Gemeindebezirk. Viel Spaß beim History Walk.",
                QuestDifficulty.HARD, 180, 3.0, "7. Bezirk", "https://i.imgur.com/qJHl9UO.png"));
    }

    private void saveEventQuests() throws Exception {
        this.eventQuestRepo.save(new EventQuest("Logic Quest", QuestStatus.ACTIVE,
                "Eine Reihe kniffliger Logikrätsel wartet auf euch. Seit ihr bereit? Aufgeben ist keine Option!",
                QuestDifficulty.HARD, 120, 2.0, "Stadtpark", "https://i.imgur.com/3207Wla.png", dateFormat.parse("2017-10-01 18:00"),
                dateFormat.parse("2017-10-02 00:00"), 10, 100, dateFormat.parse("2017-09-15 10:00"),
                dateFormat.parse("2017-10-01 15:00"), ""));
        this.eventQuestRepo.save(new EventQuest("Prater Gaudi", QuestStatus.ACTIVE,
                "Entdecke den historischen und modernen Prater auf einer neuen Art und Weise. Viel Spaß!", QuestDifficulty.MEDIUM, 90, 3.5,
                "Prater", "https://i.imgur.com/zeAllnU.png", dateFormat.parse("2017-10-10 18:00"), dateFormat.parse("2017-10-10 23:00"), 20, 200,
                dateFormat.parse("2017-09-20 10:00"), dateFormat.parse("2017-10-11 15:00"), ""));
        this.eventQuestRepo.save(new EventQuest("Testing Quest", QuestStatus.CLOSED,
                "Bei dieser Quest müsst ihr eine Reihe kniffliger Logikrätsel lösen. Aufgeben ist keine Option!",
                QuestDifficulty.HARD, 130, 7.0, "7. Bezirk", "https://i.imgur.com/3207Wla.png", dateFormat.parse("2017-09-12 18:00"),
                dateFormat.parse("2017-09-13 00:00"), 10, 100, dateFormat.parse("2017-09-01 10:00"),
                dateFormat.parse("2017-09-11 15:00"), ""));
        this.eventQuestRepo.save(new EventQuest("Test Quest", QuestStatus.DRAFT,
                "Bei dieser Quest müsst ihr eine Reihe kniffliger Logikrätsel lösen. Aufgeben ist keine Option!",
                QuestDifficulty.HARD, 150, 6.0, "7. Bezirk", "https://i.imgur.com/3207Wla.png", dateFormat.parse("2017-10-03 18:00"),
                dateFormat.parse("2017-10-04 00:00"), 10, 100, dateFormat.parse("2017-09-17 10:00"),
                dateFormat.parse("2017-10-02 15:00"), ""));
    }

    private void saveQuestStation() {
        List<FixedQuest> fixedQuests = new ArrayList<>();
        fixedQuestRepo.findAll().iterator().forEachRemaining(fixedQuests::add);
        List<EventQuest> eventQuests = new ArrayList<>();
        eventQuestRepo.findAll().iterator().forEachRemaining(eventQuests::add);
        List<Riddle> riddles = new ArrayList<>();
        riddleRepo.findAll().iterator().forEachRemaining(riddles::add);

        int j = 0;
        for (int i = 1; i < 8; i++) {
            this.questStationRepo.save(
                    new QuestStation(i, "History Walk #" + i, "", fixedQuests.get(0), riddles.get(j), 0.0, 0.0, ""));
            j++;
        }
        for (int i = 1; i < 6; i++) {
            this.questStationRepo.save(
                    new QuestStation(i, "Already Closed #" + i, "", fixedQuests.get(2), riddles.get(j), 0.0, 0.0, ""));
            j++;
        }
        for (int i = 1; i < 11; i++) {
            this.questStationRepo.save(
                    new QuestStation(i, "Logic Quest #" + i, "", eventQuests.get(0), riddles.get(j), 0.0, 0.0, ""));
            j++;
        }
        for (int i = 1; i < 13; i++) {
            this.questStationRepo.save(
                    new QuestStation(i, "Prater Gaudi #" + i, "", eventQuests.get(1), riddles.get(j), 0.0, 0.0, ""));
            j++;
        }
        for (int i = 1; i < 5; i++) {
            this.questStationRepo.save(
                    new QuestStation(i, "Test Quest #" + i, "", eventQuests.get(2), riddles.get(j), 0.0, 0.0, ""));
            j++;
        }
        for (int i = 1; i < 2; i++) {
            this.questStationRepo.save(
                    new QuestStation(i, "Testing Quest #" + i, "", eventQuests.get(3), riddles.get(j), 0.0, 0.0, ""));
            j++;
        }
    }

    private void saveRiddles() {
        this.riddleRepo.save(new Riddle("Riddle #1",
                "What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
                "Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #2", "Laughing Out?", "Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #3", "What five-letter word becomes shorter when you add two letters to it?", "Short",
                        RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #4", "What starts with a 'P', ends with an 'E' and has thousands of letters?",
                        "Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #5", "Where do fish keep their money?", "Riverbank", RiddleType.NORMAL,
                RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #6",
                "What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
                "Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #7", "Laughing Out?", "Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #8", "What five-letter word becomes shorter when you add two letters to it?", "Short",
                        RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #9", "What starts with a 'P', ends with an 'E' and has thousands of letters?",
                        "Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #10", "Where do fish keep their money?", "Riverbank", RiddleType.NORMAL,
                RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #11",
                "What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
                "Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #12", "Laughing Out?", "Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #13", "What five-letter word becomes shorter when you add two letters to it?", "Short",
                        RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #14", "What starts with a 'P', ends with an 'E' and has thousands of letters?",
                        "Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #15", "Where do fish keep their money?", "Riverbank", RiddleType.NORMAL,
                RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #21",
                "What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
                "Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #22", "Laughing Out?", "Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #23", "What five-letter word becomes shorter when you add two letters to it?", "Short",
                        RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #24", "What starts with a 'P', ends with an 'E' and has thousands of letters?",
                        "Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #25", "Where do fish keep their money?", "Riverbank", RiddleType.NORMAL,
                RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #26",
                "What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
                "Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #27", "Laughing Out?", "Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #28", "What five-letter word becomes shorter when you add two letters to it?", "Short",
                        RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #29", "What starts with a 'P', ends with an 'E' and has thousands of letters?",
                        "Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #30", "Where do fish keep their money?", "Riverbank", RiddleType.NORMAL,
                RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #31",
                "What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
                "Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #32", "Laughing Out?", "Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #33", "What five-letter word becomes shorter when you add two letters to it?", "Short",
                        RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #34", "What starts with a 'P', ends with an 'E' and has thousands of letters?",
                        "Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #35", "Where do fish keep their money?", "Riverbank", RiddleType.NORMAL,
                RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #41",
                "What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
                "Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #42", "Laughing Out?", "Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #43", "What five-letter word becomes shorter when you add two letters to it?", "Short",
                        RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #44", "What starts with a 'P', ends with an 'E' and has thousands of letters?",
                        "Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #45", "Where do fish keep their money?", "Riverbank", RiddleType.NORMAL,
                RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #46",
                "What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
                "Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #47", "Laughing Out?", "Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #48", "What five-letter word becomes shorter when you add two letters to it?", "Short",
                        RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #49", "What starts with a 'P', ends with an 'E' and has thousands of letters?",
                        "Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #50", "Where do fish keep their money?", "Riverbank", RiddleType.NORMAL,
                RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #51",
                "What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
                "Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #52", "Laughing Out?", "Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #53", "What five-letter word becomes shorter when you add two letters to it?", "Short",
                        RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #54", "What starts with a 'P', ends with an 'E' and has thousands of letters?",
                        "Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #55", "Where do fish keep their money?", "Riverbank", RiddleType.NORMAL,
                RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #61",
                "What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
                "Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #62", "Laughing Out?", "Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #63", "What five-letter word becomes shorter when you add two letters to it?", "Short",
                        RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #64", "What starts with a 'P', ends with an 'E' and has thousands of letters?",
                        "Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #65", "Where do fish keep their money?", "Riverbank", RiddleType.NORMAL,
                RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #66",
                "What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
                "Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #67", "Laughing Out?", "Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #68", "What five-letter word becomes shorter when you add two letters to it?", "Short",
                        RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #69", "What starts with a 'P', ends with an 'E' and has thousands of letters?",
                        "Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #70", "Where do fish keep their money?", "Riverbank", RiddleType.NORMAL,
                RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #71",
                "What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
                "Noon", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #72", "Laughing Out?", "Loud", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #73", "What five-letter word becomes shorter when you add two letters to it?", "Short",
                        RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(
                new Riddle("Riddle #74", "What starts with a 'P', ends with an 'E' and has thousands of letters?",
                        "Post Office", RiddleType.NORMAL, RiddleCategory.LOGIC));
        this.riddleRepo.save(new Riddle("Riddle #75", "Where do fish keep their money?", "Riverbank", RiddleType.NORMAL,
                RiddleCategory.LOGIC));
    }
}
