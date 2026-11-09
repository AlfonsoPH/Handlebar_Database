const {MongoClient} = require('mongodb');


const url = 'mongodb://127.0.0.1:27017';
const dbName = 'database';
const options = {};

const database = {

	createDatabase: async function(){
		const client = new MongoClient(url, options);
		try{
			await client.connect();
			console.log('Database created!');
		} catch (err) {
			console.error('Error creating database:', err);
		} finally {
			await client.close();
		}
	},

	createCollection: async function (collection) {
		const client = new MongoClient(url, options);
		try{
			await client.connect();
			const db = client.db(dbName);
			await db.createCollection(collection);
			console.log('Collection ${collection} created');
		} catch (err){
			console.error('Error creating collection:', err);
		} finally {
			await client.close();
		}
	},

	insertOne: async function (collection, doc) {
		const client = new MongoClient(url, options);
		try{
			await client.connect();
			const db = client.db(dbName);
			await db.collection(collection).insertOne(doc);
			console.log('1 document inserted');
		} catch (err) {
			console.error('Error inserting document:', err);
		} finally {
			await client.close();
		}
	},

	insertMany: async function (collection, docs){
		const client = new MongoClient(url, options);
		try {
			await client.connect();
			const db = client.db(dbName);
			const res = await db.collection(collection).insertMany(docs);
			console.log('Documents inserted: ${res.insertedCount}');
		} catch (err) {
			console.error('Error inserting many documents:', err);
		} finally {
			await client.close();
		}
	},


	findOne: async function (collection, query){
		const client = new MongoClient(url, options);
		try {
			await client.connect();
			const db = client.db(dbName);
			const result = await db.collection(collection).findOne(query);
			return result;
		} catch (err){
			console.error('Error finding one document:', err);
		} finally {
			await client.close();
		}
	},

	findMany: async function (collection, query, sort = null, projection = null) {
	    const client = new MongoClient(url, options);
	    try {
	        await client.connect();
	        const db = client.db(dbName);
	        const cursor = db.collection(collection).find(query, { projection });
	        if (sort) cursor.sort(sort);
	        const result = await cursor.toArray();
	        return result;
	    } catch (err) {
	        console.error('Error finding many documents:', err);
	    } finally {
	        await client.close();
	    }
	},

	deleteOne: async function (collection, filter) {
	    const client = new MongoClient(url, options);
	    try {
	        await client.connect();
	        const db = client.db(dbName);
	        await db.collection(collection).deleteOne(filter);
	        console.log('1 document deleted');
	    } catch (err) {
	        console.error('Error deleting document:', err);
	    } finally {
	        await client.close();
	    }
	},

	deleteMany: async function (collection, filter) {
	    const client = new MongoClient(url, options);
	    try {
	        await client.connect();
	        const db = client.db(dbName);
	        const res = await db.collection(collection).deleteMany(filter);
	        console.log(`Documents deleted: ${res.deletedCount}`);
	    } catch (err) {
	        console.error('Error deleting many documents:', err);
	    } finally {
	        await client.close();
	    }
	},

	dropCollection: async function (collection) {
	    const client = new MongoClient(url, options);
	    try {
	        await client.connect();
	        const db = client.db(dbName);
	        await db.collection(collection).drop();
	        console.log(`Collection ${collection} deleted`);
	    } catch (err) {
	        console.error('Error dropping collection:', err);
	    } finally {
	        await client.close();
	    }
	},

	updateOne: async function (collection, filter, update) {
	    const client = new MongoClient(url, options);
	    try {
	        await client.connect();
	        const db = client.db(dbName);
	        await db.collection(collection).updateOne(filter, update);
	        console.log('1 document updated');
	    } catch (err) {
	        console.error('Error updating document:', err);
	    } finally {
	        await client.close();
	    }
	},

	updateMany: async function (collection, filter, update) {
	    const client = new MongoClient(url, options);
	    try {
	        await client.connect();
	        const db = client.db(dbName);
	        const res = await db.collection(collection).updateMany(filter, update);
	        console.log(`Documents updated: ${res.modifiedCount}`);
	    } catch (err) {
	        console.error('Error updating many documents:', err);
	    } finally {
	        await client.close();
	    }
	}

};

module.exports = database;