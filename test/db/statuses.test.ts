import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { suite, test, slow } from 'mocha-typescript';

import { StatusDoc } from '../../src/modules/db/StatusDoc';
import { PublicTimeline } from '../../src/modules/Status';
import { readFile } from '../../src/utils/promisified-io';
import { DataAccess } from '../../src/db/DataAccess';
import { StatusRepo } from '../../src/repository/StatusRepo';
import { ExchangeGeo } from '../../src/utils/ExchangeGeo';

chai.use(chaiAsPromised);
let expect = chai.expect;

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
        await StatusTest.db.dropDatabase();
    }
    repo: StatusRepo;
    before() {
        this.repo = new StatusRepo();
    }
    after() { }
    static after() { }
    @test @slow(200)
    testInserted() {
        // console.log(StatusTest.example[0]);
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
    @test
    testGetDefaultPage() {
        expect(this.repo.getPaging()).eventually.have.lengthOf(10);
        this.repo.getPaging().then((doc) => {
            StatusTest.page_id = doc[0]._id;
            // console.log(StatusTest.page_id);
        })
    }
    @test
    testGetNextPage() {
        let pageId = StatusTest.page_id.toString();
        console.log(pageId.length);
        expect(this.repo.getPaging(pageId, 2, 5)).eventually.have.lengthOf(5);
        // this.repo.getPaging(StatusTest.page_id, 5, 5).then((doc) => {
        //     doc.forEach((val) => {
        //         console.log(val._id);
        //     })
        // })
    }
    @test
    testTotalCount() {
        expect(this.repo.getTotalCount()).eventually.be.equal(20);
    }
}
