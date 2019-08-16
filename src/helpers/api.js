import randtoken from 'rand-token';

export const mockRegistration = new Promise(function (resolve, reject) {
    resolve({token: randtoken.generate(16)});
});
