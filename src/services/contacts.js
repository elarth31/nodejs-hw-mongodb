import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { DEFAULT_PAGINATION_DATA, SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = DEFAULT_PAGINATION_DATA.PAGE,
  perPage = DEFAULT_PAGINATION_DATA.PER_PAGE,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}, userId) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find({ userId });

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavorite !== undefined) {
    contactsQuery.where('isFavorite').equals(filter.isFavorite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.countDocuments(contactsQuery.getFilter()),
    contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);
  return { data: contacts, ...paginationData };
};

export const getContactById = async (contactId, userId) => {
  return ContactsCollection.findOne({ _id: contactId, userId });
};

export const createContact = async (payload) => {
  return ContactsCollection.create(payload);
};

export const updateContact = async (contactId, userId, payload) => {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true }
  );

  return { data: contact, isNew: !contact };
};

export const deleteContact = async (contactId, userId) => {
  return ContactsCollection.findOneAndDelete({ _id: contactId, userId });
};
