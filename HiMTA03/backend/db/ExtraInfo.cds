using Currency from './Currency';
using Id from './Currency';

		entity Bank {
			key bid : Id;
			name : String(100);
			createdby: String(100);
			createdon: String(30);

			toBankCurrency : association to many BankCurrency on toBankCurrency.bid = bid;
		};

		entity BankCurrency {
			key bid : Id;
			key cuid : Id;
			createdby: String(100);
			createdon: String(30);

			toCurrency : association to one Currency on toCurrency.cuid = cuid;
			toBank : association to one Bank on toBank.bid = bid;
		};

		entity Course {
			key coid : Integer;
			cuid : Integer;
			date : String(30);
			value : String(10);
    		createdby: String(100);
			createdon: String(30);

			toCurrency : association to one Currency on toCurrency.cuid = cuid;
		};

		entity Log {
		    key loid : Integer;
		    text : String(200);
			createdby: String(20);
			createdon: String(30);
		};