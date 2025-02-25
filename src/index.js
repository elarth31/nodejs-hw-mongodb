import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await initMongoConnection();
    
    console.log('Setting up server...');
    setupServer();
  } catch (error) {
    console.error(`Exception in bootstrap ${error}`);
  }
};

bootstrap();
