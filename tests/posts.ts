import * as request from 'supertest'
import app from '../src/main'
import { describe, it } from 'mocha'
import { expect } from 'chai'

let postId = ''
let updatedAt = ''
let createdAt = ''

describe('POSTS', function () {
	it('should return all posts', (done) => {
		request(app)
			.get('/posts')
			.expect(200)
			.end(function (err, res) {
				if (err) {
					return done(err)
				}

				expect(res.body).to.not.be.empty
				expect(res.body.length).to.not.eql(0)
				expect(res.body.posts).to.be.an('array')
				expect(res.body.totalCount).to.be.a('number')
				expect(res.body.pages).to.be.a('number')
				done()
			})
	})

	it('should create new post', (done) => {
		request(app)
			.post('/posts')
			.send({
				title: 'Test Post',
				content: 'This is a test post',
				tags: ['test', 'post']
			})
			.expect(200)
			.end(function (err, res) {
				if (err) {
					return done(err)
				}

				expect(res.body).to.not.be.empty
				expect(res.body.length).to.not.eql(0)
				expect(res.body.title).to.be.an('string')
				expect(res.body.title).to.eql('Test Post')
				expect(res.body.content).to.be.a('string')
				expect(res.body.content).to.eql('This is a test post')
				expect(res.body.tags).to.be.an('array')
				expect(res.body.tags).to.eql(['test', 'post'])
				expect(res.body._id).to.be.an('string')
				expect(res.body.createdAt).to.be.a('string')
				expect(res.body.updatedAt).to.be.a('string')
				postId = res.body._id
				updatedAt = res.body.updatedAt
				createdAt = res.body.createdAt
				done()
			})
	})

	it('should get a post by Id', (done) => {
		request(app)
			.get(`/posts/${postId}`)
			.expect(200)
			.end(function (err, res) {
				if (err) {
					return done(err)
				}

				expect(res.body).to.not.be.empty
				expect(res.body.length).to.not.eql(0)
				expect(res.body.title).to.be.an('string')
				expect(res.body.title).to.eql('Test Post')
				expect(res.body.content).to.be.a('string')
				expect(res.body.content).to.eql('This is a test post')
				expect(res.body.tags).to.be.an('array')
				expect(res.body.tags).to.eql(['test', 'post'])
				expect(res.body._id).to.be.an('string')
				expect(res.body.createdAt).to.be.a('string')
				expect(res.body.updatedAt).to.be.a('string')
				expect(res.body._id).to.eql(postId)
				expect(res.body.updatedAt).to.eql(updatedAt)
				expect(res.body.createdAt).to.eql(createdAt)
				done()
			})
	})

	it('should update post by id', (done) => {
		request(app)
			.put(`/posts/${postId}`)
			.send({
				title: 'Test Post 1',
				content: 'This is a test post 1',
				tags: ['test2', 'post2']
			})
			.expect(200)
			.end(function (err, res) {
				if (err) {
					return done(err)
				}

				expect(res.body).to.not.be.empty
				expect(res.body.length).to.not.eql(0)
				expect(res.body.title).to.be.an('string')
				expect(res.body.title).to.eql('Test Post 1')
				expect(res.body.content).to.be.a('string')
				expect(res.body.content).to.eql('This is a test post 1')
				expect(res.body.tags).to.be.an('array')
				expect(res.body.tags).to.eql(['test2', 'post2'])
				expect(res.body._id).to.be.an('string')
				expect(res.body.createdAt).to.be.a('string')
				expect(res.body.updatedAt).to.be.a('string')
				expect(res.body._id).to.eql(postId)
				expect(res.body.createdAt).to.eql(createdAt)
				expect(res.body.updatedAt).to.not.eql(updatedAt)
				updatedAt = res.body.updatedAt
				createdAt = res.body.createdAt
				done()
			})
	})

	it('should search for post', (done) => {
		request(app)
			.get(`/posts/search?q=Test Post`)
			.expect(200)
			.end(function (err, res) {
				if (err) {
					return done(err)
				}

				expect(res.body).to.not.be.empty
				expect(res.body.length).to.not.eql(0)
				done()
			})
	})

	it('should delete post by id', (done) => {
		request(app)
			.delete(`/posts/${postId}`)
			.expect(200)
			.end(function (err, res) {
				if (err) {
					return done(err)
				}

				expect(res.body).to.not.be.empty
				expect(res.body.length).to.not.eql(0)
				expect(res.body.success).to.be.an('boolean')
				expect(res.body.success).to.be.true
				done()
			})
	})

	it('should create new post', (done) => {
		request(app)
			.post('/posts')
			.send({
				title: 'Test Post',
				content: 'This is a test post',
				tags: ['test', 'post']
			})
			.expect(200)
			.end(function (err, res) {
				if (err) {
					return done(err)
				}

				expect(res.body).to.not.be.empty
				expect(res.body.length).to.not.eql(0)
				expect(res.body.title).to.be.an('string')
				expect(res.body.title).to.eql('Test Post')
				expect(res.body.content).to.be.a('string')
				expect(res.body.content).to.eql('This is a test post')
				expect(res.body.tags).to.be.an('array')
				expect(res.body.tags).to.eql(['test', 'post'])
				expect(res.body._id).to.be.an('string')
				expect(res.body.createdAt).to.be.a('string')
				expect(res.body.updatedAt).to.be.a('string')
				postId = res.body._id
				updatedAt = res.body.updatedAt
				createdAt = res.body.createdAt
				done()
			})
	})

	it('should delete posts by tag', (done) => {
		request(app)
			.delete('/posts?tag=test')
			.expect(200)
			.end(function (err, res) {
				if (err) {
					return done(err)
				}

				expect(res.body).to.not.be.empty
				expect(res.body).to.not.be.empty
				expect(res.body.length).to.not.eql(0)
				expect(res.body.success).to.be.an('boolean')
				expect(res.body.success).to.be.true
				done()
			})
	})
})

