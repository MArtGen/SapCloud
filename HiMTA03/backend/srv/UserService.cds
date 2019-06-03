using Bank as _Bank from '../db/ExtraInfo';
using Currency as _Currency from '../db/Currency';
using Course as _Course from '../db/ExtraInfo';
using Log as _Log from '../db/ExtraInfo';
using BankCurrency as _BankCurrency from '../db/ExtraInfo';

service odata {

  entity Bank @(
		title: 'Bank',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Bank;

	  entity BankCurrency @(
		title: 'BankCurrency',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _BankCurrency;

  entity Currency @(
		title: 'Currency',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Currency;

    entity Course @(
		title: 'Course',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Course;

		entity Log @(
		title: 'Log',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Log;
}
