import sequelize from '../config/db'
import Book from './Books.model'
import User from './Users.model'


Book.hasMany(User, {
    foreignKey: 'bookId'
})

User.belongsTo(Book, {
    foreignKey: 'bookId'
});


(async () => {
    try {
        await sequelize.sync({ force: false })
        console.log('⚡️ Tables synced')
    } catch (error) {
        console.error('Error syncing tables:', error)
    }
})()

export { Book, User };