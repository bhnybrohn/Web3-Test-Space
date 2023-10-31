const parsePhoneNumber = require('libphonenumber-js')

const phoneNumber = parsePhoneNumber(' 09027444895 ', 'NG')
console.log(phoneNumber)