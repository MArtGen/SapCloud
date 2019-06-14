using Bank as _Bank from '../db/ExtraInfo';
using Currency as _Currency from '../db/Currency';
using Course as _Course from '../db/ExtraInfo';
using Log as _Log from '../db/ExtraInfo';
using BankCurrency as _BankCurrency from '../db/ExtraInfo';

service odata {

  entity bank @(
		title: 'bank',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Bank;

	  entity bankCurrency @(
		title: 'bankCurrency',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _BankCurrency;

  entity currency @(
		title: 'currency',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Currency;

    entity course @(
		title: 'course',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Course;

		entity log @(
		title: 'log',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Log;
}
