import {db, prodDb} from '../../config/Config';

export default {
    "development": {
        "username": db.user,
        "password": db.password,
        "database": db.name,
        "host": db.host,
        "port": db.port,
        "dialect": "mysql"
    },
    "test": {
        "username": db.user,
        "password": db.password,
        "database": db.name,
        "host": db.host,
        "port": db.port,
        "dialect": "mysql"
    },
    "production": {
        "username": prodDb.user,
        "password": prodDb.password,
        "database": prodDb.name,
        "host": prodDb.host,
        "port": prodDb.port,
        "dialect": "mysql"
    }
}
