// Import the dependencies for testing
const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../server');
const Project = require('../Models/Project');
const server = require('../server')

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Projects", () => {
    describe("GET /", () => {
        // Test to get all projs record
        it("should get all projs record", (done) => {
            chai.request(app)
                .get('/project/list')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    describe("GET/:id",()=>{
        // Test to get single student record
        it("should get a single proj record", (done) => {
            const id = "5caed226413cc6563d455218";
            chai.request(app)
                .get(`/project/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
    describe("POST/",()=>{
        // Test to get single student record
        it("should add a single proj record", (done) => {
            const data = {
                    "taskName":"thursday",
                    "description":"this",
                    "priority":"medium",
                    "completed":false
            };

            chai.request(app)
                .post(`/project/add`)
                .send(data)
                .set("Content-Type", "application/json")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.should.have.property('taskName').eql("thursday");
                    res.body.should.have.property('proj').eql('Added Successfully');
                    done();
                });
        });
    });
    describe('/PUT/:id proj', () => {
        it('it should UPDATE a proj given the id', (done) => {
            let proj = new Project({
                taskName: "The Chronicles of Narnia",
                description: "C.S. Lewis",
                priority: 'Low',
                completed: 'true'
            });
            proj.save((err, proj1) => {
                chai.request(server)
                    .put('/project/update/' + proj1.id)
                    .send({taskName: "Narnia2", description: "C.S. Lewis", priority: "High", completed: true})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('proj').eql('Project updated!');
                        res.body.data.should.have.property('taskName').eql('Narnia2');
                        done();
                    });
            });
        });
    });

    describe('/DELETE/:id proj', () => {
        it('it should DELETE a proj given the id', (done) => {
            let proj = new Project({
                taskName: "The Chronicles of Narnia",
                description: "C.S. Lewis",
                priority: 'Low',
                completed: 'true'
            });
            proj.save((err, proj1) => {
                chai.request(server)
                    .delete('/project/delete/' + proj1.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Project successfully deleted!');
                        done();
                    });
            });
        });
    });
});

