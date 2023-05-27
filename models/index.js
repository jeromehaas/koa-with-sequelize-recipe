const Job = require('./job.model.js');
const Company = require('./company.model.js');
const Address = require('./address.model.js');
const Candidate = require('./candidate.model.js');
const Application = require('./application.model.js');
const User = require('./user.model.js');

// JOBS <= COMPANY
Job.belongsTo(Company, {
	foreignKey: {
		allowNull: false,
		name: 'company_id',
	},
});

Company.hasMany(Job, {
	foreignKey: {
		allowNull: true,
		name: 'company_id',
	},
});

// JOB => COMPANY
Job.belongsToMany(Candidate, {
	through: 'application',
	foreignKey: {
		allowNull: false,
		name: 'candidate_id',
	},
});

// CANDIDATE => JOB
Candidate.belongsToMany(Job, {
	through: 'application',
	foreignKey: {
		allowNull: false,
		name: 'job_id',
	},
});

// COMPANY -> ADDRESS
Company.hasOne(Address, {
	foreignKey: {
		allowNull: false,
		name: 'company_id',
	},
});

// ADDRESS -> COMPANY
Address.belongsTo(Company, {
	foreignKey: {
		allowNull: false,
		name: 'company_id',
	},
});

module.exports = {
	Job,
	Company,
	Address,
	Application,
	Candidate,
	User,
};
