import { Git } from "./git";
import { test, describe, expect } from "bun:test";

describe("Git functionality", () => {
    test("Initialise git", () => {
        const repo = new Git();
        repo.init();
        expect(repo.head.name).toBe("master");
        expect(repo.head.commit).toBeNull();
        expect(repo.branches.length).toEqual(1);
        expect(repo.commitHistory.length).toEqual(0);
        expect(repo.lastCommittedId).toBe(0);
    });

    test("First Commit", () => {
        const repo = new Git();
        repo.init();
        let message = "Commit 1";
        repo.commit(message);
        expect(repo.commitHistory.length).toEqual(1);
        expect(repo.head.commit).toBeDefined();
        expect(repo.head.commit.Id).toEqual(repo.lastCommittedId);
        expect(repo.head.commit.head.name).toBe("master");
        expect(repo.commitHistory[0].message).toBe(message);
    });

    test("Make five commits", () => {
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
    });

    test("Create and checkout new branch", () => {
        const repo = new Git();
        repo.init();
        repo.commit("Commit 1");
        repo.checkout("new-branch");
        expect(repo.head.name).toBe("new-branch");
        expect(repo.branches.length).toBe(2);
        expect(repo.head.commit.message).toBe("Commit 1");
    });

    test("Switch back to master branch", () => {
        const repo = new Git();
        repo.init();
        repo.commit("Commit 1");
        repo.checkout("new-branch");
        repo.commit("Commit 2");
        repo.checkout("master");
        expect(repo.head.name).toBe("master");
        expect(repo.head.commit.message).toBe("Commit 1");
    });

    test("Merge branches", () => {
        const repo = new Git();
        repo.init();
        repo.commit("Commit 1");
        repo.checkout("new-branch");
        repo.commit("Commit 2");
        repo.checkout("master");
        repo.merge("new-branch");
        expect(repo.commitHistory[0].message).toBe("Commit 2");
        expect(repo.commitHistory[0].head.name).toBe("master");
    });

    test("Invalid branch checkout", () => {
        const repo = new Git();
        repo.init();
        repo.commit("Commit 1");
        repo.checkout("nonexistent-branch");
        expect(repo.head.name).toBe("nonexistent-branch");
        expect(repo.branches.length).toBe(2);
    });

    test("Check valid branch", () => {
        const repo = new Git();
        repo.init();
        repo.checkout("new-branch");
        expect(repo.isValidBranch("new-branch")).toBe(true);
        expect(repo.isValidBranch("master")).toBe(true);
        expect(repo.isValidBranch("nonexistent-branch")).toBe(false);
    });
});