describe('POSTS - Failure cases', function () {
	it('should fail to create post with missing title', (done) => {
		request(app)
			.post('/posts')
			.send({
				content: 'Missing title',
				tags: ['fail']
			})
			.expect(400)
			.end((err, res) => {
				if (err) return done(err)
				done()
			})
	})

	it('should fail to create post with short title', (done) => {
		request(app)
			.post('/posts')
			.send({
				title: 'Hi',
				content: 'Too short',
				tags: ['fail']
			})
			.expect(500)
			.end((err, res) => {
				if (err) return done(err)
				done()
			})
	})

	it('should return 404 for nonexistent post ID', (done) => {
		request(app)
			.get('/posts/000000000000000000000000')
			.expect(404)
			.end((err, res) => {
				if (err) return done(err)
				done()
			})
	})

	it('should return 400 for invalid post ID format', (done) => {
		request(app)
			.get('/posts/invalid-id-format')
			.expect(400)
			.end((err, res) => {
				if (err) return done(err)
				done()
			})
	})

	it('should fail to update post with invalid ID', (done) => {
		request(app)
			.put('/posts/notarealid')
			.send({
				title: 'New',
				content: 'New',
				tags: ['fail']
			})
			.expect(400)
			.end((err, res) => {
				if (err) return done(err)
				done()
			})
	})

	it('should fail to delete post with invalid ID', (done) => {
		request(app)
			.delete('/posts/notarealid')
			.expect(400)
			.end((err, res) => {
				if (err) return done(err)
				done()
			})
	})

	it('should 404 when finding unknown post', (done) => {
		request(app)
			.get('/posts/search?q=__unlikely_unique_string__')
			.expect(404)
			.end((err, res) => {
				if (err) return done(err)
				done()
			})
	})

	it('should return 400 when deleting posts without tag param', (done) => {
		request(app)
			.delete('/posts')
			.expect(400)
			.end((err, res) => {
				if (err) return done(err)
				done()
			})
	})
})
