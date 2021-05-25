module.exports = {
    expressConfig: {
        port: 3000
    },
    databaseConfig: {
        dialect: 'sqlite',
        storage: 'database.sqlite',
        logging: false
    },
    sequelizeConfig:{
        sync:{ force: false }
    },
    bcryptsConfig: {
        saltOrRounds: 10
    },
    jwtConfig:{
        privateKey:'Minhakey'
    }
}