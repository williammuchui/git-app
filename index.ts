import {Git} from "./git"

const repo = new Git();
repo.init();
repo.commit("Initial commit");
repo.commit("Added a ReadMe file");
repo.log();