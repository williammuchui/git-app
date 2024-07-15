import {Git} from "./git"
import {test,describe, expect} from "bun:test";

describe("Git functionality", ()=>{
    test("Initialise git", ()=>{
        const repo = new Git();
        repo.init();
        expect(repo.head.name).toBe("master");
        expect(repo.head.commit).toBeNull();
        expect(repo.branches.length).toEqual(1);
        expect(repo.commitHistory.length).toEqual(0);
        expect(repo.lastCommitedId).toBe(0);
    })
    test("First Commit", ()=>{
        const repo = new Git();
        repo.init();
        let message = "Commit 1";
        repo.commit(message);
        expect(repo.commitHistory.length).toEqual(1);
        expect(repo.head.commit).toBeDefined();
        expect(repo.head.commit.Id).toEqual(repo.lastCommitedId++);
        expect(repo.head.commit.head.name).toBe("master");
        expect(repo.commitHistory[0].message).toBe(message);
    })

    test("Make five commits", ()=>{
        const repo = new Git();
        repo.init();
        repo.commit("Commit 1");
        repo.commit("Commit 2");
        repo.commit("Commit 3");
        repo.commit("Commit 4");
        repo.commit("Commit 5");

        expect(repo.commitHistory.length).toBe(5);
        expect(repo.commitHistory[0].Id).toBe(5);
        expect(repo.commitHistory[0].message).toBe("Commit 5");
        expect(repo.commitHistory[2].message).toBe("Commit 3");
        expect(repo.head.commit.message).toBe("Commit 5");
        expect(repo.head.commit.head.commit.message).toBe("Commit 4");
    })
})