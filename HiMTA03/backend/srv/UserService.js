//MOCK service
module.exports = (srv) => {

    srv.on('READ', 'Bank', () => [
        {
            bid: 1000, cuid: 1000, name: "Nac Bank RB", createdby: "MAG", createdon: "30.05.2019"
        }
    ]);

    srv.on('READ', 'Currency', () => [
        { 
            cuid: 1000, name: "EURO", createdby: "MAG", createdon: "30.05.2019",
            toCourse: [
                { coid: 1000, cuid: 1000, date: "30.05.2019", value: "2.3330", createdby: "MAG", createdon: "30.05.2019",
                  toCurrency:{ cuid: 1000, name: "EURO", createdby: "MAG", createdon: "30.05.2019" }}
            ],
            toBank: [
                { bid: 1000, cuid: 1000, name: "Nac Bank RB", createdby: "MAG", createdon: "30.05.2019", 
                toCurrency:{ cuid: 1000, name: "EURO", createdby: "MAG", createdon: "30.05.2019" }}
            ]
        }
    ]);

    srv.on('READ', 'Course', () => [
        {
            coid: 1000, cuid: 1000, date: "30.05.2019", value: "2.3330", createdby: "MAG", createdon: "30.05.2019"
        }
    ]);

    srv.on('READ', 'Log', () => [
        {
            loid: 1000, coid: 1000, text: "First course into table", createdby: "MAG", createdon: "30.05.2019" }
    ]);
};
