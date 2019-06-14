//MOCK service
module.exports = (srv) => {

    srv.on('READ', 'bank', () => [
        {
            bid: 1000, name: "NacBankRB", createdby: "MAG", createdon: "30.05.2019"
        }
    ]);

    srv.on('READ', 'currency', () => [
        { 
            cuid: 1000, name: "EUR", createdby: "MAG", createdon: "30.05.2019",
            toCourse: [
                { coid: 1000, cuid: 1000, date: "30.05.2019", value: "2.3330", createdby: "MAG", createdon: "30.05.2019",
                  toCurrency:{ cuid: 1000, name: "EUR", createdby: "MAG", createdon: "30.05.2019" }}
            ]
        }
    ]);

    srv.on('READ', 'bankCurrency', () => [
        {
            bid: 1000, cuid: 1000, createdby: "MAG", createdon: "30.05.2019",
            toCurrency: [
                { cuid: 1000, name: "EUR", createdby: "MAG", createdon: "30.05.2019" }   
            ],
            toBank: [
                { bid: 1000, name: "NacBankRB", createdby: "MAG", createdon: "30.05.2019" }
            ]
        }
    ]);

    srv.on('READ', 'course', () => [
        {
            coid: 1000, cuid: 1000, date: "30.05.2019", value: "2.3330", createdby: "MAG", createdon: "30.05.2019"
        }
    ]);

    srv.on('READ', 'log', () => [
        {
            loid: 1000, text: "First log", createdby: "MAG", createdon: "30.05.2019" }
    ]);
};
