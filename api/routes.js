const Router = require('@koa/router');
const router = new Router();

const lrProperty = require('./models/lrProperty.js');

// Assumes that the postcode format is XXXX XXXX (contains whitespace)
const splitPostcode = (postcode) => {
    const unsplitPostCode = String(postcode).toUpperCase();
    const splitPostcode = unsplitPostCode.split(' ');
    outcode = splitPostcode[0];
    incode = splitPostcode[1];
    return { outcode, incode }; 
}

router.get('/lrPropertyData', async (ctx) => 
{
	const { propertyId, postcode, street } = ctx.request.query;

	let query = {};

	// Checks if property id exists and does not contain letters
	if (propertyId && /^\d+$/.test(propertyId)) query.id = propertyId;

	// Checks if postcode exists and contains whitespace. It would be good to have here a mechanism to split outcode and incode if the user forgot to input a whitespace between them
	if (postcode && (/\s/.test(postcode) === true)) query = splitPostcode(postcode);

	// Checks if street exists
	// There could be more validations here to make sure the format is correct, e.g. Name + whitespace + Street or Road or Lane etc. w
	if (street) query.street = street.toUpperCase();

	// Makes a query to the db only if at least one param is available
	if (Object.keys(query).length > 0) {
		ctx.propertyData = await new lrProperty().where(query).fetchAll({withRelated: ['lrTransactions'], require: false});
		return ctx.body = {success: true, propertyData: ctx.propertyData.toJSON()};
	}

	// return an empty array if there's no data to retrieve
	if(!ctx.propertyData) {
		return ctx.body = {success: true, propertyData: []};
	}

	/* I haven't managed to restructure the database but I think having indicies on some of the fields and better structed queries would definitely improve performance. 
	   It appears to me that the lr_properties table is only in the 1NF. I think the performance could be improved by normalising it further into the following tables:
	 	- a table containing postcode id(primary key), property id(foreign key) outcode, incode and street, outcode and incode would be the
	 	- a table containing property id and transaction id
	 	- the table with transactions could stay the same
		- a table containing property id(primary key), postcode id(foreign key)
		There should be more tables here but my SQL skills are a bit rusty as I've been using NO SQL database (Mongo) since I started working at i6. I'm hoping to improve my SQL skills 
		as I think NO SQL dbs get messy very quickly and easily and can be limiting at times. 
	 */
});

module.exports = (app) =>
{
	app
	.use(router.routes())
	.use(router.allowedMethods());
};
