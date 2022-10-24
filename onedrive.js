var fs = require('fs');
var mime = require('mime');
var request = require('request');
const qs = require('qs');
const axios = require('axios');

// var re = new RegExp(find, 'g');

// str = str.replace(re, '');

var file = 'transform.zip'; // Filename you want to upload on your local PC
var onedrive_folder = new Date().toLocaleDateString().replaceAll('/', '-'); // Folder name on OneDrive
var onedrive_filename = file; // Filename on OneDrive
var onedrive_client_id = 'Y1v8Q~dIdlMVN0OgU4EmiMxH42IdD5MxOrU--c2-'
var onedrive_client_secret = '9f82b01e-2192-457d-979a-6027dc2f220c'

// console.log(new Date().)

axios({
    method: 'post',
    url: 'https://login.microsoftonline.com/8e4ab9a2-4965-4cf3-9a28-041f46cc222f/oauth2/v2.0/token',
    data: qs.stringify({
        grant_type: 'client_credentials',
        client_id: '80f8e924-4f02-45f6-9338-91ec0717f9d0',
        client_secret: 'yX08Q~7MpRmS2jz.UE6pbL68XTDbvnfLspXtdax1',
        scope: 'https://graph.microsoft.com/.default'
    }),
    headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
}).then(function (response) {
    const access_token = "EwB4A8l6BAAUkj1NuJYtTVha+Mogk+HEiPbQo04AAWCMJViA3ccg6o3zWCYGBDOmjLU+/8Z5k8uwiEUuhJ3ytDWJ7AzfK9EIvX+P4Wst3m6K+4SM35EaitbqWCBYMx2E5axPGPIkwSdOvWZg5A7hvMZEk3O/gt44iDUGtzMV8wj2kwngkfhWFytRt3KQNi5ursGwHeVQY+QIn0bnK+MJZQ7rPKpCuuf8WFBSAUoEA6IZuPTvtr0ZJyXQYFK2z4xMwsrGpf/TMgHjmwnHX97Nva0BjPcAv9RNUsENc2EKgBI2FJl+gflp9fC1XS2fp1n8C/1xSpBXlq/gYW9sWKDt2YWQ5ZoxWQLw5/xuXsAS30JDheue8jPU5cb4Yq1YeVMDZgAACPmc0SJwlCfTSALIO3CRQUtn6njZjYPhkVuPhLhSV5gppACspOt5DQwdae/1Mm+cDVjJ5SPRlvMOdyhfFTp7sQMjxqFWY4s7/VD1IqiAL8mZIuB90CuBKXBCLNhQDhLONzjYPRBUbAnKo8+uw8FJhK7G903hD5AQIzscGwiepNnLpkfXl0145yIWZrLhKNLoGa4O7dO3IfXlZyEvjrI3hOkRfNWmaBRS2jOd9bMZJt1ikliRnJwFyM7ruewXQityfDPZETobj+ot2U0J7ehJJjjqQkVDS/V9PZh57eeYrLXi5bCfIN8frS29H83CEEi2yhtFGcpVQZO4wDUNWeShwVBStuUmibBPvueEmwKBgtMpOH0+sWl8t+nsxiFdwcEmOXwJ1fa+DPjE46CVd6l5qR1Y1nmYTVO+dUY6DxgTONr/RxY67GB78kQKGqhVdtwuZ0SFZf4/i+sgq6bNwTo0CU01EQZT/4SgHGOmAVO4H8yt0J5JJCQs62KUehZXxSGAbdzTjNjBrxV6ynI0uoOwaADaxPwJ0YLp5BjwDzCCB33scZN2eax9bCrtDo4tc+P3KEs7PvzhMDkmPdp9h4xWLsKuEJsZ6VWbmjYo5PZw2AKD9tkCtuiaPVtHGK6sr87lAt+/yiiN4l3j2SqDJqvnvzBEguOpBVh/nD5AFc6xTMz/qItZcKk6cQ3/MWDElprqLxxaq/3DR2bJlLMHvAHyKq97/J9C1wRdxN5f52wVhWFa8vj/8RUE+Aw2zZETG6K9xyWvk96/VbEUxnzBJOsBG4jei38C";
    console.log(mime.getType(file));
    fs.readFile(file, 'utf8', function read(e, f) {
        // console.log(f, e)
        axios({
            method: 'put',
            url: 'https://graph.microsoft.com/v1.0/drive/root:/' + onedrive_folder + '/' + onedrive_filename + ':/content',
            headers: {
                'Authorization': "Bearer " + access_token,
                'Content-Type': mime.getType(file), // When you use old version, please modify this to "mime.lookup(file)",
            },
            body: f,
        }).then((e) => console.log(e.data)).catch(e => console.log(e.response.data))
    });
}).catch(function (error) {
    console.log(error)
})
// request.post({
//     url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
//     form: {
//         redirect_uri: 'https://estimate-admin-uat.inchcape.com.sg:6002/',
//         client_id: onedrive_client_id,
//         client_secret: onedrive_client_secret,
//         refresh_token: onedrive_refresh_token,
//         grant_type: 'refresh_token'
//     },
// }, function(error, response, body) {
//     fs.readFile(file, function read(e, f) {
//         request.put({
//             url: 'https://graph.microsoft.com/v1.0/drive/root:/' + onedrive_folder + '/' + onedrive_filename + ':/content',
//             headers: {
//                 'Authorization': "Bearer " + JSON.parse(body).access_token,
//                 'Content-Type': mime.getType(file), // When you use old version, please modify this to "mime.lookup(file)",
//             },
//             body: f,
//         }, function(er, re, bo) {
//             console.log(bo);
//         });
//     });
// });