import { Router } from 'express';
import {
    createContactController,
    deleteContactController,
    getContactByIdController,
    getContactsController,
    upsertUserController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';


const contactsRoutes = Router();

// Получить все контакты
contactsRoutes.get('/contacts', ctrlWrapper(getContactsController));

// Получить контакт по ID
contactsRoutes.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

// Создать новый контакт
contactsRoutes.post('/contacts', ctrlWrapper(createContactController));

// Обновить контакт (PATCH)
contactsRoutes.patch('/contacts/:contactId', ctrlWrapper(upsertUserController));

// Удалить контакт
contactsRoutes.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default contactsRoutes;