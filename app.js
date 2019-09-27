const faker = require('faker')
const mysql = require('mysql')
const {promisify} = require('util')

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Ormrstones1!',
        database: 'joinUs'
    }
)

//promisify the connection

const promisifiedQuery = promisify(connection.query).bind(connection)
//runs a query (in this case selecting all rows from users table in database)
const runQuery = async () =>{
    try {
        //wait for the promise to be handled before trying
        let data = await promisifiedQuery('Select count(*) as total from users');
        return(data)
        
    } catch (error) {
        console.log(error.sqlMessage)
    }
    //stops server from listening to further queries
    connection.end()
}

//adds email to database
// const bulkAdd = () => {
//     let people = []
//     for (i = 0; i < 500; i++){
//         people.push([faker.internet.email(), faker.date.past()])
//     }
//     return people
// }

const addEmail = async (email) => {
    try {
        const queryStringAdd = `INSERT INTO users(email) VALUES('${email}')`
        let data = await promisifiedQuery(queryStringAdd);
        console.log(data)
        
    } catch (error) {
        console.log(error.sqlMessage)
    }
}


module.exports = {
    runQuery,
    addEmail

}