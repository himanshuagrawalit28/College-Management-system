import { INITIAL_NOTICES, INITIAL_EVENTS } from '../utils/constants';
import { getStorageItem, setStorageItem } from '../utils/helpers';

const STORAGE_NOTICES_KEY = 'apex_notices';
const STORAGE_EVENTS_KEY = 'apex_events';

if (!getStorageItem(STORAGE_NOTICES_KEY, null)) {
  setStorageItem(STORAGE_NOTICES_KEY, INITIAL_NOTICES);
}
if (!getStorageItem(STORAGE_EVENTS_KEY, null)) {
  setStorageItem(STORAGE_EVENTS_KEY, INITIAL_EVENTS);
}

export const noticeService = {
  getNotices: async () => {
    return getStorageItem(STORAGE_NOTICES_KEY, INITIAL_NOTICES);
  },

  createNotice: async (noticeData) => {
    const notices = getStorageItem(STORAGE_NOTICES_KEY, INITIAL_NOTICES);
    const newNotice = {
      id: `not_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...noticeData,
    };
    const updated = [newNotice, ...notices];
    setStorageItem(STORAGE_NOTICES_KEY, updated);
    return newNotice;
  },

  deleteNotice: async (id) => {
    const notices = getStorageItem(STORAGE_NOTICES_KEY, INITIAL_NOTICES);
    const updated = notices.filter((n) => n.id !== id);
    setStorageItem(STORAGE_NOTICES_KEY, updated);
    return true;
  },

  getEvents: async () => {
    return getStorageItem(STORAGE_EVENTS_KEY, INITIAL_EVENTS);
  },

  createEvent: async (eventData) => {
    const events = getStorageItem(STORAGE_EVENTS_KEY, INITIAL_EVENTS);
    const newEvent = {
      id: `evt_${Date.now()}`,
      ...eventData,
    };
    const updated = [newEvent, ...events];
    setStorageItem(STORAGE_EVENTS_KEY, updated);
    return newEvent;
  },

  deleteEvent: async (id) => {
    const events = getStorageItem(STORAGE_EVENTS_KEY, INITIAL_EVENTS);
    const updated = events.filter((e) => e.id !== id);
    setStorageItem(STORAGE_EVENTS_KEY, updated);
    return true;
  },
};

export default noticeService;
