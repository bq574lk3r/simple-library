import app from '../src/app'
import request from 'supertest'
import sequelize from '../src/config/db';


afterAll(async () => {
    await sequelize.truncate({ cascade: true });
});

const objectExpect = {
    id: expect.any(String),
    title: expect.any(String),
    author: expect.any(String),
    yearPublication: expect.any(Number),
}

describe('POST /book/add', () => {
    let token: string;
    beforeAll(async () => {
        await request(app)
            .post('/register')
            .send({
                username: 'testUser',
                email: 'testuser@testmail.com',
                password: 'testPass'
            })


        token = (await request(app)
            .post('/login')
            .send({
                email: 'testuser@testmail.com',
                password: 'testPass'
            })).body.token
    });
    it('returns status code 200 if task creation.', async () => {
        const res = await request(app)
            .post('/book/add')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "title": "testBook",
                "author": "test",
                "yearPublication": 2000,
                "pages": 42
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.objectContaining(objectExpect))
    })

    it('returns status code 401 if incorrect data', async () => {
        const res = await request(app)
            .post('/book/add')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "title": "testBook",
                "author": "test",
                "yearPublication": 2000,
                "pages": "X"
            })
        expect(res.statusCode).toEqual(400);
    })
})

describe('GET /books', () => {

    it('returns status code 200', async () => {
        const res = await request(app)
            .get('/books')
            .send()

        expect(res.statusCode).toEqual(200);
    })

    it('returns status code 400 if invalid page', async () => {
        const res = await request(app)
            .get('/books?page=-1')
            .send()

        expect(res.statusCode).toEqual(400);
    })
})

describe('PATCH /book/:id', () => {
    let idTask: string;
    let token: string;
    beforeAll(async () => {
        await request(app)
            .post('/register')
            .send({
                username: 'testPatch',
                email: 'testPatch@testmail.com',
                password: 'testPass'
            })


        token = (await request(app)
            .post('/login')
            .send({
                email: 'testPatch@testmail.com',
                password: 'testPass'
            })).body.token

        idTask = (await request(app)
            .post('/book/add')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "title": "testBook1",
                "author": "test1",
                "yearPublication": 2001,
                "pages": 42
            })).body.id
    });

    it('returns status code 200', async () => {
        const res = await request(app)
            .patch('/book/' + idTask)
            .set('Authorization', 'Bearer ' + token)
            .send({
                "title": 'testTitle'
            })

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.objectContaining(objectExpect))
    })

    it('returns status code 400 if incorrect data', async () => {
        const res = await request(app)
            .patch('/book/' + idTask)
            .set('Authorization', 'Bearer ' + token)
            .send({
                "title": ''
            })

        expect(res.statusCode).toEqual(400);

    })
})

describe('DELETE /books/:id', () => {
    let idTask: string;
    let token: string;
    beforeAll(async () => {
        await request(app)
            .post('/register')
            .send({
                username: 'testDELETE',
                email: 'testDELETE@testmail.com',
                password: 'testPass'
            })


        token = (await request(app)
            .post('/login')
            .send({
                email: 'testDELETE@testmail.com',
                password: 'testPass'
            })).body.token

        idTask = (await request(app)
            .post('/book/add')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "title": "testDELETE",
                "author": "testDELETE",
                "yearPublication": 2001,
                "pages": 42
            })).body.id
    });

    it('returns status code 200 if delete is successful', async () => {
        const res = await request(app)
            .delete('/book/' + idTask)
            .set('Authorization', 'Bearer ' + token)
            .send()

        expect(res.statusCode).toEqual(200);
    })

    it('returns status code 404', async () => {
        const res = await request(app)
            .delete('/book/' + idTask)
            .set('Authorization', 'Bearer ' + token)
            .send()

        expect(res.statusCode).toEqual(404);
    })
})