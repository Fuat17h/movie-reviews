import mongodb from "mongodb"

const ObjectId = mongodb.ObjectId

let movies; // store reference to the database

export default class MoviesDAO{

    // Connect
    static async injectDB(conn){
        if (movies) {
            return
        }
        try {
            movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection('movies')
        } catch (e) {
            console.error(`unable to connect in MoviesDAO: ${e}`)
        }
    }

    // Retrieving Movies
    static async getMovies({ 
        
        // default filter, filter object as arguments
        filters = null,
        page = 0,
        moviesPerPage = 20, // will only get 20 movies at once
    } = {}){

        let query
        if(filters){
            if("title" in filters){ // if filters.hasOwnProperty('title')
                query = { $text: { $search: filters['title'] } }
            }
            else if("rated" in filters){
                query = { "rated": { $eq: filters['rated'] } }
            }
        }

        let cursor
        try {
            cursor = await movies.find(query).limit(moviesPerPage).skip(moviesPerPage * page)

            const moviesList = await cursor.toArray()
            const totalNumMovies = await movies.countDocuments(query)
            return {moviesList, totalNumMovies}

        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { moviesList: [], totalNumMovies: 0 }
        }

    }



    static async getRatings(){
        let ratings = []
        try {
            ratings = await movies.distinct("rated")
            return ratings
        } catch (e) {
            console.error(`unable to get ratings, $(e)`)
            return ratings
        }
    }


    static async getMovieById(id){
        try {
            return await movies.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id)
                    }
                } ,
                {
                    $lookup: {
                        from: 'reviews',    // <collection to join>
                        localField: '_id',      // <field from the input document>
                        foreignField: 'movie_id',       // <field from the documents of the "from" collection>
                        as: 'reviews',                  // <output array field>
                    }
                }
            ]).next()

        } catch (e) {
            console.error(`something went wrong in getMovieById: ${e}`)
            throw e
        }
    }


}