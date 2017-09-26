/**
 * Created by Dominik Schwarz on 23.09.2017.
 */
import { schema } from 'normalizr';

export const quest = new schema.Entity('quests');
export const arrayOfQuests = new schema.Array(quest);

export const riddle = new schema.Entity('riddles');

export const questStation = new schema.Entity('questStations', {
    riddle: riddle
});
export const arrayOfQuestStations = new schema.Array(questStation);
