/**
 * Created by Dominik Schwarz on 23.09.2017.
 */
import { schema } from 'normalizr';

export const quest = new schema.Entity('quests');
export const arrayOfQuests = new schema.Array(quest);
