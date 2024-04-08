import sequelize from '../config/db'
import Book from './Books.model'
import User from './Users.model'
import BooksUsers from './BooksUsers.model'


Book.belongsToMany(User, { through: BooksUsers })

User.belongsToMany(Book, { through: BooksUsers });


(async () => {
    try {
        await sequelize.sync({ force: false })
        console.log('⚡️ Tables synced')
    } catch (error) {
        console.error('Error syncing tables:', error)
    }
})()

export { Book, User, BooksUsers };