const fsSync = require('fs');
const fs = fsSync.promises;
const config = require('../config');

const usersPath = config.usersPath;

async function getUsers() {
	let g_users = [];

	if (fsSync.existsSync(usersPath)) {
		g_users = await fs.readFile(usersPath, {encoding:'utf8', flag:'r'});
		g_users = JSON.parse(g_users);
		g_users = g_users.g_users;
	}

    return g_users;
}

async function addUser(email, displayName) {
    let g_users = [];
    let user = {};
    let id = await getUserId();

    g_users = await getUsers();
    if(!displayName) displayName = email;
    user = {id, email, displayName};
    g_users.push(user);
	await fs.writeFile(usersPath, JSON.stringify({g_users}));

    return user;
}

async function getUserId() {
    let id = -1;
    let g_users = await getUsers();

    g_users.forEach(user => {
        if(user.id > id) id = user.id;
    });

    return id + 1;
}

async function getUserByEmail(email) {
    let g_users = await getUsers();
    let filteredUsers = [];

    if(g_users.length) {
        filteredUsers = g_users.filter(user => user.email === email);
    }

    return filteredUsers[0];
}

async function getUserById(id) {
    let g_users = await getUsers();
    let filteredUsers = [];

    if(g_users.length) {
        filteredUsers = g_users.filter(user => user.id === id);
    }

    return filteredUsers[0];
}

module.exports = {
    getUsers,
	addUser,
    getUserId,
    getUserByEmail,
    getUserById
}