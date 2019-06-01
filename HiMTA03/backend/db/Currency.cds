type Id : Integer;
using Bank from './ExtraInfo';
using Course from './ExtraInfo';

entity Currency {
    key cuid : Id;
    name : String(10);
	createdby: String(100);
	createdon: String(30);

    toCourse : association to many Course on toCourse.cuid = cuid;
    toBank : association to many Bank on toBank.cuid = cuid;
	};