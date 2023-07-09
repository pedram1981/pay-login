import * as follower from '../parts/follower/follower.js'
import * as nozoorat from '../parts/follower/nozoorat.js'


function isFollow(idfollow,idfollower) {
    follower.isFollow(idfollow,idfollower);
}

function add(idfollow,idfollower) {
    insert.follow(idfollow,idfollower);
}

function remove(idfollow,idfollower) {
    remove.unfollow(idfollow,idfollower);
}

function listFollower(idfollow,idfollower) {
    find.listFollower(idfollow,idfollower);
}

function listNozoorat(idMotavafa) {
    nozoorat.listNozoorat(idMotavafa);
}

export {
    isFollow,
    add,
    remove,
    listFollower,
    listNozoorat
}