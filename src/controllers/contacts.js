import createHttpError from 'http-errors';
import { HTTP_STATUSES } from '../constants/index.js';
import {
    createContact,
    deleteContact,
    getAllContacts,
    getContactById,
    updateContact,
} from '../services/contacts.js';
import { parseAllParams } from '../utils/parseAllParams.js';
import mongoose from 'mongoose';

const STATUS_OK = HTTP_STATUSES.OK;
const STATUS_CREATED = HTTP_STATUSES.CREATED;
const STATUS_NO_CONTENT = HTTP_STATUSES.NO_CONTENT;


export const getContactsController = async (req, res, next) => {
    try {
        const params = parseAllParams(req.query); 
        const data = await getAllContacts(params); 

        res.status(STATUS_OK).json({
            status: STATUS_OK,
            message: 'Successfully found contacts!',
            data: data,
        });
    } catch (error) {
        next(createHttpError.InternalServerError('Failed to retrieve contacts'));
    }
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return next(createHttpError(400, `Invalid ID: '${contactId}' provided. Expected a valid 24-character MongoDB ObjectId.`));
    }

    try {
        const contact = await getContactById(contactId); 

        if (!contact) {
            return next(createHttpError(404, 'Contact not found'));
        }

        res.status(STATUS_OK).json({
            status: STATUS_OK,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
    } catch (error) {
        next(createHttpError.InternalServerError('Failed to retrieve contact'));
    }
};


export const createContactController = async (req, res, next) => {
    try {
        const contact = await createContact(req.body); 
        res.status(STATUS_CREATED).json({
            status: STATUS_CREATED,
            message: 'Contact successfully created!',
            data: contact,
        });
    } catch (error) {
        next(createHttpError.InternalServerError('Failed to create contact'));
    }
};

export const upsertUserController = async (req, res, next) => {
    const { contactId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return next(createHttpError(400, `Invalid ID: '${contactId}' provided. Expected a valid 24-character MongoDB ObjectId.`));
    }

    try {
        const result = await updateContact(contactId, req.body); 

        if (!result) {
            return next(createHttpError(404, 'Contact not found'));
        }

        const status = result?.isNew ? STATUS_CREATED : STATUS_OK;

        res.status(status).json({
            status: status,
            message: 'Successfully patched a contact!',
            data: result.contact,
        });
    } catch (error) {
        next(createHttpError.InternalServerError('Failed to update contact'));
    }
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return next(createHttpError(400, `Invalid ID: '${contactId}' provided. Expected a valid 24-character MongoDB ObjectId.`));
    }

    try {
        const contact = await deleteContact(contactId); 

        if (!contact) {
            return next(createHttpError(404, 'Contact not found'));
        }

        res.status(STATUS_NO_CONTENT).send();
    } catch (error) {
        next(createHttpError.InternalServerError('Failed to delete contact'));
    }
};