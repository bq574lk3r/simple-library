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

describe('POST /books', () => {
    it('returns status code 200 if task creation.', async () => {
        const res = await request(app)
            .post('/books')
            .send({
                "title": "testBook",
                "author": "test",
                "yearPublication": 2000,
                "pages": 42
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.objectContaining(objectExpect))
    })
})

describe('GET /books', () => {

    it('returns status code 200', async () => {
        const res = await request(app)
            .get('/books')
            .send()

        expect(res.statusCode).toEqual(200);
    })
})

describe('PATCH /books/:id', () => {
    let idTask: string;
    beforeAll(async () => {
        idTask = (await request(app)
            .post('/books')
            .send({
                "title": "testBook1",
                "author": "test1",
                "yearPublication": 2001,
                "pages": 42
            })).body.id
    });

    it('returns status code 200', async () => {
        const newTitle = 'testTitle'
        const res = await request(app)
            .patch('/books/' + idTask)
            .send(
                {
                    title: newTitle
                }
            )

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.objectContaining(objectExpect))
    })
})

describe('DELETE /books/:id', () => {
    let idTask: string;
    beforeAll(async () => {
        idTask = (await request(app)
            .post('/books')
            .send({
                "title": "testBook2",
                "author": "test2",
                "yearPublication": 2002,
                "pages": 42
            })).body.id
    });

    it('returns status code 200 if delete is successful', async () => {
        const res = await request(app)
            .delete('/books/' + idTask)
            .send()

        expect(res.statusCode).toEqual(200);
    })

    it('returns status code 404', async () => {
        const res = await request(app)
            .delete('/books/' + idTask)
            .send()

        expect(res.statusCode).toEqual(404);
    })
})