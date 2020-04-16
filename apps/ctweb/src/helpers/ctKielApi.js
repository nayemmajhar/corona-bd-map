// const ctKielApi ={
//     URL: 'http://127.0.0.1:8080/v1',
//     siteUrl: 'http://localhost:3000'
// }

const ctKielApi ={
    URL: (process.env.NODE_ENV === 'development')? 'http://127.0.0.1:8080/v1':'http://68.183.64.86:8080/v1',
    siteUrl: (process.env.NODE_ENV === 'development')? 'http://localhost:3000':'http://68.183.64.86:3000'
}

export default ctKielApi;