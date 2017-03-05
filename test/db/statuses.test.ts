import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { suite, test, slow, skip } from 'mocha-typescript';

import { StatusDoc } from '../../src/modules/db/StatusDoc';
import { PublicTimeline } from '../../src/modules/Status';
import { readFile } from '../../src/utils/promisified-io';
import { DataAccess } from '../../src/db/DataAccess';
import { StatusRepo } from '../../src/repository/StatusRepo';
import { ExchangeGeo } from '../../src/utils/ExchangeGeo';
import { IntervalAct, Insertion } from '../../src/utils/AutoInsertion';

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();
let expect = chai.expect;
let assert = chai.assert;

@suite('StatusTests')
class StatusTest {
    static examples: StatusDoc[];
    static apiExamples: PublicTimeline;
    static db;
    static page_id: string;
    static async before() {
        StatusTest.apiExamples = JSON.parse(await readFile('example.json')) as PublicTimeline;
        StatusTest.examples = JSON.parse(JSON.stringify(StatusTest.apiExamples.statuses)) as StatusDoc[];
        StatusTest.db = DataAccess.mongooseConnection.db;
        // await StatusTest.db.dropCollection('statuses');
    }
    repo: StatusRepo;
    clock: sinon.SinonFakeTimers;
    before() {
        this.repo = new StatusRepo();
        this.clock = sinon.useFakeTimers();
    }
    after() {
        this.clock.restore();
    }
    static after() { }
    @test @skip @slow(200)
    testInserted() {
        let changed = [];
        StatusTest.examples.forEach((val) => {
            let temp = val;
            if (val.geo)
                temp.geo = ExchangeGeo(val.geo);
            changed.push(temp);
        })
        // console.log(changed[1].geo);
        expect(this.repo.create(changed)).eventually.to.have.lengthOf(20);
    }
    @test @skip
    testGetDefaultPage() {
        expect(this.repo.getPaging()).eventually.have.lengthOf(10);
        this.repo.getPaging().then((doc) => {
            StatusTest.page_id = doc[0]._id.toString();
            // console.log(StatusTest.page_id);
        })
    }
    @test @skip
    testGetNextPage() {
        let pageId = StatusTest.page_id.toString();
        console.log(pageId.length);
        expect(this.repo.getPaging(pageId, 2, 5)).eventually.have.lengthOf(5);
    }
    @test @skip
    testTotalCount() {
        expect(this.repo.getTotalCount()).eventually.be.equal(20);
    }
    @test @skip
    testValidateSchema() {
        expect(this.repo.getPaging(StatusTest.page_id, 1)).eventually.to.have.deep.property('[0].geo', '').rejected;
    }
    @test
    testAPIRequest() {
        var stub = sinon.stub();
        var ioSpy = sinon.spy();
        stub.onFirstCall().returns(0);
        IntervalAct(stub, ioSpy);
        this.clock.tick(2000);
        // ioSpy.should.have.calledOnce;
        stub.should.calledOnce;
    }
}
