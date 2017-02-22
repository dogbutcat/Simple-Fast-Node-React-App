import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { suite, test, skip, only, slow } from 'mocha-typescript';

import { readFile } from '../../src/utils/promisified-io';
import { TokenRepo } from '../../src/repository/TokenRepo';
import { DataAccess } from '../../src/db/DataAccess';
import { TokenDoc } from '../../src/modules/db/TokenDoc';

chai.use(chaiAsPromised);
let expect = chai.expect;

@suite('TokenTests')
class TokenTest {
    static tokenFile;
    static clientInfo;
    static db;
    repo: TokenRepo;
    static async before() {
        TokenTest.tokenFile = JSON.parse(await readFile('token.json')) as TokenDoc;
        TokenTest.clientInfo = { client_id: 'xxxxx', client_secret: 'xxxxxxxx' };
        TokenTest.db = DataAccess.mongooseConnection.db;
        await TokenTest.db.dropDatabase();
    }
    before() {
        this.repo = new TokenRepo();
    }
    after() { }
    static after() { }
    @test
    testCreate() {
        expect(this.repo.create(TokenTest.clientInfo)).to.eventually.have.property('client_id', 'xxxxx', 'one x more');
        // this.repo.create(TokenTest.clientInfo).then((ret) => {
        //     console.log(ret); // clientInfo:{...}
        // })
    }
    @test @skip
    testUpdate() {
        // console.log(TokenTest.tokenFile);
        expect(this.repo.update('xxxxx', TokenTest.tokenFile)).eventually.has.property('nModified', 1);
        // this.repo.update('xxxxx',TokenTest.tokenFile).then((ret) => {
        //     console.log(ret); // clientInfo:{...}
        // })
    }
    @test @skip
    testGetToken() {
        expect(this.repo.getToken()).eventually.have.property('access_token', '2.00Vy7C9BTpb7UE16d1617ee8jfbihD');
    }
    @test @skip
    testGetClient() {
        expect(this.repo.getClientId()).eventually.have.property('client_id', 'xxxxx');
    }
}
