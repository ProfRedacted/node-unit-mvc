const sinon = require('sinon');
const PostModel = require('../../models/post.model');
const PostController = require('../moduleA');

describe('Post controller', () => {
    // Setup the responses
    let req = {
        body: {
            author: 'stswenguser',
            title: 'My first test post',
            content: 'Random content'
        }
    };

    let error = new Error({ error: 'Some error message' });

    let res = {};

    let expectedResult;

    
    describe('create', () => {
        var createPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });


        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });


        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            createPostStub = sinon.stub(PostModel, 'createPost').yields(error);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update', () => {
        var updatePostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
            expectedResult = req.body
        });

        afterEach(() => {
            // executed after the test case
            updatePostStub.restore();
        });
        
        it('should return an updated post', () => {
            
            // Arrange
            updatePostStub = sinon.stub(PostModel, 'updatePost').yields(null, expectedResult);

            // Act
            PostController.update(req, res);

            // Assert   
            sinon.assert.calledWith(PostModel.updatePost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ id: req.body._id}));
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

            console.log()
        })

        it('should return a 500 on server error', () => {
            // Arrange
            updatePostStub = sinon.stub(PostModel, 'updatePost').yields(error);

            // Act
            PostController.update(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.updatePost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        })
    });

    describe('findPost', () => {
        var findPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
            expectedResult = req.body
        });

        afterEach(() => {
            // executed after the test case
            findPostStub.restore();
        });
        
        it('should return an the desired post', () => {

            // Arrange
            findPostStub = sinon.stub(PostModel, 'findPost').yields(null, expectedResult);

            // Act
            PostController.find(req, res);

            // Assert   
            sinon.assert.calledWith(PostModel.findPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ id: req.body._id}));
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));
        })

        it('should return a 500 on server error', () => {
            // Arrange
            findPostStub = sinon.stub(PostModel, 'findPost').yields(error);

            // Act
            PostController.find(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.findPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        })

    })

    describe('getAllPosts', () => {
        var getAllPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
            expectedResult = req.body
        });

        afterEach(() => {
            // executed after the test case
            getAllPostStub.restore();
        });
        
        it('should return an the desired post', () => {

            // Arrange
            getAllPostStub = sinon.stub(PostModel, 'getThePosts').yields(null, expectedResult);

            // Act
            PostController.getAllPosts(req, res);

            // Assert   
            sinon.assert.calledWith(PostModel.getThePosts, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ id: req.body._id}));
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));
        })

        it('should return a 500 on server error', () => {
            // Arrange
            getAllPostStub = sinon.stub(PostModel, 'getThePosts').yields(error);

            // Act
            PostController.getAllPosts(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.getThePosts, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        })

    })

});