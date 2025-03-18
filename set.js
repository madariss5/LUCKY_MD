const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUZqNU1UTDVOVHFQLy9PZDV4Y3lNdVVxVVNNcjA3c2RQdWQrcGFpTE1WMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNE5KcWRTbXYramdnUDg4anJteUU1UlJoenplWXduRXVCZC9DUFMrY2hHND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFSXB3VWp1MXoxUkpvK1d2K1dDYkR4U2tTZ0tnRkp5NjNRZDZxTTZsOG4wPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhdW5jZXFydW1wbGc3V1hkVU1xcHprUitQSHVQWERnaWZleGlkcW9LMkdzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndFMVFUdS9wRUc1MGFUM2diaGxDWHlNSzByeDR2blR0WXErSWNGWm1QSDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ims3T0dwNTIrWTcvT1BFdXZ2Q3NvS2FsN2JvVXozRHEvYzZFQUQzMnhhQTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0pTZlhzM2dhSTlaU0V1RzBWYWhVL0wwOFNZbk81bEtXMjJHYUllb0VtZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRWhTMjNJSlVHYTB6aFNEdlZhWlBXaG1WREh1UTRDV3BEYWJ2M3NGWDd6dz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhMTHRPeEhxaFcrRi8rRWNCQ3kvSlgybTJMT1Bqd1BBYUhaVzluMTdJSkwwWVFBRnhiY3hxVW1qeXhtc0pqZUdUNlpLd1laaGtjbzdOK0Q1ZnUyR2d3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA1LCJhZHZTZWNyZXRLZXkiOiJDN0JaSXdkZERvVitPWGpwRnowUXZvTzMwUzhycFFxYk5tRkx0TytRbm1zPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjQ5MTU1NjIzNzgzNDNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOThCMkUzOEU4MzU0MTQ0RDBBNzcyNkQzNjBFNzI4RjYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0MjMxOTUzNn0seyJrZXkiOnsicmVtb3RlSmlkIjoiNDkxNTU2MjM3ODM0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJGNkEyREMyQjg3QUE2NDcxMzAzODUzRTcwRjgwQjcwNSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQyMzE5NTM2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI0OTE1NTYyMzc4MzQzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkMyM0YyNjUzRjJERjBCQjFEQzM2Q0JDNzA1QzM2OEFFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDIzMTk1Mzl9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IklVWmdmUE5sUndlQnduRDg4M0JwZEEiLCJwaG9uZUlkIjoiMDdhMWQzZjYtN2I2Yy00N2NkLWFiZDEtMGMxNzAxYjYyOWE4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhZQ0JPRy9haHRLeG8vbzJMcDBPMUVIcGpZST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrMVFudWdNbjNvbUxTM2Vsc2Y5MFhzNUZMbHM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMjRCQUJIQjEiLCJtZSI6eyJpZCI6IjQ5MTU1NjIzNzgzNDM6MThAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiR2FtZWJvdC1CTEFDS1NLWS1NRCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT3JQeVMwUW90L212Z1lZQVNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNzJWMTFsSVp2YWxKdkYyNjJiTVh3MzRuS2dSTjlLbzNDT2d3KzRINGVScz0iLCJhY2NvdW50U2lnbmF0dXJlIjoib0syNVJjbTlhYXg2SXR1RVRNZjZkUEFRUStxMlV3aGRWcDRVeFhDSjdMazVEaWxvVzB1YkZjWitmMWkra3dUU3FSWXRiZHV0YWV0Z01JRkRHcUdUQnc9PSIsImRldmljZVNpZ25hdHVyZSI6IjEvdjNpQzIzUGh4cjdUaXFnL0RBRDlXOTh1Rmc0RkUvejdUMFdycFd1Z25hSmtzV2RjQVVUS3RkUzA2WklvWWlscWJaZHpTN2lNMlplcXdVY2NNQ2hBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDkxNTU2MjM3ODM0MzoxOEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlOWxkZFpTR2IycFNieGR1dG16RjhOK0p5b0VUZlNxTndqb01QdUIrSGtiIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQyMzE5NTM1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQURDWCJ9',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/Fred1e/LUCKY_MD',
    OWNER_NAME : process.env.OWNER_NAME || "Martin",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "4915563151347",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/7irwqn.jpeg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by alpha md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "✧⁠BLACKSKY-MD✧",
    BOT : process.env.BOT_NAME || '✧⁠BLACKSKY-MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

