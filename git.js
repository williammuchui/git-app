
export class Git{
    constructor(){
        this.branches = [];
        this.lastCommitedId = 0;
        this.commitHistory = [];
    };

    init(){
        const master = this.branch("master", null);
        this.head = master;
        this.branches.push(master)
    }

    commit(message){
        const Commit = {Id:++this.lastCommitedId, message:message, head: {name: this.head.name, commit: this.head.commit}};
        this.commitHistory.unshift(Commit);
        this.head.commit = Commit;
        
    }

    log(){
        for(const log of this.commitHistory){
           if(log.head.name === this.head.name){
            console.log(log);
           }
           }
        
    }

    branch(branchName, commit){
       return {name: branchName, commit: commit};
    }

    checkout(branchName){
        for(var i = this.branches.length; i--;){
            if(this.branches[i].name === branchName){
                this.head = this.branches[i];
            }
        else{
            const newBranch = this.branch(branchName, this.head.commit);
            this.branches.push(newBranch);
            this.head = newBranch;
        }
    }
    }

    isValidBranch(branchName){
        for (const branch in this.branches){
            if(branch.name === branchName)return true;
        }
        return false;
    } 
    merge(branchName){
        // if(this.isValidBranch(branchName)){
        for(const log of this.commitHistory){
            if(log.head.name === branchName){
                log.head.name = this.head.name;
            }
        }
    // }else{
        // console.log(`${branchName} not a valid branch!`)
    // }
    }
}
